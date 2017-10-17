import test from 'ava'

import computeEthereumAccountAddress from '.'

test('computes the right address', t => {
  // Private key: acae04991c16a096aa0e288b9a8c3b5fda72e81a1dc261f7a8deee891cb248ad
  const publicKey = Buffer.from('03b47c429864fb378ce313c156badf8b8d507ddee11bcb87b475d61faa6b3b8eb1', 'hex')
  t.is(computeEthereumAccountAddress(publicKey), '0x4beae951e229649300d09d846d95adf232b08e58')
})

const throws = (t, publicKey) => t.throws(() => computeEthereumAccountAddress(publicKey), TypeError)
throws.title = desc => `throws TypeError for ${desc}`

test('a non-Buffer value', throws, [2, ...Array.from({length: 32}, () => 42)])
test('a Buffer value that’s too short', throws, Buffer.from([2, ...Array.from({length: 31}, () => 42)]))
test('a Buffer value that’s too long', throws, Buffer.from([2, ...Array.from({length: 33}, () => 42)]))

for (let start = 0; start <= 255; start++) {
  if (start === 2 || start === 3) continue
  test(`a Buffer value that starts with ${start}`, throws, Buffer.from([start, ...Array.from({length: 32}, () => 42)]))
}
