[bitcoin-minimal](../README.md) / Block

# Class: Block

## Table of contents

### Constructors

- [constructor](Block.md#constructor)

### Properties

- [br](Block.md#br)
- [buffer](Block.md#buffer)
- [computedMerkleRoot](Block.md#computedmerkleroot)
- [header](Block.md#header)
- [height](Block.md#height)
- [merkleArray](Block.md#merklearray)
- [options](Block.md#options)
- [size](Block.md#size)
- [startDate](Block.md#startdate)
- [transactions](Block.md#transactions)
- [txCount](Block.md#txcount)
- [txPos](Block.md#txpos)
- [txRead](Block.md#txread)

### Methods

- [addBufferChunk](Block.md#addbufferchunk)
- [addMerkleHash](Block.md#addmerklehash)
- [finished](Block.md#finished)
- [getHash](Block.md#gethash)
- [getHeight](Block.md#getheight)
- [getRawTransactions](Block.md#getrawtransactions)
- [getTransactions](Block.md#gettransactions)
- [getTransactionsAsync](Block.md#gettransactionsasync)
- [toBuffer](Block.md#tobuffer)
- [validate](Block.md#validate)
- [fromBuffer](Block.md#frombuffer)

## Constructors

### constructor

• **new Block**(`options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`BlockOptions`](../interfaces/BlockOptions.md) |

#### Defined in

[block.ts:38](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/block.ts#L38)

## Properties

### br

• `Optional` **br**: [`BufferChunksReader`](utils.BufferChunksReader.md)

#### Defined in

[block.ts:34](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/block.ts#L34)

___

### buffer

• `Optional` **buffer**: `Buffer`

#### Defined in

[block.ts:31](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/block.ts#L31)

___

### computedMerkleRoot

• `Optional` **computedMerkleRoot**: `Buffer`

#### Defined in

[block.ts:33](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/block.ts#L33)

___

### header

• `Optional` **header**: [`Header`](Header.md)

#### Defined in

[block.ts:28](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/block.ts#L28)

___

### height

• `Optional` **height**: `number`

#### Defined in

[block.ts:35](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/block.ts#L35)

___

### merkleArray

• **merkleArray**: `Buffer`[][]

#### Defined in

[block.ts:27](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/block.ts#L27)

___

### options

• **options**: [`BlockOptions`](../interfaces/BlockOptions.md)

#### Defined in

[block.ts:26](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/block.ts#L26)

___

### size

• **size**: `number`

#### Defined in

[block.ts:25](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/block.ts#L25)

___

### startDate

• **startDate**: `number`

#### Defined in

[block.ts:36](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/block.ts#L36)

___

### transactions

• `Optional` **transactions**: [`Transaction`](Transaction.md)[]

#### Defined in

[block.ts:32](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/block.ts#L32)

___

### txCount

• `Optional` **txCount**: `number`

#### Defined in

[block.ts:29](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/block.ts#L29)

___

### txPos

• `Optional` **txPos**: `number`

#### Defined in

[block.ts:30](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/block.ts#L30)

___

### txRead

• **txRead**: `number`

#### Defined in

[block.ts:24](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/block.ts#L24)

## Methods

### addBufferChunk

▸ **addBufferChunk**(`buf`): [`BlockStream`](../README.md#blockstream)

#### Parameters

| Name | Type |
| :------ | :------ |
| `buf` | `Buffer` |

#### Returns

[`BlockStream`](../README.md#blockstream)

#### Defined in

[block.ts:239](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/block.ts#L239)

___

### addMerkleHash

▸ **addMerkleHash**(`index`, `hash`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |
| `hash` | `Buffer` |

#### Returns

`void`

#### Defined in

[block.ts:158](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/block.ts#L158)

___

### finished

▸ **finished**(): `boolean`

#### Returns

`boolean`

#### Defined in

[block.ts:232](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/block.ts#L232)

___

### getHash

▸ **getHash**(): `Buffer`

#### Returns

`Buffer`

#### Defined in

[block.ts:57](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/block.ts#L57)

▸ **getHash**<`T`\>(`hexStr`): `T` extends ``true`` ? `string` : `Buffer`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `boolean` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `hexStr` | `T` |

#### Returns

`T` extends ``true`` ? `string` : `Buffer`

#### Defined in

[block.ts:58](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/block.ts#L58)

___

### getHeight

▸ **getHeight**(): `number`

#### Returns

`number`

#### Defined in

[block.ts:125](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/block.ts#L125)

___

### getRawTransactions

▸ **getRawTransactions**(): `undefined` \| [`Transaction`](Transaction.md)[]

#### Returns

`undefined` \| [`Transaction`](Transaction.md)[]

#### Defined in

[block.ts:82](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/block.ts#L82)

___

### getTransactions

▸ **getTransactions**(): [`Transaction`](Transaction.md)[]

#### Returns

[`Transaction`](Transaction.md)[]

#### Defined in

[block.ts:65](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/block.ts#L65)

___

### getTransactionsAsync

▸ **getTransactionsAsync**(`callback`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`data`: [`BlockStream`](../README.md#blockstream)) => `void` \| `Promise`<`void`\> |

#### Returns

`Promise`<`void`\>

#### Defined in

[block.ts:192](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/block.ts#L192)

___

### toBuffer

▸ **toBuffer**(): `Buffer`

#### Returns

`Buffer`

#### Defined in

[block.ts:227](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/block.ts#L227)

___

### validate

▸ **validate**(): `void`

#### Returns

`void`

#### Defined in

[block.ts:139](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/block.ts#L139)

___

### fromBuffer

▸ `Static` **fromBuffer**(`buf`): [`Block`](Block.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `buf` | `Buffer` |

#### Returns

[`Block`](Block.md)

#### Defined in

[block.ts:46](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/block.ts#L46)
