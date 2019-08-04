# bsv-minimal

[![NPM Package](https://img.shields.io/npm/v/bsv-minimal.svg?style=flat-square)](https://www.npmjs.org/package/bsv-minimal)

Quickly parse raw block and transaction buffers with minimal overhead

### Use

`npm install --save bsv-minimal`

```
const { Block, Transaction, Header } = require('bsv-minimal)

const block = Block.fromBuffer(yourBlockBuffer)

block.getHash()
block.getTransactions()
await block.getTransactionsAsync(transaction => {})

const header = Header.fromBuffer(yourHeaderBuffer)
header.getHash()

const transaction = Transaction.fromBuffer(yourTransactionBuffer)
transaction.getHash()
```

### Tests

`npm run test`
