package ch01_getting_started;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Scanner;

/*
Reading user input from the keyboard (System.in)
  Scanner         -> easy: nextInt(), nextDouble(), nextLine(), hasNextInt() ...
  BufferedReader  -> faster for large input (competitive programming); reads lines as Strings
  System.console()-> readPassword() hides what the user types (null when not in a real terminal)
  IO.readln(...)  -> Java 25: the simplest way, see ch24_whats_new/compact_source_file

Run it and type answers, or pipe input in:
  printf 'Ann\n30\n4.5\n1 2 3\n' | java ch01_getting_started/D_UserInput.java

The classic Scanner bug: nextInt() leaves the newline in the buffer, so a following
nextLine() returns "" at once. Fix: call nextLine() once to consume it, or read every
line with nextLine() and parse it (Integer.parseInt), as done below.
*/
public class D_UserInput {

    public static void main(String[] args) throws IOException {
        Scanner scanner = new Scanner(System.in);   // do not close it: closing also closes System.in

        System.out.print("Your name: ");
        String name = scanner.nextLine();

        System.out.print("Your age: ");
        int age = Integer.parseInt(scanner.nextLine().trim());

        System.out.print("Rating (decimal): ");
        while (!scanner.hasNextDouble()) {          // validate: skip anything that is not a number
            System.out.print("not a number, try again: ");
            scanner.next();
        }
        double rating = scanner.nextDouble();
        scanner.nextLine();                         // consume the rest of the line (the newline)

        System.out.print("Some numbers separated by spaces: ");
        int sum = 0;
        for (String token : scanner.nextLine().trim().split("\\s+")) {
            sum += Integer.parseInt(token);
        }

        System.out.printf("%nHello %s! Next year you will be %d. Rating %.1f. Sum = %d%n", name, age + 1, rating, sum);
        // Hello Ann! Next year you will be 31. Rating 4.5. Sum = 6

        // The BufferedReader version (shown here, not run, because Scanner already read System.in):
        if (false) {
            BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
            String line = reader.readLine();        // null at end of input
            System.out.println(line);
        }
    }
}
