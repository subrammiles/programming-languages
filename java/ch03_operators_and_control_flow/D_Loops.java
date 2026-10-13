package ch03_operators_and_control_flow;

import java.util.List;

/*
Loops: for, enhanced for (for-each), while, do-while
Jumps: break, continue, labels
*/
public class D_Loops {

    public static void main(String[] args) {
        System.out.println("<<<< for >>>>");
        for (int i = 1; i <= 3; i++) {
            System.out.print(i + " "); // 1 2 3
        }
        System.out.println();

        System.out.println("<<<< for-each >>>>");
        List<String> names = List.of("Asha", "Ravi");
        for (String name : names) {
            System.out.println(name);
        }

        System.out.println("<<<< while: condition checked first >>>>");
        int n = 1234, digits = 0;
        while (n > 0) {
            n /= 10;
            digits++;
        }
        System.out.println(digits); // 4

        System.out.println("<<<< do-while: runs at least once >>>>");
        int count = 10;
        do {
            System.out.println("runs once even though count >= 5");
        } while (count < 5);

        System.out.println("<<<< break and continue >>>>");
        for (int i = 1; i <= 10; i++) {
            if (i % 2 == 0) continue; // skip even numbers
            if (i > 7) break;         // stop the loop
            System.out.print(i + " "); // 1 3 5 7
        }
        System.out.println();

        System.out.println("<<<< labelled break: exit nested loops >>>>");
        outer:
        for (int i = 1; i <= 3; i++) {
            for (int j = 1; j <= 3; j++) {
                if (i * j == 4) {
                    System.out.println("found 4 at i=" + i + ", j=" + j);
                    break outer;
                }
            }
        }
    }
}
