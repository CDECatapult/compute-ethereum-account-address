'use strict'

const createKeccakHash = require('keccak')
const {publicKeyConvert} = require('secp256k1')

function computeEthereumAccountAddress (publicKey) {
  if (
    !Buffer.isBuffer(publicKey) ||
    publicKey.byteLength !== 33 ||
    (publicKey[0] !== 2 && publicKey[0] !== 3)
  ) {
    throw new TypeError('Not a valid public key')
  }

  // Ensure the key is uncompressed. Ignore any leading bytes that indiciate
  // key type.
  const longKey = publicKeyConvert(publicKey, false).slice(-64)
  // The address is formed by the last 20 bytes of the keccak256 hash of the
  // public key.
  return '0x' + createKeccakHash('keccak256')
    .update(longKey)
    .digest()
    .slice(-20)
    .toString('hex')
}
module.exports = computeEthereumAccountAddress
