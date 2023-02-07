[bitcoin-minimal](../README.md) / DSProofSpender

# Class: DSProofSpender

## Table of contents

### Constructors

- [constructor](DSProofSpender.md#constructor)

### Properties

- [buffer](DSProofSpender.md#buffer)
- [hashOutputs](DSProofSpender.md#hashoutputs)
- [hashPrevOutputs](DSProofSpender.md#hashprevoutputs)
- [hashSequence](DSProofSpender.md#hashsequence)
- [lockTime](DSProofSpender.md#locktime)
- [outSequence](DSProofSpender.md#outsequence)
- [pushData](DSProofSpender.md#pushdata)
- [txVersion](DSProofSpender.md#txversion)

### Methods

- [fromBuffer](DSProofSpender.md#frombuffer)
- [fromBufferReader](DSProofSpender.md#frombufferreader)

## Constructors

### constructor

• `Private` **new DSProofSpender**(`br`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `br` | [`BufferReader`](utils.BufferReader.md) \| [`BufferChunksReader`](utils.BufferChunksReader.md) |

#### Defined in

[dsp.ts:13](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/dsp.ts#L13)

## Properties

### buffer

• **buffer**: `Buffer`

#### Defined in

[dsp.ts:11](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/dsp.ts#L11)

___

### hashOutputs

• **hashOutputs**: `Buffer`

#### Defined in

[dsp.ts:9](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/dsp.ts#L9)

___

### hashPrevOutputs

• **hashPrevOutputs**: `Buffer`

#### Defined in

[dsp.ts:7](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/dsp.ts#L7)

___

### hashSequence

• **hashSequence**: `Buffer`

#### Defined in

[dsp.ts:8](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/dsp.ts#L8)

___

### lockTime

• **lockTime**: `number`

#### Defined in

[dsp.ts:6](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/dsp.ts#L6)

___

### outSequence

• **outSequence**: `number`

#### Defined in

[dsp.ts:5](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/dsp.ts#L5)

___

### pushData

• **pushData**: `Buffer`[]

#### Defined in

[dsp.ts:10](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/dsp.ts#L10)

___

### txVersion

• **txVersion**: `number`

#### Defined in

[dsp.ts:4](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/dsp.ts#L4)

## Methods

### fromBuffer

▸ `Static` **fromBuffer**(`buf`): [`DSProofSpender`](DSProofSpender.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `buf` | `Buffer` |

#### Returns

[`DSProofSpender`](DSProofSpender.md)

#### Defined in

[dsp.ts:31](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/dsp.ts#L31)

___

### fromBufferReader

▸ `Static` **fromBufferReader**(`br`): [`DSProofSpender`](DSProofSpender.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `br` | [`BufferReader`](utils.BufferReader.md) \| [`BufferChunksReader`](utils.BufferChunksReader.md) |

#### Returns

[`DSProofSpender`](DSProofSpender.md)

#### Defined in

[dsp.ts:36](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/dsp.ts#L36)
