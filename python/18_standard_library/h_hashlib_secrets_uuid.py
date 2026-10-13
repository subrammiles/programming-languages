"""
 hashlib  - hashes (SHA-256 etc.) for checksums
 secrets  - cryptographically secure random values: tokens, passwords, OTPs
 uuid     - unique IDs; uuid7 (3.14) is time-ordered, good for database keys
 hmac     - verify a message wasn't changed
For storing PASSWORDS use a slow hash: hashlib.scrypt or a library like argon2/bcrypt.
"""
import hashlib
import hmac
import secrets
import uuid

print(hashlib.sha256(b"hello").hexdigest())  # 2cf24dba5fb0a30e...
print(hashlib.md5(b"hello").hexdigest())  # don't use md5 for security

print(secrets.token_hex(16))  # 32 hex characters
print(secrets.token_urlsafe(16))  # for password-reset links
print(f"{secrets.randbelow(1_000_000):06d}")  # a 6-digit OTP

salt = secrets.token_bytes(16)
key = hashlib.scrypt(b"my password", salt=salt, n=2**14, r=8, p=1)
print(len(key), "byte password hash")

signature = hmac.new(b"server-secret", b"amount=100", hashlib.sha256).hexdigest()
print(hmac.compare_digest(signature, hmac.new(b"server-secret", b"amount=100", hashlib.sha256).hexdigest()))  # True

print(uuid.uuid4())  # random
a, b = uuid.uuid7(), uuid.uuid7()
print(a, a < b)  # time-ordered -> True
