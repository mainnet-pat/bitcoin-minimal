// https://github.com/Electron-Cash/Electron-Cash/blob/08269d133a492ceef0bdfa26e79f3d7cfd843e54/electroncash/cashaddr.py

// # Copyright (c) 2017 Pieter Wuille
// # Copyright (c) 2017 Shammah Chancellor, Neil Booth
// #
// # Permission is hereby granted, free of charge, to any person obtaining a copy
// # of this software and associated documentation files (the "Software"), to deal
// # in the Software without restriction, including without limitation the rights
// # to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// # copies of the Software, and to permit persons to whom the Software is
// # furnished to do so, subject to the following conditions:
// #
// # The above copyright notice and this permission notice shall be included in
// # all copies or substantial portions of the Software.
// #
// # THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// # IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// # FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// # AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// # LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// # OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// # THE SOFTWARE.

const _CHARSET: string = "qpzry9x8gf2tvdw0s3jn54khce6mua7l";

export const _polymod = (values: Uint8Array): number => {
    // """Internal function that computes the cashaddr checksum."""
    let c = BigInt(1);
    for (const d of values) {
        const c0 = c >> BigInt(35);
        c = ((c & BigInt(0x07ffffffff)) << BigInt(5)) ^ BigInt(d);
        if (c0 & BigInt(0x01)) {
            c ^= BigInt(0x98f2bc8e61);
        }
        if (c0 & BigInt(0x02)) {
            c ^= BigInt(0x79b76d99e2);
        }
        if (c0 & BigInt(0x04)) {
            c ^= BigInt(0xf33e5fb3c4);
        }
        if (c0 & BigInt(0x08)) {
            c ^= BigInt(0xae2eabe2a8);
        }
        if (c0 & BigInt(0x10)) {
            c ^= BigInt(0x1e4f43e470);
        }
    }
    return Number(c ^ BigInt(1));
  }

export const _prefix_expand = (prefix: string): Uint8Array => {
    // """Expand the prefix into values for checksum computation."""
    const retval = Uint8Array.from(Array.from(prefix).map(val => val.charCodeAt(0) & 0x1f));
    // # Append null separator
    return new Uint8Array([...retval, 0x00]);
}

export const _create_checksum = (prefix: string, data: Uint8Array): Uint8Array => {
    // """Compute the checksum values given prefix and data."""
    const values = new Uint8Array([..._prefix_expand(prefix), ...data, ...new Uint8Array(8)]);
    const polymod = _polymod(values);
    // # Return the polymod expanded into eight 5-bit elements
    return new Uint8Array(8).map((_, i) => Number((BigInt(polymod) >> BigInt(5) * (BigInt(7) - BigInt(i))) & BigInt(31)));
}

export const _convertbits = (data: Uint8Array, frombits: number, tobits: number, pad: boolean = true): Uint8Array => {
    // """General power-of-2 base conversion."""
    let acc = 0;
    let bits = 0;
    let ret = new Uint8Array();
    const maxv = (1 << tobits) - 1;
    const max_acc = (1 << (frombits + tobits - 1)) - 1;
    for (const value of data) {
        acc = ((acc << frombits) | value ) & max_acc;
        bits += frombits;
        while (bits >= tobits) {
            bits -= tobits;
            ret = Uint8Array.from([...ret, (acc >> bits) & maxv]);
        }
    }

    if (pad && bits) {
        ret = Uint8Array.from([...ret, (acc << (tobits - bits)) & maxv]);
    }

    return ret;
}

export const _pack_addr_data = (kind: number, addr_hash: Uint8Array): Uint8Array => {
    // """Pack addr data with version byte"""
    let version_byte = kind << 3

    let offset = 1
    let encoded_size = 0
    if (addr_hash.length >= 40) {
        offset = 2
        encoded_size |= 0x04
    }
    encoded_size |= (addr_hash.length - 20 * offset) // (4 * offset)

    // # invalid size?
    if ((addr_hash.length - 20 * offset) % (4 * offset) != 0
            || ((encoded_size < 0) || (encoded_size > 7))) {
        throw Error(`invalid address hash size ${addr_hash}`)
    }

    version_byte |= encoded_size

    const data = new Uint8Array([version_byte, ...addr_hash]);
    return _convertbits(data, 8, 5, true);
}

export const _decode_payload = (addr: string): [string, Uint8Array] => {
    // """Validate a cashaddr string.

    // Throws CashAddr.Error if it is invalid, otherwise returns the
    // triple

    //    (prefix,  payload)

    // without the checksum.
    // """
    const lower = addr.toLocaleLowerCase();
    if (lower !== addr && addr.toUpperCase() != addr) {
        throw Error(`mixed case in address: ${addr}`);
    }

    const parts = lower.split(':');
    if (parts.length != 2) {
        throw Error(`address missing ':' separator: ${addr}`);
    }

    let [prefix, payload] = parts;
    if (!prefix) {
        throw Error(`address prefix is missing: ${addr}`);
    }
    if (Array.from(prefix).map(val => val.charCodeAt(0)).some(val => val < 33 || val > 126)) {
        throw Error(`invalid address prefix: ${prefix}`);
    }
    if (payload.length < 8 || payload.length > 124) {
        throw Error(`address payload has invalid length: ${payload.length}`);
    }

    const data = Uint8Array.from(Array.from(payload).map(val => _CHARSET.indexOf(val)));
    if (data.includes(255))
        throw Error(`invalid characters in address: ${payload}`);

    if (_polymod(new Uint8Array([..._prefix_expand(prefix), ...data]))) {
        throw Error(`invalid checksum in address: ${addr}`);
    }

    if (lower !== addr) {
        prefix = prefix.toUpperCase();
    }

    // # Drop the 40 bit checksum
    return [prefix, Uint8Array.from(data.slice(0, -8))];
}

// #
// # External Interface
// #

const PUBKEY_TYPE = 0;
const SCRIPT_TYPE = 1;
const PUBKEY_TYPE_WITH_TOKENS = 2;
const SCRIPT_TYPE_WITH_TOKENS = 3;
const VALID_SCRIPT_TYPES = [PUBKEY_TYPE, SCRIPT_TYPE, PUBKEY_TYPE_WITH_TOKENS, SCRIPT_TYPE_WITH_TOKENS];

export enum KEY_TYPE {
  PUBKEY_TYPE,
  SCRIPT_TYPE,
  PUBKEY_TYPE_WITH_TOKENS,
  SCRIPT_TYPE_WITH_TOKENS
}

export const decode = (address: string): [string, number, Uint8Array] => {
    // '''Given a cashaddr address, return a triple

    //       (prefix, kind, hash)
    // '''
    if (typeof address !== "string") {
        throw Error('address must be a string');
    }

    const [prefix, payload] = _decode_payload(address);

    // # Ensure there isn't extra padding
    const extrabits = payload.length * 5 % 8;
    if (extrabits >= 5) {
        throw Error(`excess padding in address ${address}`);
    }

    // # Ensure extrabits are zeros
    if (payload.slice(-1)[0] & ((1 << extrabits) - 1)) {
        throw Error(`non-zero padding in address ${address}`);
    }

    const decoded = _convertbits(payload, 5, 8, false);
    const version = decoded[0];
    const addr_hash = decoded.slice(1);
    let size = (version & 0x03) * 4 + 20;
    // # Double the size, if the 3rd bit is on.
    if (version & 0x04) {
        size <<= 1;
    }
    if (size != addr_hash.length) {
        throw Error(`address hash has length ${addr_hash.length} but expected ${size}`);
    }

    const kind = version >> 3;
    if (!VALID_SCRIPT_TYPES.includes(kind)) {
        throw Error(`unrecognised address type ${kind}`);
    }

    return [prefix, kind, addr_hash];
}


export const encode = (prefix: string, kind: number, addr_hash: Uint8Array): string => {
    // """Encode a cashaddr address without prefix and separator."""
    if (typeof prefix !== "string") {
        throw Error(`prefix must be a string`);
    }

    if (!(addr_hash instanceof Uint8Array)) {
        throw Error('addr_hash must be binary bytes');
    }

    if (!VALID_SCRIPT_TYPES.includes(kind)) {
        throw Error(`unrecognised address type ${kind}`);
    }

    const payload = _pack_addr_data(kind, addr_hash);
    const checksum = _create_checksum(prefix, payload);
    return Array.from(new Uint8Array([...payload, ...checksum])).map(val => _CHARSET[val]).join('');
}


export const encode_full = (prefix: string, kind: number, addr_hash: Uint8Array): string => {
    // """Encode a full cashaddr address, with prefix and separator."""
    return `${prefix}:${encode(prefix, kind, addr_hash)}`;
}