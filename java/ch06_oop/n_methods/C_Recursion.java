package ch06_oop.n_methods;

import java.math.BigInteger;
import java.util.HashMap;
import java.util.Map;

/*
Recursion: a method that calls itself.
Every recursive method needs
  1. a BASE CASE that stops it
  2. a RECURSIVE CASE that moves toward the base case
Each call uses a stack frame; too deep -> StackOverflowError (an Error, not an Exception).
Java does not optimise tail calls, so very deep recursion should become a loop.
*/
public class C_Recursion {

    static int factorial(int n) {
        if (n <= 1) return 1;                 // base case
        return n * factorial(n - 1);          // recursive case
    }

    static BigInteger bigFactorial(int n) {   // int overflows after 12!, long after 20!
        return n <= 1 ? BigInteger.ONE : BigInteger.valueOf(n).multiply(bigFactorial(n - 1));
    }

    static long fibNaive(int n) {             // O(2^n): recomputes the same values again and again
        return n < 2 ? n : fibNaive(n - 1) + fibNaive(n - 2);
    }

    static final Map<Integer, Long> memo = new HashMap<>();
    static long fibMemo(int n) {              // O(n): each value computed once
        if (n < 2) return n;
        Long cached = memo.get(n);
        if (cached != null) return cached;
        long result = fibMemo(n - 1) + fibMemo(n - 2);
        memo.put(n, result);
        return result;
    }

    static int sumDigits(int n) {
        return n == 0 ? 0 : n % 10 + sumDigits(n / 10);
    }

    static String reverse(String s) {
        return s.isEmpty() ? s : reverse(s.substring(1)) + s.charAt(0);
    }

    static int power(int base, int exp) {     // fast power: O(log exp)
        if (exp == 0) return 1;
        int half = power(base, exp / 2);
        return exp % 2 == 0 ? half * half : half * half * base;
    }

    static void hanoi(int disks, char from, char to, char via) {
        if (disks == 0) return;
        hanoi(disks - 1, from, via, to);
        System.out.println("move disk " + disks + " " + from + " -> " + to);
        hanoi(disks - 1, via, to, from);
    }

    static int depth = 0;
    static void infinite() {
        depth++;
        infinite();
    }

    public static void main(String[] args) {
        System.out.println(factorial(5));            // 120
        System.out.println(factorial(13));           // 1932053504   (WRONG: int overflow)
        System.out.println(bigFactorial(25));        // 15511210043330985984000000
        System.out.println(fibNaive(20) + " " + fibMemo(80));   // 6765 23416728348467685
        System.out.println(sumDigits(9875));         // 29
        System.out.println(reverse("recursion"));    // noisrucer
        System.out.println(power(2, 10));            // 1024

        hanoi(2, 'A', 'C', 'B');
        // move disk 1 A -> B
        // move disk 2 A -> C
        // move disk 1 B -> C

        try {
            infinite();
        } catch (StackOverflowError e) {
            System.out.println("StackOverflowError after ~" + (depth / 1000) * 1000 + "+ calls");
            // StackOverflowError after ~10000+ calls   (the number depends on the JVM stack size)
        }
    }
}
