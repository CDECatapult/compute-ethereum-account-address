# @digicat/compute-ethereum-account-address

Utility that computes an [Ethereum](https://ethereum.org/) account address given
a compressed public key.

Requires [Node.js](https://nodejs.org/en/) 6 or later.

## Usage

```js
const computeEthereumAccountAddress = require('@digicat/compute-ethereum-account-address')

const publicKey = Buffer.from('03b47c429864fb378ce313c156badf8b8d507ddee11bcb87b475d61faa6b3b8eb1', 'hex')
computeEthereumAccountAddress(publicKey) // 0x4beae951e229649300d09d846d95adf232b08e58
```
