"""
Membership: in, not in   -> works with str, list, tuple, set, dict (checks keys)
Bitwise:    & | ^ ~ << >>
"""
print("<<<< membership >>>>")
print("py" in "python")  # True
print(3 in [1, 2, 3])  # True
print("a" in {"a": 1})  # True -> keys
print(1 in {"a": 1})  # False -> not values
print("z" not in "python")  # True
# Sets and dicts check membership very fast (hashing); lists check one item at a time.

print("<<<< bitwise >>>>")
a, b = 0b1100, 0b1010  # 12, 10
print(a & b, bin(a & b))  # 8 0b1000
print(a | b, bin(a | b))  # 14 0b1110
print(a ^ b, bin(a ^ b))  # 6 0b110
print(~a)  # -13
print(1 << 4, 64 >> 2)  # 16 16

# Bit flags
READ, WRITE, EXEC = 1, 2, 4
perms = READ | WRITE
print(bool(perms & WRITE), bool(perms & EXEC))  # True False
