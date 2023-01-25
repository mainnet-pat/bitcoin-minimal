# bitcoin-minimal

[![NPM Package](https://img.shields.io/npm/v/bitcoin-minimal.svg?style=flat-square)](https://www.npmjs.org/package/bitcoin-minimal)

Parse raw bitcoin block and transaction buffers with minimal overhead

## Note

You must use node.js v12+

### Install

`npm i bitcoin-minimal`

### Documentation

- [View detailed documentation here](docs/README.md)

### Basic use

```js
const { Block, Transaction, Header } = require('bitcoin-minimal')

const block = Block.fromBuffer(yourBlockBuffer)
block.getHash()
block.getTransactions()
block.getHeight()
await block.getTransactionsAsync(({ header, transactions, finished }), => {
    for (const [txIndex, transaction, txPos, txLength] of transactions) {
        console.log(`tx ${transaction.getTxid()}`)
    }
})

const header = Header.fromBuffer(yourHeaderBuffer)
header.getHash()

const transaction = Transaction.fromBuffer(yourTransactionBuffer)
transaction.getTxid()
transaction.getCoinbaseHeight()
```

### Tests

`npm run test`
