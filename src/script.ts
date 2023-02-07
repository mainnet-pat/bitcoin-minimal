import { BufferReader, Opcode, Hash, Base58, CashAddress } from "./utils";
import { KEY_TYPE } from "./utils/cashaddress";

const NETWORK_BUF = {
  testnet: Buffer.from([0x6f]),
  mainnet: Buffer.from([0x00]),
};

export const NETWORK_PREFIX = {
  mainnet: "bitcoincash",
  testnet: "bchtest",
  regtest: "bchreg",
}

export interface ScriptInitOptions {
  opreturn?: boolean;
}

export interface ScriptChunk {
  opcodenum: number;
  len?: number;
  buf?: Buffer;
}

export interface ScriptGetBitcoms {
  maxBitcomLen: number;
}

export type ScriptBitcom = {
  bitcom: string;
  data: Buffer[];
  "19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut"?: {
    data: Buffer;
    type: string;
    encoding: string;
    name: string;
  };
  "1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5"?: {
    type: string;
    map: { [key: string]: string };
  };
};

export interface Token {
  amount: BigInt;
  tokenId: Buffer;
  capability?: number;
  commitment?: Buffer;
}

export const NFTCapability = {
  none: 0x00,
  mutable: 0x01,
  minting: 0x02,
};

export default class Script {
  chunks: ScriptChunk[];
  buffer: Buffer;
  token?: Token;

  private constructor(br: BufferReader, chunks: ScriptChunk[]) {
    this.chunks = chunks;
    this.buffer = br.buf;

    this.readTokenInfo(br);

    while (!br.finished()) {
      try {
        const opcodenum = br.readUInt8();

        let len, buf;
        if (opcodenum > 0 && opcodenum < Opcode.OP_PUSHDATA1) {
          len = opcodenum;
          this.chunks.push({
            buf: br.read(len),
            len: len,
            opcodenum: opcodenum,
          });
        } else if (opcodenum === Opcode.OP_PUSHDATA1) {
          len = br.readUInt8();
          buf = br.read(len);
          this.chunks.push({
            buf: buf,
            len: len,
            opcodenum: opcodenum,
          });
        } else if (opcodenum === Opcode.OP_PUSHDATA2) {
          len = br.readUInt16LE();
          buf = br.read(len);
          this.chunks.push({
            buf: buf,
            len: len,
            opcodenum: opcodenum,
          });
        } else if (opcodenum === Opcode.OP_PUSHDATA4) {
          len = br.readUInt32LE();
          buf = br.read(len);
          this.chunks.push({
            buf: buf,
            len: len,
            opcodenum: opcodenum,
          });
        } else {
          this.chunks.push({
            opcodenum: opcodenum,
          });
        }
      } catch (err) {
        if (err instanceof RangeError) {
          throw new Error(`Invalid script`);
        }
        throw err;
      }
    }
  }

  // https://github.com/bitjson/cashtokens/blob/1d3745e04b2c454f7a194d9fab368df72e8adc69/readme.md#token-encoding
  private readTokenInfo(br: BufferReader) {
    if (br.buf[br.pos] === 0xef) {
      br.readUInt8();
      if (br.buf.length < 34) {
        throw Error(`Invalid token prefix: insufficient length. The minimum possible length is 34. Missing bytes: ${34 - br.buf.length}`);
      }

      this.token = {} as any;
      this.token!.tokenId = br.readReverse(32);
      const bitfield = br.readUInt8();
      if (bitfield === 0) {
        throw Error("Invalid token prefix: must encode at least one token.");
      }

      const prefixStructure = bitfield & 0xf0;
      const reserved = prefixStructure & 0x80;
      if (reserved !== 0) {
        throw Error("Invalid token prefix: reserved bit is set.");
      }
      const hasCommitmentLength = prefixStructure & 0x40;
      const hasNFT = prefixStructure & 0x20;
      const hasAmount = prefixStructure & 0x10;

      const NFTCapability = bitfield & 0x0f;

      let commitmentLength = 0;
      if (hasNFT) {
        if (hasCommitmentLength) {
          try {
            commitmentLength = br.readVarintNum();
          } catch (e) {
            throw Error("Invalid token prefix: invalid non-fungible token commitment. Error reading CompactSize-prefixed bin: invalid CompactSize.");
          }

          if (commitmentLength === 0) {
            throw Error("Invalid token prefix: if encoded, commitment length must be greater than 0.");
          }

          let remainingBytes = br.buf.length - br.pos;
          if (remainingBytes - commitmentLength < 0) {
            throw Error(`Invalid token prefix: invalid non-fungible token commitment. Error reading CompactSize-prefixed bin: insufficient bytes. Required bytes: ${commitmentLength}, remaining bytes: ${remainingBytes}`);
          }
        }

        if (NFTCapability > 2) {
          throw Error(`Invalid token prefix: capability must be none (0), mutable (1), or minting (2). Capability value: ${NFTCapability}`);
        }

        this.token!.capability = NFTCapability;

        if (hasCommitmentLength) {
          const commitment = br.read(commitmentLength);
          this.token!.commitment = commitment;
        } else {
          this.token!.commitment = Buffer.from([]);
        }
      } else {
        if (hasCommitmentLength) {
          throw Error("Invalid token prefix: commitment requires an NFT.");
        }
        if (NFTCapability > 0) {
          throw Error("Invalid token prefix: capability requires an NFT.");
        }
      }

      if (hasAmount) {
        let ftAmount;
        try {
          ftAmount = br.readVarintBigInt();
        } catch (e) {
          throw Error("Invalid token prefix: invalid fungible token amount encoding. Error reading CompactSize");
        }
        if (ftAmount === BigInt(0)) {
          throw Error("Invalid token prefix: if encoded, fungible token amount must be greater than 0.");
        }
        if (ftAmount > BigInt("9223372036854775807")) {
          throw Error(`Invalid token prefix: exceeds maximum fungible token amount of 9223372036854775807. Encoded amount: ${ftAmount.toString()}`);
        }
        this.token!.amount = ftAmount;
      } else {
        this.token!.amount = BigInt(0);
      }
    }
  }

  static fromBuffer(buf: Buffer, options: ScriptInitOptions = {}) {
    const br = new BufferReader(buf);
    return this.fromBufferReader(br, options);
  }

  static fromBufferReader(
    br: BufferReader,
    options: ScriptInitOptions = { opreturn: false }
  ) {
    if (br.eof()) throw Error("Invalid script");
    const chunks: ScriptChunk[] = [];
    if (options.opreturn) {
      let opcodenum = br.readUInt8();
      if (opcodenum === Opcode.OP_FALSE) {
        chunks.push({ opcodenum });
        if (!br.eof()) opcodenum = br.readUInt8();
      }
      if (opcodenum !== Opcode.OP_RETURN) {
        throw Error("No OP_RETURN");
      }
      chunks.push({ opcodenum });
    }
    const script = new Script(br, chunks);
    return script;
  }

  getOpReturn() {
    const chunks = [...this.chunks];
    const opreturn: Buffer[][] = [];
    let chunk = chunks.shift();
    if (chunk?.opcodenum === Opcode.OP_FALSE) {
      chunk = chunks.shift();
    }
    while (chunks.length > 0) {
      const bufs: Buffer[] = [];
      while (chunks.length > 0) {
        chunk = chunks.shift();
        if (
          chunk?.buf &&
          chunk.buf.length === 1 &&
          chunk.buf.toString() === "|"
        ) {
          break;
        } else if (chunk?.buf) {
          bufs.push(chunk.buf);
        } else {
          bufs.push(Buffer.from(""));
        }
      }
      opreturn.push(bufs);
    }
    return opreturn;
  }

  parseBitcoms(): ScriptBitcom[] {
    const opreturn = this.getOpReturn();
    const results: ScriptBitcom[] = [];
    for (const cell of opreturn) {
      const bitcom = cell[0].toString();
      const obj: ScriptBitcom = { bitcom, data: cell.slice(1) };
      if (bitcom === "19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut") {
        const [, data, type, encoding, name] = cell;
        obj["19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut"] = {
          data,
          type: type ? type.toString() : "",
          encoding: encoding ? encoding.toString() : "",
          name: name ? name.toString() : "",
        };
      } else if (bitcom === "1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5") {
        const type = cell[1] ? cell[1].toString() : "";
        const map: Record<string, string> = {};
        for (let i = 2; i < cell.length; i += 2) {
          const key = cell[i].toString();
          const value = cell[i + 1] ? cell[i + 1].toString() : "";
          map[key] = value;
        }
        obj["1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5"] = { type, map };
      }
      results.push(obj);
    }
    return results;
  }

  getBitcoms(options: ScriptGetBitcoms = { maxBitcomLen: 50 }): Set<string> {
    const bitcoms: Set<string> = new Set();
    const opreturn = this.getOpReturn();
    for (const [bitcom] of opreturn) {
      if (
        bitcom &&
        bitcom.length > 0 &&
        bitcom.length <= options.maxBitcomLen
      ) {
        bitcoms.add(bitcom.toString());
      }
    }
    return bitcoms;
  }

  toBuffer() {
    return this.buffer;
  }

  toAddressBuf(): [number, Buffer] | undefined {
    console.log(this.buffer.toString("hex"));
    // P2PKH
    if (
      // Output
      this.chunks &&
      this.chunks.length === 5 &&
      this.chunks[0].opcodenum === Opcode.OP_DUP &&
      this.chunks[1].opcodenum === Opcode.OP_HASH160 &&
      this.chunks[2].buf &&
      this.chunks[2].buf.length === 20 &&
      this.chunks[3].opcodenum === Opcode.OP_EQUALVERIFY &&
      this.chunks[4].opcodenum === Opcode.OP_CHECKSIG
    ) {
      return [KEY_TYPE.PUBKEY_TYPE, this.chunks[2].buf];
    } else if (
      // Input
      this.chunks &&
      this.chunks.length === 2 &&
      this.chunks[1].buf &&
      this.chunks[1].buf.length === 33
    ) {
      return [KEY_TYPE.PUBKEY_TYPE, Hash.sha256ripemd160(this.chunks[1].buf)];
    } else if (
      // P2SH Output
      this.chunks &&
      this.chunks.length === 3 &&
      this.chunks[0].opcodenum === Opcode.OP_HASH160 &&
      this.chunks[1].buf &&
      this.chunks[1].buf.length === 20 &&
      this.chunks[2].opcodenum === Opcode.OP_EQUAL
    ) {
      return [KEY_TYPE.SCRIPT_TYPE, this.chunks[1].buf];
    } else if (
      // P2SH Input
      this.chunks &&
      this.chunks.length &&
      this.chunks[0].opcodenum !== Opcode.OP_RETURN
    ) {
      return [KEY_TYPE.SCRIPT_TYPE, Hash.sha256ripemd160(this.chunks[this.chunks.length-1].buf!)];
    }
  }

  toAddress(network: keyof typeof NETWORK_BUF = "mainnet") {
    const decoded = this.toAddressBuf();
    if (decoded) {
      let buf = Buffer.concat([NETWORK_BUF[network], decoded[1]]);
      const check = Hash.sha256sha256(buf).slice(0, 4);
      buf = Buffer.concat([buf, check]);
      return Base58.encode(buf);
    }
  }

  toCashAddress(network: keyof typeof NETWORK_PREFIX = "mainnet") {
    const decoded = this.toAddressBuf();
    if (decoded) {
      return CashAddress.encode_full(NETWORK_PREFIX[network], ...decoded);
    }
  }

  toTokenAddress(network: keyof typeof NETWORK_PREFIX = "mainnet") {
    const decoded = this.toAddressBuf();
    if (decoded) {
      return CashAddress.encode_full(NETWORK_PREFIX[network], decoded[0] + 2, decoded[1]);
    }
  }
}
