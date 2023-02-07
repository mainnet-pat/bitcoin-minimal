bitcoin-minimal

# bitcoin-minimal

## Table of contents

### Namespaces

- [utils](modules/utils.md)

### Classes

- [Block](classes/Block.md)
- [DSProof](classes/DSProof.md)
- [DSProofSpender](classes/DSProofSpender.md)
- [Header](classes/Header.md)
- [Script](classes/Script.md)
- [Transaction](classes/Transaction.md)

### Interfaces

- [BlockOptions](interfaces/BlockOptions.md)
- [ScriptChunk](interfaces/ScriptChunk.md)
- [ScriptGetBitcoms](interfaces/ScriptGetBitcoms.md)
- [ScriptInitOptions](interfaces/ScriptInitOptions.md)
- [TransactionInput](interfaces/TransactionInput.md)
- [TransactionOutput](interfaces/TransactionOutput.md)

### Type Aliases

- [BlockStream](README.md#blockstream)
- [ScriptBitcom](README.md#scriptbitcom)

### Variables

- [NETWORK\_PREFIX](README.md#network_prefix)

## Type Aliases

### BlockStream

Ƭ **BlockStream**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bytesRead` | `number` |
| `bytesRemaining` | `number` |
| `finished` | `boolean` |
| `header` | [`Header`](classes/Header.md) |
| `height?` | `number` |
| `size` | `number` |
| `startDate` | `number` |
| `started` | `boolean` |
| `transactions` | [`number`, [`Transaction`](classes/Transaction.md), `number`, `number`][] |
| `txCount` | `number` |
| `txRead` | `number` |

#### Defined in

[block.ts:9](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/block.ts#L9)

___

### ScriptBitcom

Ƭ **ScriptBitcom**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut?` | { `data`: `Buffer` ; `encoding`: `string` ; `name`: `string` ; `type`: `string`  } |
| `19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut.data` | `Buffer` |
| `19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut.encoding` | `string` |
| `19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut.name` | `string` |
| `19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut.type` | `string` |
| `1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5?` | { `map`: { `[key: string]`: `string`;  } ; `type`: `string`  } |
| `1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5.map` | { `[key: string]`: `string`;  } |
| `1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5.type` | `string` |
| `bitcom` | `string` |
| `data` | `Buffer`[] |

#### Defined in

[script.ts:29](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/script.ts#L29)

## Variables

### NETWORK\_PREFIX

• `Const` **NETWORK\_PREFIX**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `mainnet` | `string` |
| `regtest` | `string` |
| `testnet` | `string` |

#### Defined in

[script.ts:9](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/script.ts#L9)
