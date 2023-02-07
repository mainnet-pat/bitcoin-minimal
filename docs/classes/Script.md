[bitcoin-minimal](../README.md) / Script

# Class: Script

## Table of contents

### Constructors

- [constructor](Script.md#constructor)

### Properties

- [buffer](Script.md#buffer)
- [chunks](Script.md#chunks)
- [token](Script.md#token)

### Methods

- [getBitcoms](Script.md#getbitcoms)
- [getOpReturn](Script.md#getopreturn)
- [parseBitcoms](Script.md#parsebitcoms)
- [readTokenInfo](Script.md#readtokeninfo)
- [toAddress](Script.md#toaddress)
- [toAddressBuf](Script.md#toaddressbuf)
- [toBuffer](Script.md#tobuffer)
- [toCashAddress](Script.md#tocashaddress)
- [toTokenAddress](Script.md#totokenaddress)
- [fromBuffer](Script.md#frombuffer)
- [fromBufferReader](Script.md#frombufferreader)

## Constructors

### constructor

• `Private` **new Script**(`br`, `chunks`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `br` | [`BufferReader`](utils.BufferReader.md) |
| `chunks` | [`ScriptChunk`](../interfaces/ScriptChunk.md)[] |

#### Defined in

[script.ts:62](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/script.ts#L62)

## Properties

### buffer

• **buffer**: `Buffer`

#### Defined in

[script.ts:59](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/script.ts#L59)

___

### chunks

• **chunks**: [`ScriptChunk`](../interfaces/ScriptChunk.md)[]

#### Defined in

[script.ts:58](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/script.ts#L58)

___

### token

• `Optional` **token**: `Token`

#### Defined in

[script.ts:60](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/script.ts#L60)

## Methods

### getBitcoms

▸ **getBitcoms**(`options?`): `Set`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`ScriptGetBitcoms`](../interfaces/ScriptGetBitcoms.md) |

#### Returns

`Set`<`string`\>

#### Defined in

[script.ts:287](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/script.ts#L287)

___

### getOpReturn

▸ **getOpReturn**(): `Buffer`[][]

#### Returns

`Buffer`[][]

#### Defined in

[script.ts:230](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/script.ts#L230)

___

### parseBitcoms

▸ **parseBitcoms**(): [`ScriptBitcom`](../README.md#scriptbitcom)[]

#### Returns

[`ScriptBitcom`](../README.md#scriptbitcom)[]

#### Defined in

[script.ts:258](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/script.ts#L258)

___

### readTokenInfo

▸ `Private` **readTokenInfo**(`br`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `br` | [`BufferReader`](utils.BufferReader.md) |

#### Returns

`void`

#### Defined in

[script.ts:119](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/script.ts#L119)

___

### toAddress

▸ **toAddress**(`network?`): `undefined` \| `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `network` | ``"testnet"`` \| ``"mainnet"`` | `"mainnet"` |

#### Returns

`undefined` \| `string`

#### Defined in

[script.ts:349](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/script.ts#L349)

___

### toAddressBuf

▸ **toAddressBuf**(): `undefined` \| [`number`, `Buffer`]

#### Returns

`undefined` \| [`number`, `Buffer`]

#### Defined in

[script.ts:306](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/script.ts#L306)

___

### toBuffer

▸ **toBuffer**(): `Buffer`

#### Returns

`Buffer`

#### Defined in

[script.ts:302](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/script.ts#L302)

___

### toCashAddress

▸ **toCashAddress**(`network?`): `undefined` \| `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `network` | ``"testnet"`` \| ``"mainnet"`` \| ``"regtest"`` | `"mainnet"` |

#### Returns

`undefined` \| `string`

#### Defined in

[script.ts:359](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/script.ts#L359)

___

### toTokenAddress

▸ **toTokenAddress**(`network?`): `undefined` \| `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `network` | ``"testnet"`` \| ``"mainnet"`` \| ``"regtest"`` | `"mainnet"` |

#### Returns

`undefined` \| `string`

#### Defined in

[script.ts:366](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/script.ts#L366)

___

### fromBuffer

▸ `Static` **fromBuffer**(`buf`, `options?`): [`Script`](Script.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `buf` | `Buffer` |
| `options` | [`ScriptInitOptions`](../interfaces/ScriptInitOptions.md) |

#### Returns

[`Script`](Script.md)

#### Defined in

[script.ts:204](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/script.ts#L204)

___

### fromBufferReader

▸ `Static` **fromBufferReader**(`br`, `options?`): [`Script`](Script.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `br` | [`BufferReader`](utils.BufferReader.md) |
| `options` | [`ScriptInitOptions`](../interfaces/ScriptInitOptions.md) |

#### Returns

[`Script`](Script.md)

#### Defined in

[script.ts:209](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/script.ts#L209)
