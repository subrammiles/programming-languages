package ch25_interview_questions.g_predict_the_output;

import java.util.ArrayList;
import java.util.List;

/*
Predict the output: Strings, wrapper classes and autoboxing.
Cover the comments, guess, then run.

Key facts:
  - Integer.valueOf (used by autoboxing) caches -128..127, so == works there by luck
  - == on wrapper objects compares references; unboxing a null throws NullPointerException
  - mixing types in a ternary or arithmetic promotes them (char + int -> int)
*/
public class A_StringsAndWrappers {

    public static void main(String[] args) {
        // Q1: the Integer cache
        Integer a = 127, b = 127;
        Integer c = 128, d = 128;
        System.out.println(a == b);              // true    (same cached object)
        System.out.println(c == d);              // false   (two different objects)
        System.out.println(c.equals(d));         // true
        System.out.println(c == 128);            // true    (comparing with an int unboxes c)

        // Q2: Long and Integer are never equal()
        Long big = 10L;
        Integer small = 10;
        System.out.println(big.equals(10));      // false   (10 is boxed to Integer)
        System.out.println(big == 10);           // true    (numeric comparison after unboxing)
        System.out.println(small.equals(10));    // true

        // Q3: unboxing null
        Integer missing = null;
        try {
            int value = missing;                 // calls missing.intValue()
        } catch (NullPointerException e) {
            System.out.println("NPE on unboxing");   // NPE on unboxing
        }

        // Q4: List.remove(int) vs remove(Object)
        List<Integer> list = new ArrayList<>(List.of(10, 20, 1, 2));
        list.remove(1);                          // removes index 1 (the value 20)
        System.out.println(list);                // [10, 1, 2]

        // Q5: char arithmetic
        char ch = 'A';
        ch += 1;                                 // compound assignment casts back to char
        System.out.println(ch);                  // B
        System.out.println('A' + 1);             // 66
        System.out.println((char) ('A' + 1));    // B
        System.out.println("" + 'A' + 1);        // A1

        // Q6: ternary numeric promotion
        Object o = true ? 1 : "one";
        System.out.println(o.getClass().getSimpleName());   // Integer
        Object p = true ? Integer.valueOf(1) : Double.valueOf(2);
        System.out.println(p);                   // 1.0   (both sides are numeric: promoted to double!)

        // Q7: string immutability and methods
        String s = "java";
        s.toUpperCase();
        s.concat(" rocks");
        System.out.println(s);                   // java
        System.out.println(s.replace('a', 'o')); // jovo

        // Q8: integer division and casting
        System.out.println(5 / 2 * 2.0);         // 4.0   (5 / 2 is 2 first)
        System.out.println((double) (5 / 2));    // 2.0
        System.out.println((double) 5 / 2);      // 2.5

        // Q9: short-circuit operators
        int x = 0;
        if (false && (++x > 0)) { }
        if (true || (++x > 0)) { }
        System.out.println(x);                   // 0   (the right side never ran)
        if (false & (++x > 0)) { }               // & always evaluates both sides
        System.out.println(x);                   // 1

        // Q10: post / pre increment
        int i = 5;
        i = i++ + ++i;                           // 5 + 7
        System.out.println(i);                   // 12
        int j = 1;
        j = j++;                                 // j++ returns the OLD value, which is assigned back
        System.out.println(j);                   // 1
    }
}
