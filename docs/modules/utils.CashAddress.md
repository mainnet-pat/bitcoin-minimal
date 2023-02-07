[bitcoin-minimal](../README.md) / [utils](utils.md) / CashAddress

# Namespace: CashAddress

[utils](utils.md).CashAddress

## Table of contents

### Enumerations

- [KEY\_TYPE](../enums/utils.CashAddress.KEY_TYPE.md)

### Functions

- [\_convertbits](utils.CashAddress.md#_convertbits)
- [\_create\_checksum](utils.CashAddress.md#_create_checksum)
- [\_decode\_payload](utils.CashAddress.md#_decode_payload)
- [\_pack\_addr\_data](utils.CashAddress.md#_pack_addr_data)
- [\_polymod](utils.CashAddress.md#_polymod)
- [\_prefix\_expand](utils.CashAddress.md#_prefix_expand)
- [decode](utils.CashAddress.md#decode)
- [encode](utils.CashAddress.md#encode)
- [encode\_full](utils.CashAddress.md#encode_full)

## Functions

### \_convertbits

▸ **_convertbits**(`data`, `frombits`, `tobits`, `pad?`): `Uint8Array`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `data` | `Uint8Array` | `undefined` |
| `frombits` | `number` | `undefined` |
| `tobits` | `number` | `undefined` |
| `pad` | `boolean` | `true` |

#### Returns

`Uint8Array`

#### Defined in

[utils/cashaddress.ts:66](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/utils/cashaddress.ts#L66)

___

### \_create\_checksum

▸ **_create_checksum**(`prefix`, `data`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `prefix` | `string` |
| `data` | `Uint8Array` |

#### Returns

`Uint8Array`

#### Defined in

[utils/cashaddress.ts:58](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/utils/cashaddress.ts#L58)

___

### \_decode\_payload

▸ **_decode_payload**(`addr`): [`string`, `Uint8Array`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `addr` | `string` |

#### Returns

[`string`, `Uint8Array`]

#### Defined in

[utils/cashaddress.ts:113](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/utils/cashaddress.ts#L113)

___

### \_pack\_addr\_data

▸ **_pack_addr_data**(`kind`, `addr_hash`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `kind` | `number` |
| `addr_hash` | `Uint8Array` |

#### Returns

`Uint8Array`

#### Defined in

[utils/cashaddress.ts:89](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/utils/cashaddress.ts#L89)

___

### \_polymod

▸ **_polymod**(`values`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `values` | `Uint8Array` |

#### Returns

`number`

#### Defined in

[utils/cashaddress.ts:26](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/utils/cashaddress.ts#L26)

___

### \_prefix\_expand

▸ **_prefix_expand**(`prefix`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `prefix` | `string` |

#### Returns

`Uint8Array`

#### Defined in

[utils/cashaddress.ts:51](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/utils/cashaddress.ts#L51)

___

### decode

▸ **decode**(`address`): [`string`, `number`, `Uint8Array`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

[`string`, `number`, `Uint8Array`]

#### Defined in

[utils/cashaddress.ts:177](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/utils/cashaddress.ts#L177)

___

### encode

▸ **encode**(`prefix`, `kind`, `addr_hash`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `prefix` | `string` |
| `kind` | `number` |
| `addr_hash` | `Uint8Array` |

#### Returns

`string`

#### Defined in

[utils/cashaddress.ts:220](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/utils/cashaddress.ts#L220)

___

### encode\_full

▸ **encode_full**(`prefix`, `kind`, `addr_hash`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `prefix` | `string` |
| `kind` | `number` |
| `addr_hash` | `Uint8Array` |

#### Returns

`string`

#### Defined in

[utils/cashaddress.ts:240](https://github.com/mainnet-pat/bitcoin-minimal/blob/master/src/utils/cashaddress.ts#L240)
