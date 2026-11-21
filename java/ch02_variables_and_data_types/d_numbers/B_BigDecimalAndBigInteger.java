package ch02_variables_and_data_types.d_numbers;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.math.RoundingMode;
import java.text.NumberFormat;
import java.util.Locale;

/*
BigDecimal and BigInteger (java.math)
 BigDecimal: exact decimal numbers. Use it for MONEY and anything that must not lose cents.
 BigInteger: integers of any size (factorials, cryptography, huge IDs).
Both are immutable: add(), multiply() ... return a NEW object.

BigDecimal rules:
 - create from a String or BigDecimal.valueOf(double), NOT new BigDecimal(0.1)
 - divide() needs a scale and RoundingMode when the result does not terminate (1/3)
 - equals() compares scale too (2.0 vs 2.00 are not equal); use compareTo() for value
*/
public class B_BigDecimalAndBigInteger {

    public static void main(String[] args) {
        // Why double is wrong for money
        double total = 0;
        for (int i = 0; i < 10; i++) total += 0.10;
        System.out.println(total);                                  // 0.9999999999999999

        BigDecimal exact = BigDecimal.ZERO;
        for (int i = 0; i < 10; i++) exact = exact.add(new BigDecimal("0.10"));
        System.out.println(exact);                                  // 1.00

        // Creating: from a String, not from a double
        System.out.println(new BigDecimal(0.1));                    // 0.1000000000000000055511151231257827021181583404541015625
        System.out.println(new BigDecimal("0.1") + " " + BigDecimal.valueOf(0.1));   // 0.1 0.1

        // Arithmetic and rounding
        BigDecimal price = new BigDecimal("19.99");
        BigDecimal qty = BigDecimal.valueOf(3);
        BigDecimal taxRate = new BigDecimal("0.0825");
        BigDecimal subtotal = price.multiply(qty);
        BigDecimal tax = subtotal.multiply(taxRate).setScale(2, RoundingMode.HALF_UP);
        System.out.println(subtotal + " + " + tax + " = " + subtotal.add(tax));       // 59.97 + 4.95 = 64.92

        try {
            BigDecimal.ONE.divide(BigDecimal.valueOf(3));
        } catch (ArithmeticException e) {
            System.out.println(e.getMessage());                     // Non-terminating decimal expansion; no exact representable decimal result.
        }
        System.out.println(BigDecimal.ONE.divide(BigDecimal.valueOf(3), 4, RoundingMode.HALF_UP));   // 0.3333

        // Rounding modes
        BigDecimal half = new BigDecimal("2.5");
        System.out.println(half.setScale(0, RoundingMode.HALF_UP) + " "
                + half.setScale(0, RoundingMode.HALF_EVEN) + " "
                + half.setScale(0, RoundingMode.DOWN));             // 3 2 2

        // equals vs compareTo
        BigDecimal a = new BigDecimal("2.0"), b = new BigDecimal("2.00");
        System.out.println(a.equals(b) + " " + (a.compareTo(b) == 0));   // false true
        System.out.println(b.stripTrailingZeros().toPlainString());      // 2

        // Formatting money for display
        System.out.println(NumberFormat.getCurrencyInstance(Locale.US).format(new BigDecimal("1234.5")));   // $1,234.50

        // BigInteger
        BigInteger big = new BigInteger("123456789012345678901234567890");
        System.out.println(big.multiply(big));                      // 15241578753238836750495351562536198787501905199875019052100
        System.out.println(BigInteger.TWO.pow(100));                // 1267650600228229401496703205376
        BigInteger factorial = BigInteger.ONE;
        for (int i = 2; i <= 30; i++) factorial = factorial.multiply(BigInteger.valueOf(i));
        System.out.println(factorial);                              // 265252859812191058636308480000000
        System.out.println(BigInteger.valueOf(97).isProbablePrime(20) + " " + BigInteger.valueOf(48).gcd(BigInteger.valueOf(18)));   // true 6
        System.out.println(BigInteger.valueOf(3).modPow(BigInteger.valueOf(200), BigInteger.valueOf(13)));   // 9
    }
}
