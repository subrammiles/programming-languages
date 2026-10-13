package ch10_exception_handling;

import java.io.FileReader;
import java.io.IOException;

/*
Checked vs unchecked exceptions

            Throwable
           /         \
       Error        Exception
   (don't catch)    /        \
              IOException   RuntimeException
              SQLException   NullPointerException, IllegalArgumentException,
              (CHECKED)      ArithmeticException ... (UNCHECKED)

Checked   -> the compiler forces you to catch it or declare "throws".
Unchecked -> usually a bug; the compiler does not force handling.
*/
public class E_CheckedVsUnchecked {

    // Must declare: IOException is checked
    static void readFile(String path) throws IOException {
        try (FileReader reader = new FileReader(path)) {
            System.out.println((char) reader.read());
        }
    }

    // No declaration needed: IllegalArgumentException is unchecked
    static int divide(int a, int b) {
        if (b == 0) throw new IllegalArgumentException("b must not be 0");
        return a / b;
    }

    public static void main(String[] args) {
        try {
            readFile("does-not-exist.txt");
        } catch (IOException e) {
            System.out.println("checked: " + e.getClass().getSimpleName()); // FileNotFoundException
        }

        try {
            divide(1, 0);
        } catch (IllegalArgumentException e) {
            System.out.println("unchecked: " + e.getMessage());
        }

        // Common unchecked exceptions
        try {
            String s = null;
            s.length();
        } catch (NullPointerException e) {
            // Helpful NullPointerException messages (Java 14) say exactly what was null
            System.out.println(e.getMessage()); // Cannot invoke "String.length()" because "<local1>" is null
        }
    }
}
