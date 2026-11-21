/*
node:crypto (the same Web Crypto API also exists as globalThis.crypto in browsers)
  randomUUID / randomInt / randomBytes -> secure random values (Math.random is NOT secure)
  createHash      -> fingerprints / checksums (sha256). Not for passwords!
  createHmac      -> signed hashes (webhook signatures, tokens)
  scrypt          -> hashing PASSWORDS (slow on purpose, salted)
  timingSafeEqual -> compare secrets without leaking timing information
*/
const crypto = require("node:crypto");

console.log("<<<< secure random values >>>>");
console.log(crypto.randomUUID().length);// 36   (e.g. 3b241101-e2bb-4255-8caf-4136c566a962)
console.log(crypto.randomBytes(16).toString("hex").length);// 32
const n = crypto.randomInt(1, 7);// 1..6
console.log(n >= 1 && n <= 6);// true

console.log("<<<< hashing (same input -> same hash) >>>>");
const sha256 = (text) => crypto.createHash("sha256").update(text).digest("hex");
console.log(sha256("hello"));// 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
console.log(sha256("hello") === sha256("hello"), sha256("hello") === sha256("Hello"));// true false

console.log("<<<< HMAC: prove a message came from someone with the key >>>>");
const key = "webhook-secret";
const payload = JSON.stringify({ event: "paid", amount: 100 });
const signature = crypto.createHmac("sha256", key).update(payload).digest("hex");
const verify = (body, sig) => {
  const expected = crypto.createHmac("sha256", key).update(body).digest();
  const given = Buffer.from(sig, "hex");
  return given.length === expected.length && crypto.timingSafeEqual(given, expected);
};
console.log(verify(payload, signature));// true
console.log(verify(payload.replace("100", "999"), signature));// false   (tampered)

console.log("<<<< password hashing with scrypt >>>>");
function hashPassword(password) {
  const salt = crypto.randomBytes(16);// a random salt per user: same password -> different hash
  const hash = crypto.scryptSync(password, salt, 32);
  return `${salt.toString("hex")}:${hash.toString("hex")}`;
}
function checkPassword(password, stored) {
  const [saltHex, hashHex] = stored.split(":");
  const hash = crypto.scryptSync(password, Buffer.from(saltHex, "hex"), 32);
  return crypto.timingSafeEqual(hash, Buffer.from(hashHex, "hex"));
}
const stored = hashPassword("correct horse");
console.log(stored === hashPassword("correct horse"));// false   (different salt each time)
console.log(checkPassword("correct horse", stored), checkPassword("wrong", stored));// true false

console.log("<<<< base64 encoding (encoding is NOT encryption) >>>>");
const encoded = Buffer.from("user:pass").toString("base64");
console.log(encoded, Buffer.from(encoded, "base64").toString());// dXNlcjpwYXNz user:pass
console.log(btoa("hi"), atob("aGk="));// aGk= hi   (browser-style helpers, also in Node)
