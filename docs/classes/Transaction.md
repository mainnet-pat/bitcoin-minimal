[bitcoin-minimal](../README.md) / Transaction

# Class: Transaction

## Table of contents

### Constructors

- [constructor](Transaction.md#constructor)

### Properties

- [bufEnd](Transaction.md#bufend)
- [bufStart](Transaction.md#bufstart)
- [buffer](Transaction.md#buffer)
- [hash](Transaction.md#hash)
- [inputs](Transaction.md#inputs)
- [length](Transaction.md#length)
- [nLockTime](Transaction.md#nlocktime)
- [outputs](Transaction.md#outputs)
- [sizeTxIns](Transaction.md#sizetxins)
- [sizeTxOuts](Transaction.md#sizetxouts)
- [version](Transaction.md#version)

### Methods

- [getBitcoms](Transaction.md#getbitcoms)
- [getCoinbaseHeight](Transaction.md#getcoinbaseheight)
- [getHash](Transaction.md#gethash)
- [getOpReturns](Transaction.md#getopreturns)
- [getScripts](Transaction.md#getscripts)
- [getTxid](Transaction.md#gettxid)
- [parseBitcoms](Transaction.md#parsebitcoms)
- [toBuffer](Transaction.md#tobuffer)
- [fromBuffer](Transaction.md#frombuffer)
- [fromBufferReader](Transaction.md#frombufferreader)

## Constructors

### constructor

• `Private` **new Transaction**(`br`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `br` | [`BufferReader`](utils.BufferReader.md) \| [`BufferChunksReader`](utils.BufferChunksReader.md) |

#### Defined in

[transaction.ts:35](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/transaction.ts#L35)

## Properties

### bufEnd

• **bufEnd**: `number`

#### Defined in

[transaction.ts:30](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/transaction.ts#L30)

___

### bufStart

• **bufStart**: `number`

#### Defined in

[transaction.ts:23](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/transaction.ts#L23)

___

### buffer

• **buffer**: `Buffer`

#### Defined in

[transaction.ts:31](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/transaction.ts#L31)

___

### hash

• `Optional` **hash**: `Buffer`

#### Defined in

[transaction.ts:32](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/transaction.ts#L32)

___

### inputs

• **inputs**: [`TransactionInput`](../interfaces/TransactionInput.md)[]

#### Defined in

[transaction.ts:24](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/transaction.ts#L24)

___

### length

• **length**: `number`

#### Defined in

[transaction.ts:33](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/transaction.ts#L33)

___

### nLockTime

• **nLockTime**: `number`

#### Defined in

[transaction.ts:29](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/transaction.ts#L29)

___

### outputs

• **outputs**: [`TransactionOutput`](../interfaces/TransactionOutput.md)[]

#### Defined in

[transaction.ts:25](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/transaction.ts#L25)

___

### sizeTxIns

• **sizeTxIns**: `number`

#### Defined in

[transaction.ts:27](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/transaction.ts#L27)

___

### sizeTxOuts

• **sizeTxOuts**: `number`

#### Defined in

[transaction.ts:28](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/transaction.ts#L28)

___

### version

• **version**: `number`

#### Defined in

[transaction.ts:26](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/transaction.ts#L26)

## Methods

### getBitcoms

▸ **getBitcoms**(`options?`): `Set`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`ScriptGetBitcoms`](../interfaces/ScriptGetBitcoms.md) |

#### Returns

`Set`<`string`\>

#### Defined in

[transaction.ts:140](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/transaction.ts#L140)

___

### getCoinbaseHeight

▸ **getCoinbaseHeight**(): `number`

#### Returns

`number`

#### Defined in

[transaction.ts:151](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/transaction.ts#L151)

___

### getHash

▸ **getHash**(): `Buffer`

#### Returns

`Buffer`

#### Defined in

[transaction.ts:93](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/transaction.ts#L93)

___

### getOpReturns

▸ **getOpReturns**(`options?`): [`number`, `Buffer`[][]][]

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `options` | `Object` | `undefined` |
| `options.singleOpReturn` | `boolean` | `false` |

#### Returns

[`number`, `Buffer`[][]][]

#### Defined in

[transaction.ts:118](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/transaction.ts#L118)

___

### getScripts

▸ **getScripts**(`options`): [`number`, [`Script`](Script.md)][]

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`ScriptInitOptions`](../interfaces/ScriptInitOptions.md) |

#### Returns

[`number`, [`Script`](Script.md)][]

#### Defined in

[transaction.ts:105](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/transaction.ts#L105)

___

### getTxid

▸ **getTxid**(): `string`

#### Returns

`string`

#### Defined in

[transaction.ts:101](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/transaction.ts#L101)

___

### parseBitcoms

▸ **parseBitcoms**(`options?`): [`ScriptBitcom`](../README.md#scriptbitcom)[]

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `options` | `Object` | `undefined` |
| `options.singleOpReturn` | `boolean` | `false` |

#### Returns

[`ScriptBitcom`](../README.md#scriptbitcom)[]

#### Defined in

[transaction.ts:128](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/transaction.ts#L128)

___

### toBuffer

▸ **toBuffer**(): `Buffer`

#### Returns

`Buffer`

#### Defined in

[transaction.ts:89](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/transaction.ts#L89)

___

### fromBuffer

▸ `Static` **fromBuffer**(`buf`): [`Transaction`](Transaction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `buf` | `Buffer` |

#### Returns

[`Transaction`](Transaction.md)

#### Defined in

[transaction.ts:79](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/transaction.ts#L79)

___

### fromBufferReader

▸ `Static` **fromBufferReader**(`br`): [`Transaction`](Transaction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `br` | [`BufferReader`](utils.BufferReader.md) \| [`BufferChunksReader`](utils.BufferChunksReader.md) |

#### Returns

[`Transaction`](Transaction.md)

#### Defined in

[transaction.ts:84](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/transaction.ts#L84)
