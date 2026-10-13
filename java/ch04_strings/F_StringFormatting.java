package ch04_strings;

import java.text.NumberFormat;
import java.util.Locale;

/*
Formatting strings
 %s string   %d integer   %f decimal   %n new line   %b boolean   %x hex
 width and precision: %10s  %-10s  %.2f  %08.3f  %,d
*/
public class F_StringFormatting {

    public static void main(String[] args) {
        System.out.println(String.format("%.2f", Math.PI));     // 3.14
        System.out.println(String.format("%,d", 1234567));      // 1,234,567
        System.out.println(String.format("%05d", 42));          // 00042
        System.out.println(String.format("%x", 255));           // ff

        // Table alignment: - means left-align
        System.out.printf("%-10s|%8s%n", "Item", "Price");
        System.out.printf("%-10s|%8.2f%n", "Tea", 20.0);
        System.out.printf("%-10s|%8.2f%n", "Coffee", 150.5);
        // Item      |   Price
        // Tea       |   20.00
        // Coffee    |  150.50

        // Locale-aware currency
        System.out.println(NumberFormat.getCurrencyInstance(Locale.US).format(1234.5));          // $1,234.50
        System.out.println(NumberFormat.getCurrencyInstance(Locale.of("en", "IN")).format(123456.5)); // ₹123,456.50

        // String.join and StringBuilder for building strings in a loop
        System.out.println(String.join(", ", "a", "b", "c")); // a, b, c
    }
}
