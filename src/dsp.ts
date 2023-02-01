import { BufferReader, BufferChunksReader, Hash } from "./utils";

export class DSProofSpender {
  txVersion: number;
  outSequence: number;
  lockTime: number;
  hashPrevOutputs: Buffer;
  hashSequence: Buffer;
  hashOutputs: Buffer;
  pushData: Buffer[];
  buffer: Buffer;

  private constructor(br: BufferReader | BufferChunksReader) {
    const startPos = br.pos;
    this.txVersion = br.readUInt32LE();
    this.outSequence = br.readUInt32LE();
    this.lockTime = br.readUInt32LE();
    this.hashPrevOutputs = br.readReverse(32);
    this.hashSequence = br.readReverse(32);
    this.hashOutputs = br.readReverse(32);
    const pushDataCount = br.readVarintNum();
    this.pushData = [];
    for (let i = 0; i < pushDataCount; i++) {
      const pushDataLength = br.readVarintNum();
      this.pushData.push(br.slice(br.pos, br.pos + pushDataLength));
      br.pos += pushDataLength;
    }
    this.buffer = br.slice(startPos, br.pos);
  }

  static fromBuffer(buf: Buffer) {
    const br = new BufferReader(buf);
    return this.fromBufferReader(br);
  }

  static fromBufferReader(br: BufferReader | BufferChunksReader) {
    const spender = new DSProofSpender(br);
    return spender;
  }
}

export default class DSProof {
  prevTxId: Buffer;
  prevOutIndex: number;
  spender1: DSProofSpender;
  spender2: DSProofSpender;
  buffer: Buffer;
  hash?: Buffer;

  private constructor(br: BufferReader | BufferChunksReader) {
    const startPos = br.pos;
    this.prevTxId = br.readReverse(32);
    this.prevOutIndex = br.readUInt32LE();
    this.spender1 = DSProofSpender.fromBufferReader(br);
    this.spender2 = DSProofSpender.fromBufferReader(br);
    this.buffer = br.slice(startPos, br.pos);
  }

  static fromBuffer(buf: Buffer) {
    const br = new BufferReader(buf);
    return this.fromBufferReader(br);
  }

  static fromBufferReader(br: BufferReader | BufferChunksReader) {
    const dsproof = new DSProof(br);
    return dsproof;
  }

  toBuffer() {
    return this.buffer;
  }

  getHash(): Buffer;
  getHash<T extends boolean>(hexStr: T): T extends true ? string : Buffer;
  getHash(hexStr = false): string | Buffer {
    if (!this.hash) {
      const buf = this.toBuffer();
      this.hash = Hash.sha256sha256(buf).reverse();
    }

    return hexStr ? this.hash.toString("hex") : this.hash;
  }
}
