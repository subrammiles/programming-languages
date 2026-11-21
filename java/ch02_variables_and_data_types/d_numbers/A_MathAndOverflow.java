package ch02_variables_and_data_types.d_numbers;

import java.util.concurrent.ThreadLocalRandom;

/*
Math, integer overflow, integer division and floating-point surprises
 - int is 32-bit (about +/- 2.1 billion), long is 64-bit. Overflow WRAPS AROUND silently.
 - Math.addExact / multiplyExact / toIntExact throw ArithmeticException instead.
 - int / int is integer division (decimals dropped); % keeps the sign of the left side.
 - double is binary floating point: 0.1 + 0.2 != 0.3. Never use double for money (see B_BigDecimal...).
*/
public class A_MathAndOverflow {

    public static void main(String[] args) {
        // Overflow
        int max = Integer.MAX_VALUE;
        System.out.println(max);                        // 2147483647
        System.out.println(max + 1);                    // -2147483648   (wrapped around!)
        System.out.println((long) max + 1);             // 2147483648    (widen BEFORE adding)
        try {
            Math.addExact(max, 1);
        } catch (ArithmeticException e) {
            System.out.println(e.getMessage());         // integer overflow
        }
        System.out.println(Math.abs(Integer.MIN_VALUE));    // -2147483648   (no positive equivalent!)

        // Integer division and modulo
        System.out.println(7 / 2 + " " + 7 / 2.0 + " " + (double) 7 / 2);   // 3 3.5 3.5
        System.out.println(-7 / 2 + " " + -7 % 3 + " " + Math.floorMod(-7, 3));   // -3 -1 2
        try {
            System.out.println(1 / 0);
        } catch (ArithmeticException e) {
            System.out.println(e.getMessage());         // / by zero
        }
        System.out.println(1.0 / 0 + " " + 0.0 / 0);    // Infinity NaN   (no exception for doubles)

        // Floating point
        System.out.println(0.1 + 0.2);                  // 0.30000000000000004
        System.out.println(0.1 + 0.2 == 0.3);           // false
        System.out.println(Math.abs(0.1 + 0.2 - 0.3) < 1e-9);   // true   (compare with a tolerance)
        System.out.println(Double.NaN == Double.NaN);   // false
        System.out.println(Double.isNaN(0.0 / 0));      // true

        // Rounding
        System.out.println(Math.round(2.5) + " " + Math.round(-2.5));   // 3 -2
        System.out.println(Math.floor(-2.5) + " " + Math.ceil(-2.5));   // -3.0 -2.0
        System.out.println((int) 3.99 + " " + (int) -3.99);             // 3 -3   (casting truncates)
        System.out.println(Math.rint(2.5) + " " + Math.rint(3.5));      // 2.0 4.0  (round half to even)

        // Useful Math methods
        System.out.println(Math.max(3, 9) + " " + Math.min(3, 9) + " " + Math.abs(-4));   // 9 3 4
        System.out.println(Math.pow(2, 10) + " " + Math.sqrt(144) + " " + Math.cbrt(27)); // 1024.0 12.0 3.0
        System.out.println(Math.hypot(3, 4) + " " + Math.clamp(150, 0, 100));             // 5.0 100

        // Random numbers
        int dice = ThreadLocalRandom.current().nextInt(1, 7);           // 1..6
        int legacy = (int) (Math.random() * 6) + 1;                     // the old way, also 1..6
        System.out.println(dice >= 1 && dice <= 6 && legacy >= 1 && legacy <= 6);   // true

        // Number bases and bits
        System.out.println(Integer.toBinaryString(10) + " " + Integer.toHexString(255) + " " + Integer.toOctalString(8));   // 1010 ff 10
        System.out.println(Integer.parseInt("1010", 2) + " " + Integer.parseInt("ff", 16));   // 10 255
        System.out.println(Integer.bitCount(255) + " " + Integer.highestOneBit(100));         // 8 64
        System.out.println(0b1010 + " " + 0x1F + " " + 1_000_000);                            // 10 31 1000000
    }
}
