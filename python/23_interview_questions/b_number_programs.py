"""
Number programs asked in Python interviews.
Python ints never overflow (they grow as needed), which changes some classic answers.
"""
import math
from functools import cache

# 1. FizzBuzz
print(" ".join("Fizz" * (i % 3 == 0) + "Buzz" * (i % 5 == 0) or str(i) for i in range(1, 16)))
# 1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz


# 2. Prime check, and all primes up to n (Sieve of Eratosthenes)
def is_prime(n):
    if n < 2:
        return False
    return all(n % i for i in range(2, math.isqrt(n) + 1))


def primes_up_to(n):
    sieve = [True] * (n + 1)
    sieve[0:2] = [False, False]
    for i in range(2, math.isqrt(n) + 1):
        if sieve[i]:
            sieve[i * i::i] = [False] * len(range(i * i, n + 1, i))   # cross out multiples with a slice
    return [i for i, prime in enumerate(sieve) if prime]


print(is_prime(97), is_prime(91), is_prime(2))   # True False True
print(primes_up_to(30))                          # [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]


# 3. Fibonacci: generator, memoised recursion
def fib_gen(count):
    a, b = 0, 1
    for _ in range(count):
        yield a
        a, b = b, a + b


@cache
def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)


print(list(fib_gen(10)))                         # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
print(fib(100))                                  # 354224848179261915075   (no overflow in Python)


# 4. Factorial
def factorial(n):
    return 1 if n <= 1 else n * factorial(n - 1)


print(factorial(5), math.factorial(25))          # 120 15511210043330985984000000


# 5. Reverse a number, number palindrome
def reverse_number(n):
    sign = -1 if n < 0 else 1
    return sign * int(str(abs(n))[::-1])


print(reverse_number(12345), reverse_number(-120), str(1221) == str(1221)[::-1])   # 54321 -21 True


# 6. Armstrong numbers: sum of digits ** number of digits == number
def is_armstrong(n):
    digits = str(n)
    return n == sum(int(d) ** len(digits) for d in digits)


print([n for n in range(1, 1000) if is_armstrong(n)])   # [1, 2, 3, 4, 5, 6, 7, 8, 9, 153, 370, 371, 407]


# 7. Perfect numbers: sum of proper divisors == number
def is_perfect(n):
    return n > 1 and sum(d + (n // d if d * d != n else 0) for d in range(2, math.isqrt(n) + 1) if n % d == 0) + 1 == n


print([n for n in range(1, 10_000) if is_perfect(n)])   # [6, 28, 496, 8128]


# 8. GCD and LCM
def gcd(a, b):
    while b:
        a, b = b, a % b
    return a


print(gcd(48, 18), math.gcd(48, 18), math.lcm(4, 6))   # 6 6 12


# 9. Sum of digits, digit count
n = 9875
print(sum(map(int, str(n))), len(str(n)))       # 29 4


# 10. Binary, octal, hex conversions
print(bin(10), oct(8), hex(255), int("1010", 2), int("ff", 16), f"{10:08b}")   # 0b1010 0o10 0xff 10 255 00001010


# 11. Power of two (bit trick)
print([x for x in (1, 6, 16, 48, 64) if x > 0 and x & (x - 1) == 0])   # [1, 16, 64]


# 12. Swap without a temp variable
a, b = 5, 9
a, b = b, a                                      # tuple packing / unpacking
print(a, b)                                      # 9 5


# 13. Second largest number
nums = [12, 35, 1, 10, 34, 35]
print(sorted(set(nums))[-2])                     # 34


# 14. Leap year
def is_leap(year):
    return year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)


print([y for y in (1900, 2000, 2024, 2026) if is_leap(y)])   # [2000, 2024]


# 15. Float precision
print(0.1 + 0.2 == 0.3, math.isclose(0.1 + 0.2, 0.3), round(2.5), round(3.5))   # False True 2 4   (round half to even)
