package ch03_operators_and_control_flow;

/*
if / else if / else
*/
public class B_IfElse {

    static String grade(int marks) {
        if (marks >= 90) {
            return "A";
        } else if (marks >= 75) {
            return "B";
        } else if (marks >= 35) {
            return "C";
        } else {
            return "Fail";
        }
    }

    public static void main(String[] args) {
        System.out.println(grade(95)); // A
        System.out.println(grade(80)); // B
        System.out.println(grade(40)); // C
        System.out.println(grade(10)); // Fail

        // Braces are optional for one statement, but always using them avoids bugs
        int x = 5;
        if (x > 3)
            System.out.println("x is big");
        System.out.println("this line always runs, it is NOT part of the if");
    }
}
