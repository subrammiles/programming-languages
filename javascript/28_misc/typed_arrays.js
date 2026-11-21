/*
Binary data: ArrayBuffer, typed arrays, DataView, Buffer
Used for files, images, audio, WebSockets, WebGL, WebAssembly and network protocols.

  ArrayBuffer -> a fixed block of raw bytes; you cannot read it directly
  Typed array -> a VIEW that reads those bytes as numbers of one type:
                 Uint8Array, Int16Array, Float32Array, Float64Array, BigInt64Array, ...
  DataView    -> a view that reads mixed types at any offset, with chosen endianness
  Buffer      -> Node's subclass of Uint8Array, with extra helpers for encodings
*/

console.log("<<<< ArrayBuffer + typed array views >>>>");
const buffer = new ArrayBuffer(8);// 8 bytes, all zero
const bytes = new Uint8Array(buffer);
const words = new Uint32Array(buffer);// another view of the SAME memory
bytes[0] = 255;
console.log(buffer.byteLength, bytes.length, words.length);// 8 8 2
console.log(words[0]);// 255   (little-endian: byte 0 is the lowest byte)

console.log("<<<< values are converted to fit the type >>>>");
const u8 = new Uint8Array([256, 257, -1, 3.9]);
console.log(u8);// Uint8Array(4) [ 0, 1, 255, 3 ]   (wraps around, drops decimals)
console.log(new Uint8ClampedArray([300, -5]));// Uint8ClampedArray(2) [ 255, 0 ]   (clamps; used for image pixels)
console.log(new Float32Array([0.1])[0]);// 0.10000000149011612   (less precision than a normal number)

console.log("<<<< typed arrays have most array methods, but a fixed length >>>>");
const scores = Int16Array.from([30, -10, 20]);
console.log(scores.map((x) => x * 2), scores.toSorted());// Int16Array(3) [ 60, -20, 40 ] Int16Array(3) [ -10, 20, 30 ]
console.log(Array.isArray(scores), [...scores]);// false [ 30, -10, 20 ]

console.log("<<<< subarray shares memory, slice copies >>>>");
const data = new Uint8Array([1, 2, 3, 4]);
const view = data.subarray(1, 3);
const copy = data.slice(1, 3);
view[0] = 99;
console.log(data, copy);// Uint8Array(4) [ 1, 99, 3, 4 ] Uint8Array(2) [ 2, 3 ]

console.log("<<<< DataView: mixed types and endianness (e.g. reading a file header) >>>>");
const header = new DataView(new ArrayBuffer(7));
header.setUint8(0, 1);// version
header.setUint16(1, 500, false);// width, big-endian (network byte order)
header.setFloat32(3, 1.5, true);// scale, little-endian
console.log(header.getUint8(0), header.getUint16(1, false), header.getFloat32(3, true));// 1 500 1.5

console.log("<<<< text <-> bytes >>>>");
const encoded = new TextEncoder().encode("héllo");// UTF-8
console.log(encoded.length, new TextDecoder().decode(encoded));// 6 héllo   (é takes 2 bytes)

console.log("<<<< Node Buffer >>>>");
const buf = Buffer.from("Hi!");
console.log(buf, buf instanceof Uint8Array);// <Buffer 48 69 21> true
console.log(buf.toString("hex"), buf.toString("base64"));// 486921 SGkh
