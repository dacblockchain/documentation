# Personal Module

The `personal` module manages encrypted private keys in the local node keystore. It provides APIs to create new accounts, unlock accounts to enable signing, sign messages, and directly execute pre-authenticated transactions.

---

### personal_newAccount {#personal-newaccount}

Creates a new encrypted keystore keyfile in the node's local storage.

**Parameters**

1. `String` - Passphrase to encrypt the keystore file.

**Returns**

`DATA`, 20 Bytes - The address of the newly created account.

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"personal_newAccount","params":["mySecretPassword123"],"id":1}'
// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "0x407d73d8a49eeb85d32cf465507dd71d507100c1"
}
```

---

### personal_listAccounts {#personal-listaccounts}

Lists all managed keystore addresses on the local node.

**Parameters**

None

**Returns**

`Array of DATA`, 20 Bytes - A list of addresses managed by the local node.

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"personal_listAccounts","params":[],"id":1}'
// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": [
    "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
    "0xeb85a5557e5bdc18ee1934a89d8bb402398ee26a"
  ]
}
```

---

### personal_unlockAccount {#personal-unlockaccount}

Decrypts the private key of the given address into memory for a specified duration to allow signing.

**Parameters**

1. `DATA`, 20 Bytes - The address to unlock.
2. `String` - Passphrase used to decrypt the keystore.
3. `Number` - (optional) Unlock duration in seconds (default: `300`). Pass `0` to keep unlocked indefinitely until node shutdown.

**Returns**

`Boolean` - `true` if unlock succeeded, otherwise `false`.

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"personal_unlockAccount","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "mySecretPassword123", 60],"id":1}'
// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": true
}
```

---

### personal_lockAccount {#personal-lockaccount}

Removes the decrypted private key of the given address from memory.

**Parameters**

1. `DATA`, 20 Bytes - The address to lock.

**Returns**

`Boolean` - `true` if lock succeeded, otherwise `false`.

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"personal_lockAccount","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1"],"id":1}'
// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": true
}
```

---

### personal_sendTransaction {#personal-sendtransaction}

Signs a transaction and broadcasts it to the network in one step, using the specified account's password. The account does not need to be pre-unlocked.

**Parameters**

1. `Object` - The transaction object (see [eth_sendTransaction](./modules-eth.md#eth-sendtransaction) for fields).
2. `String` - Passphrase to decrypt the sender keystore file.

**Returns**

`DATA`, 32 Bytes - The transaction hash.

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"personal_sendTransaction","params":[{"from": "0x407d73d8a49eeb85d32cf465507dd71d507100c1", "to": "0xeb85a5557e5bdc18ee1934a89d8bb402398ee26a", "value": "0xde0b6b3a7640000"}, "mySecretPassword123"],"id":1}'
// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

---

### personal_sign {#personal-sign}

Calculates an Ethereum-specific signature over message data using: `sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))`.

**Parameters**

1. `DATA` - Hex-encoded raw message bytes.
2. `DATA`, 20 Bytes - Address to sign with.
3. `String` - Passphrase to unlock the signing key.

**Returns**

`DATA` - Hex-encoded signature.

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"personal_sign","params":["0x68656c6c6f20776f726c64", "0x407d73d8a49eeb85d32cf465507dd71d507100c1", "mySecretPassword123"],"id":1}'
// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

---

### personal_ecRecover {#personal-ecrecover}

Recovers the address associated with the private key that signed the given message.

**Parameters**

1. `DATA` - Hex-encoded message bytes.
2. `DATA` - Hex-encoded signature signature bytes.

**Returns**

`DATA`, 20 Bytes - Recovered signer address.

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"personal_ecRecover","params":["0x68656c6c6f20776f726c64", "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"],"id":1}'
// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "0x407d73d8a49eeb85d32cf465507dd71d507100c1"
}
```
