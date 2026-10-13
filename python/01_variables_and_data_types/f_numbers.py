"""
Numbers: int, float, complex
 - int has no size limit
 - float is a 64-bit binary number: some decimals cannot be stored exactly
 - /  always returns a float; // floors; % remainder; ** power
"""
import math

print("<<<< int >>>>")
print(2 ** 100)  # 1267650600228229401496703205376 -> no overflow
print(1_000_000)  # 1000000 -> underscores make big numbers readable
print(0b1010, 0o17, 0xFF)  # 10 15 255 -> binary, octal, hex

print("<<<< division >>>>")
print(7 / 2)  # 3.5
print(7 // 2)  # 3
print(-7 // 2)  # -4 -> floors towards minus infinity
print(7 % 2)  # 1
print(divmod(17, 5))  # (3, 2)

print("<<<< float precision >>>>")
print(0.1 + 0.2)  # 0.30000000000000004
print(0.1 + 0.2 == 0.3)  # False
print(math.isclose(0.1 + 0.2, 0.3))  # True -> compare floats this way
print(round(2.675, 2))  # 2.67 (2.675 is really 2.67499999...)
print(round(2.5), round(3.5))  # 2 4 -> "banker's rounding" to the nearest even

print("<<<< special values >>>>")
print(float("inf") > 10 ** 308)  # True
print(math.isnan(float("nan")))  # True

print("<<<< complex >>>>")
c = 3 + 4j
print(c.real, c.imag, abs(c))  # 3.0 4.0 5.0

print("<<<< useful built-ins >>>>")
print(abs(-5), max(3, 9, 1), min(3, 9, 1), sum([1, 2, 3]))  # 5 9 1 6
print(pow(2, 10), pow(2, 10, 1000))  # 1024 24 -> third argument is modulo
# For exact decimals (money) use decimal.Decimal, see 18_standard_library
