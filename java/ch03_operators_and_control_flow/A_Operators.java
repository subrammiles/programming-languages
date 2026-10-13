package ch03_operators_and_control_flow;

/*
Operators
 Arithmetic : + - * / %
 Assignment : = += -= *= /= %=
 Comparison : == != > < >= <=
 Logical    : && || !
 Increment  : ++ --
 Ternary    : condition ? a : b
 Bitwise    : & | ^ ~ << >> >>>
*/
public class A_Operators {

    public static void main(String[] args) {
        System.out.println("<<<< arithmetic >>>>");
        System.out.println(7 / 2);      // 3   -> int / int drops the decimal
        System.out.println(7 / 2.0);    // 3.5
        System.out.println(7 % 2);      // 1   -> remainder
        System.out.println(-7 % 2);     // -1  -> sign follows the left side

        System.out.println("<<<< increment >>>>");
        int a = 5;
        System.out.println(a++);        // 5 (use, then add)
        System.out.println(++a);        // 7 (add, then use)

        System.out.println("<<<< compound assignment casts automatically >>>>");
        byte b = 10;
        b += 5;          // ok: same as b = (byte)(b + 5)
        // b = b + 5;    // error: b + 5 is an int
        System.out.println(b); // 15

        System.out.println("<<<< == vs equals for objects >>>>");
        String s1 = new String("java");
        String s2 = new String("java");
        System.out.println(s1 == s2);       // false -> different objects
        System.out.println(s1.equals(s2));  // true  -> same content

        System.out.println("<<<< logical short-circuit >>>>");
        String text = null;
        if (text != null && text.length() > 3) { // second part never runs, no NullPointerException
            System.out.println("long text");
        }

        System.out.println("<<<< ternary >>>>");
        int marks = 72;
        String result = marks >= 35 ? "pass" : "fail";
        System.out.println(result); // pass

        System.out.println("<<<< bitwise >>>>");
        System.out.println(5 & 3);   // 1   (0101 & 0011 = 0001)
        System.out.println(5 | 3);   // 7   (0111)
        System.out.println(5 ^ 3);   // 6   (0110)
        System.out.println(1 << 4);  // 16  (multiply by 2^4)
        System.out.println(-16 >> 2);  // -4  (keeps the sign)
        System.out.println(-16 >>> 28); // 15 (fills with zeros)

        System.out.println("<<<< integer overflow >>>>");
        int max = Integer.MAX_VALUE;
        System.out.println(max + 1);  // -2147483648, wraps around silently
        try {
            Math.addExact(max, 1);
        } catch (ArithmeticException e) {
            System.out.println(e.getMessage()); // integer overflow
        }
    }
}
