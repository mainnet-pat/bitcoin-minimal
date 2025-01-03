import { Block, Header, Transaction, Script, utils, DSProof, NETWORK_PREFIX } from "../src";
import * as cashaddress from "../src/utils/cashaddress";
import fs from "fs";
import path from "path";
import assert from "assert";
const pako = require("pako");

const { Base58, BufferReader, BufferWriter } = utils;

const validPrefixTests = () => {
  const tests = require('./token-prefix-valid.json');
  const capability = ["none", "mutable", "minting"];
  tests.forEach((test: any) => {
    const prefixBuffer = new BufferReader(test.prefix);
    const dummyScript = Script.fromBufferReader(prefixBuffer);
    assert.equal(BigInt(test.data.amount), dummyScript.token?.amount);
    assert.equal(test.data.category, dummyScript.token?.tokenId.toString("hex"));
    assert.equal(test.data.nft?.commitment, dummyScript.token?.commitment?.toString("hex"));
    assert.equal(test.data.nft?.capability, capability[dummyScript.token?.capability ?? 0xdeadbeef]);
  })
}

const invalidPrefixTests = () => {
  const tests = require('./token-prefix-invalid.json');
  tests.forEach((test: any) => {
    const prefixBuffer = new BufferReader(test.prefix);
    try {
      Script.fromBufferReader(prefixBuffer);
      assert(false, "Method did not throw");
    } catch (e: any) {
      assert(test.error.includes(e.message), `\n${test.error}\ndoes not include\n${e.message}`);
    }
  })
}

const testParsingCashtokensTransaction = () => {
  const txHex = fs.readFileSync(path.join(__dirname, "./cashtokens_tx.dat"), "utf8");
  const txBuf = Buffer.from(txHex, "hex");
  const transaction = Transaction.fromBuffer(txBuf);
  const script = Script.fromBuffer(transaction.outputs[0].scriptBuffer);
  assert.equal(script.token?.amount, 5000);
  assert.equal(script.token?.tokenId.toString("hex"), "942fa20890b75f9ccee68c780832a65d8ed353cca88f76505e15a2c2386463b0");
  assert.equal(script.token?.capability, 0);
  assert.equal(script.token?.commitment?.toString("hex"), "abcd");
}

const testCashAddresses = () => {
  const cashaddr = "bitcoincash:qrenayanewceqkvqfey542vymvf9kqgghsc68hv269";
  const decodedcashaddr = cashaddress.decode(cashaddr);
  type NETWORK_TYPE = keyof typeof NETWORK_PREFIX;

  const network = Object.keys(NETWORK_PREFIX)[Object.values(NETWORK_PREFIX).indexOf(decodedcashaddr[0])] as NETWORK_TYPE;
  console.log(network, typeof network, typeof NETWORK_PREFIX[network]);
  const prefix = NETWORK_PREFIX[network] as NETWORK_TYPE;
  console.log(prefix, typeof prefix);
  assert.equal(cashaddr, cashaddress.encode_full(decodedcashaddr[0], decodedcashaddr[1], decodedcashaddr[2]));
  assert.equal(decodedcashaddr[1], 0);
  assert.equal(cashaddress.encode_full(...decodedcashaddr), cashaddr);

  const tokenaddr = "bitcoincash:zrenayanewceqkvqfey542vymvf9kqgghsls5fzv9k";
  const decodedtokenaddr = cashaddress.decode(tokenaddr);
  assert.equal(tokenaddr, cashaddress.encode_full(decodedtokenaddr[0], decodedtokenaddr[1], decodedtokenaddr[2]));
  assert.equal(decodedtokenaddr[1], 2);
  assert.equal(cashaddress.encode_full(...decodedtokenaddr), tokenaddr);
}

const testDSProofs = () => {
  const dsProofHex = fs.readFileSync(path.join(__dirname, "./dsproof.dat"), "utf8");
  const dsProofBuf = Buffer.from(dsProofHex, "hex");
  let dsProof = DSProof.fromBuffer(dsProofBuf);
  console.log(dsProof);
}

(async () => {
  invalidPrefixTests();
  validPrefixTests();
  testParsingCashtokensTransaction();
  testCashAddresses();
  testDSProofs();

  const blockHex = fs.readFileSync(path.join(__dirname, "./block.dat"), "utf8");
  const blockBuf = Buffer.from(blockHex, "hex");
  let block = Block.fromBuffer(blockBuf);
  // console.log(block)
  assert.equal(block.size, 8656);
  assert.equal(block.txCount, 26);

  assert.equal(
    block.getHash().toString("hex"),
    "0000000000000000065f5cd65ab43226317d3b1966eb9bf057467d156d34782f"
  );
  assert.equal(
    block.header?.prevHash.toString("hex"),
    "00000000000000000280aa1a8ba060e60ea5bb55a9e8613a1d9623073868c738"
  );
  assert.equal(
    block.getHash(true),
    "0000000000000000065f5cd65ab43226317d3b1966eb9bf057467d156d34782f"
  );
  assert(
    Buffer.compare(
      Buffer.from(
        "0000000000000000065f5cd65ab43226317d3b1966eb9bf057467d156d34782f",
        "hex"
      ),
      block.getHash()
    ) === 0
  );
  assert.equal(block.transactions, undefined);
  assert.equal(block.getTransactions().length, 26);

  const rawTransactions = block.getRawTransactions();
  assert.equal(rawTransactions.length, 26);
  for (const [index, tx] of block.transactions!.entries()) {
    assert.equal(tx.toBuffer().toString("hex"), rawTransactions[index].toString("hex"));
  }

  const header = Header.fromBuffer(blockBuf);
  const headerBuf = header.toBuffer();
  const header2 = Header.fromBuffer(headerBuf);
  assert.equal(
    header.getHash().toString("hex"),
    header2.getHash().toString("hex")
  );

  const tx1 = block.getTransactions()[0];
  const bufTx1 = tx1.toBuffer();
  const tx2 = Transaction.fromBuffer(bufTx1);
  const bufTx2 = tx2.toBuffer();
  assert.equal(Buffer.compare(bufTx1, bufTx2), 0);

  const blockBuf2 = block.toBuffer();
  const block2 = Block.fromBuffer(blockBuf2);
  assert.equal(
    block.getHash().toString("hex"),
    block2.getHash().toString("hex")
  );
  // console.log(block)
  assert.equal(block.getTransactions().length, block2.getTransactions().length);
  assert.equal(block.size, block2.size);
  assert.equal(Buffer.compare(block.toBuffer(), block2.toBuffer()), 0);

  assert.equal(
    block.getTransactions()[0].getHash().toString("hex"),
    "70932f8bf487093ae0c8cd4f1d96d09d3fcdbd62d7928adb284cf32ddff17c08"
  );
  assert.equal(
    block.getTransactions()[0].getTxid(),
    "70932f8bf487093ae0c8cd4f1d96d09d3fcdbd62d7928adb284cf32ddff17c08"
  );
  assert(
    Buffer.compare(
      Buffer.from(
        "70932f8bf487093ae0c8cd4f1d96d09d3fcdbd62d7928adb284cf32ddff17c08",
        "hex"
      ),
      block.getTransactions()[0].getHash()
    ) === 0
  );

  let count = 0;
  await block.getTransactionsAsync((response) => {
    const { transactions } = response;
    // console.log(response)
    count += transactions.length;
  });
  assert.equal(count, 26);

  block = Block.fromBuffer(blockBuf);
  count = 0;
  await block.getTransactionsAsync((response) => {
    const { transactions } = response;
    // console.log(response)
    count += transactions.length;
  });
  assert.equal(count, 26);

  const block6 = Block.fromBuffer(blockBuf);
  console.log("TX COUNT", block6.txCount, block6.toBuffer().length);
  const blockChunks: Buffer[] = [];
  const skip = Number(blockBuf.length / 95);
  let i;
  for (i = 0; i < blockBuf.length; i += skip) {
    blockChunks.push(blockBuf.subarray(i, i + skip));
  }
  blockChunks.push(Buffer.from([1, 2, 3, 4, 5, 6, 7, 8]));
  // blockChunks.push(blockBuf.slice(i))
  console.log(
    `Block is split into ${blockChunks.length} chunks at ${blockChunks[0].length} each. Total bytes ${blockBuf.length}`,
    blockChunks.reduce((prev, chunk) => prev + chunk.length, 0)
  );
  const block4 = new Block({ validate: true });
  for (const chunk of blockChunks) {
    const result = block4.addBufferChunk(chunk);
    const { transactions, finished, height } = result;
    // console.log(result)
    // if (finished) {
    //   block4.validate()
    //   block4.validate()
    // }
    for (const [index, tx, pos, len] of transactions) {
      // console.log(`tx ${index} ${tx.getHash().toString("hex")}, ${pos} ${len}`);
    }
    if (transactions.length > 0) assert.equal(height, 587603);
  }

  const block7 = new Block({ validate: true });
  block7.addBufferChunk(blockBuf);

  const block8 = Block.fromBuffer(blockBuf);
  block8.options = { validate: true };
  await block8.getTransactionsAsync(({ transactions }) => {
    for (const [index, tx, pos, len] of transactions) {
      const opreturns = tx.getOpReturns({ singleOpReturn: true });
      for (const [indexBitcom, [opreturn]] of opreturns) {
        const [bitcom, ...other] = opreturn;
        // console.log(index, indexBitcom, bitcom.toString(), other)
      }
    }
  });

  const tx3 = block.getTransactions()[1];
  for (const input of tx3.inputs) {
    const script = Script.fromBuffer(input.scriptBuffer);
    // console.log(script)
    if (script.toAddress()) {
      // console.log(script.toAddress())
      assert.equal(script.toAddress(), "1GBdAgTiqaLEXaPux1xRGxPA4TF5qSLRRF");
      break;
    }
  }
  for (const output of tx3.outputs) {
    const script = Script.fromBuffer(output.scriptBuffer);
    // console.log(script)
    if (script.toAddress()) {
      // console.log(script.toAddress())
      assert.equal(script.toAddress(), "1GBdAgTiqaLEXaPux1xRGxPA4TF5qSLRRF");
      break;
    }
  }

  // Test Base58
  let one = "1LtyME6b5AnMopQrBPLk4FGN8UBuhxKqrn";
  let two = Base58.decode(one);
  // console.log(one, Base58.encode(two))
  assert.equal(one, Base58.encode(two));

  console.log(tx3.getBitcoms());

  console.log(tx3.parseBitcoms());
  // block7.validate()
  // block7.validate()
  // const txids = block7.getTransactions().map(t => t.getHash())
  // block7.validate(txids)
  // block7.validate(txids)

  // assert.throws(
  //   () => {
  //     const block = new Block({ validate: true })
  //     block.addBufferChunk(blockBuf)
  //     block.getTransactions()
  //     block.transactions[0][0] += 1 // Change a txid
  //     block7.validate(txids)
  //   },
  //   {
  //     name: 'Error',
  //     message: 'Invalid merkle root'
  //   }
  // )

  const bw = new BufferWriter();
  const b1 = Buffer.from("hello");
  const b2 = Buffer.from("world!!!");
  const b3 = Buffer.from("bye");
  bw.writeVarLengthBuffer(b1);
  bw.writeVarLengthBuffer(b2);
  bw.writeVarLengthBuffer(b3);
  const br = new BufferReader(bw.toBuffer());
  assert.equal(br.readVarLengthBuffer().toString(), b1.toString());
  assert.equal(br.readVarLengthBuffer().toString(), b2.toString());
  assert.equal(br.readVarLengthBuffer().toString(), b3.toString());

  assert.equal(block.getTransactions()[0].getCoinbaseHeight(), 587603);
  assert.equal(block.getHeight(), 587603);

  const blockHexV1 = fs.readFileSync(
    path.join(__dirname, "./blockv1.dat"),
    "utf8"
  );
  const blockV1 = Block.fromBuffer(Buffer.from(blockHexV1, "hex"));
  assert.throws(() => blockV1.getHeight(), {
    name: "Error",
    message: "No height in v1 blocks",
  });

  // Test bitcoms
  let hex1 = fs.readFileSync(
    path.join(
      __dirname,
      `c3994c4a7c10a8c9e758b4575b635463189ba3875d6a608fa5d04593f4346f54.hex`
    )
  );
  let tx10 = Transaction.fromBuffer(Buffer.from(hex1.toString(), "hex"));
  // console.log(Array.from(tx10.getBitcoms()));
  assert.equal(
    JSON.stringify(Array.from(tx10.getBitcoms())),
    JSON.stringify([
      "19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut",
      "1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5",
      "15PciHG22SNLQJXMoSUaWVi7WSqc7hCfva",
    ])
  );
  // console.log(tx10.parseBitcoms()[1]["1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5"]);
  assert.equal(
    tx10.parseBitcoms()[1]["1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5"]?.map.sha256,
    "20f983758b7d3bd14b588a5f1f34320fbe96501a202f1daf4d3cc9c4d762a778"
  );
  let file = Buffer.from(
    pako.inflate(
      tx10.parseBitcoms()[0]["19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut"]?.data
    )
  );
  // console.log(file.toString());

  console.log("Passed tests");
})();
