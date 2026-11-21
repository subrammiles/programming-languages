package ch25_interview_questions.b_number_programs;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

/*
Number programs asked in Java interviews.
*/
public class NumberPrograms {

    // 1. FizzBuzz
    static String fizzBuzz(int n) {
        return IntStream.rangeClosed(1, n)
                .mapToObj(i -> i % 15 == 0 ? "FizzBuzz" : i % 3 == 0 ? "Fizz" : i % 5 == 0 ? "Buzz" : String.valueOf(i))
                .collect(Collectors.joining(" "));
    }

    // 2. Prime check: only test divisors up to sqrt(n)
    static boolean isPrime(int n) {
        if (n < 2) return false;
        if (n % 2 == 0) return n == 2;
        for (int i = 3; (long) i * i <= n; i += 2) {
            if (n % i == 0) return false;
        }
        return true;
    }

    // 3. Primes up to n: Sieve of Eratosthenes, O(n log log n)
    static List<Integer> primesUpTo(int n) {
        boolean[] composite = new boolean[n + 1];
        List<Integer> primes = new ArrayList<>();
        for (int i = 2; i <= n; i++) {
            if (composite[i]) continue;
            primes.add(i);
            for (long j = (long) i * i; j <= n; j += i) composite[(int) j] = true;
        }
        return primes;
    }

    // 4. Fibonacci series, iterative
    static List<Long> fibonacci(int count) {
        List<Long> series = new ArrayList<>();
        long a = 0, b = 1;
        for (int i = 0; i < count; i++) {
            series.add(a);
            long next = a + b;
            a = b;
            b = next;
        }
        return series;
    }

    // 5. Factorial: long overflows after 20!, so use BigInteger for big n
    static long factorial(int n) {
        long result = 1;
        for (int i = 2; i <= n; i++) result *= i;
        return result;
    }

    static BigInteger bigFactorial(int n) {
        BigInteger result = BigInteger.ONE;
        for (int i = 2; i <= n; i++) result = result.multiply(BigInteger.valueOf(i));
        return result;
    }

    // 6. Reverse a number and check a number palindrome
    static int reverseNumber(int n) {
        int reversed = 0;
        while (n != 0) {
            reversed = reversed * 10 + n % 10;
            n /= 10;
        }
        return reversed;
    }

    // 7. Armstrong number: sum of digits^(number of digits) == number  (153 = 1^3 + 5^3 + 3^3)
    static boolean isArmstrong(int n) {
        int digits = String.valueOf(n).length();
        int sum = 0;
        for (int t = n; t > 0; t /= 10) sum += (int) Math.pow(t % 10, digits);
        return sum == n;
    }

    // 8. Perfect number: sum of proper divisors == number  (28 = 1 + 2 + 4 + 7 + 14)
    static boolean isPerfect(int n) {
        int sum = 1;
        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) {
                sum += i;
                if (i != n / i) sum += n / i;
            }
        }
        return n > 1 && sum == n;
    }

    // 9. GCD (Euclid) and LCM
    static int gcd(int a, int b) { return b == 0 ? a : gcd(b, a % b); }
    static int lcm(int a, int b) { return a / gcd(a, b) * b; }

    // 10. Sum of digits, count digits
    static int sumOfDigits(int n) {
        int sum = 0;
        for (n = Math.abs(n); n > 0; n /= 10) sum += n % 10;
        return sum;
    }

    // 11. Decimal to binary by hand
    static String toBinary(int n) {
        if (n == 0) return "0";
        StringBuilder sb = new StringBuilder();
        for (; n > 0; n /= 2) sb.append(n % 2);
        return sb.reverse().toString();
    }

    // 12. Is n a power of two?  (one bit set)
    static boolean isPowerOfTwo(int n) { return n > 0 && (n & (n - 1)) == 0; }

    public static void main(String[] args) {
        System.out.println(fizzBuzz(15));                        // 1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz
        System.out.println(isPrime(97) + " " + isPrime(91) + " " + isPrime(2));   // true false true
        System.out.println(primesUpTo(30));                      // [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
        System.out.println(fibonacci(10));                       // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
        System.out.println(factorial(20) + " " + factorial(21)); // 2432902008176640000 -4249290049419214848   (21! overflows)
        System.out.println(bigFactorial(21));                    // 51090942171709440000
        System.out.println(reverseNumber(12345) + " " + (reverseNumber(1221) == 1221));   // 54321 true
        System.out.println(IntStream.range(1, 1000).filter(NumberPrograms::isArmstrong).boxed().toList());
        // [1, 2, 3, 4, 5, 6, 7, 8, 9, 153, 370, 371, 407]
        System.out.println(IntStream.range(1, 10_000).filter(NumberPrograms::isPerfect).boxed().toList());   // [6, 28, 496, 8128]
        System.out.println(gcd(48, 18) + " " + lcm(4, 6));       // 6 12
        System.out.println(sumOfDigits(9875) + " " + String.valueOf(Math.abs(-9875)).length());   // 29 4
        System.out.println(toBinary(10) + " " + Integer.toBinaryString(10));   // 1010 1010
        System.out.println(isPowerOfTwo(64) + " " + isPowerOfTwo(48));         // true false

        // 13. Swap two numbers without a temp variable
        int a = 5, b = 9;
        a = a + b;   // 14
        b = a - b;   // 5
        a = a - b;   // 9
        System.out.println(a + " " + b);                         // 9 5
        a ^= b; b ^= a; a ^= b;                                  // the XOR trick
        System.out.println(a + " " + b);                         // 5 9

        // 14. Even or odd without %
        System.out.println(((7 & 1) == 0 ? "even" : "odd"));     // odd
    }
}
