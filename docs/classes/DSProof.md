[bitcoin-minimal](../README.md) / DSProof

# Class: DSProof

## Table of contents

### Constructors

- [constructor](DSProof.md#constructor)

### Properties

- [buffer](DSProof.md#buffer)
- [hash](DSProof.md#hash)
- [prevOutIndex](DSProof.md#prevoutindex)
- [prevTxId](DSProof.md#prevtxid)
- [spender1](DSProof.md#spender1)
- [spender2](DSProof.md#spender2)

### Methods

- [getHash](DSProof.md#gethash)
- [toBuffer](DSProof.md#tobuffer)
- [fromBuffer](DSProof.md#frombuffer)
- [fromBufferReader](DSProof.md#frombufferreader)

## Constructors

### constructor

• `Private` **new DSProof**(`br`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `br` | [`BufferReader`](utils.BufferReader.md) \| [`BufferChunksReader`](utils.BufferChunksReader.md) |

#### Defined in

[dsp.ts:50](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/dsp.ts#L50)

## Properties

### buffer

• **buffer**: `Buffer`

#### Defined in

[dsp.ts:47](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/dsp.ts#L47)

___

### hash

• `Optional` **hash**: `Buffer`

#### Defined in

[dsp.ts:48](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/dsp.ts#L48)

___

### prevOutIndex

• **prevOutIndex**: `number`

#### Defined in

[dsp.ts:44](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/dsp.ts#L44)

___

### prevTxId

• **prevTxId**: `Buffer`

#### Defined in

[dsp.ts:43](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/dsp.ts#L43)

___

### spender1

• **spender1**: [`DSProofSpender`](DSProofSpender.md)

#### Defined in

[dsp.ts:45](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/dsp.ts#L45)

___

### spender2

• **spender2**: [`DSProofSpender`](DSProofSpender.md)

#### Defined in

[dsp.ts:46](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/dsp.ts#L46)

## Methods

### getHash

▸ **getHash**(): `Buffer`

#### Returns

`Buffer`

#### Defined in

[dsp.ts:73](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/dsp.ts#L73)

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

[dsp.ts:74](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/dsp.ts#L74)

___

### toBuffer

▸ **toBuffer**(): `Buffer`

#### Returns

`Buffer`

#### Defined in

[dsp.ts:69](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/dsp.ts#L69)

___

### fromBuffer

▸ `Static` **fromBuffer**(`buf`): [`DSProof`](DSProof.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `buf` | `Buffer` |

#### Returns

[`DSProof`](DSProof.md)

#### Defined in

[dsp.ts:59](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/dsp.ts#L59)

___

### fromBufferReader

▸ `Static` **fromBufferReader**(`br`): [`DSProof`](DSProof.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `br` | [`BufferReader`](utils.BufferReader.md) \| [`BufferChunksReader`](utils.BufferChunksReader.md) |

#### Returns

[`DSProof`](DSProof.md)

#### Defined in

[dsp.ts:64](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/dsp.ts#L64)
