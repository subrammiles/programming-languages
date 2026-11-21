package ch04_strings;

/*
The String pool, and == vs equals()
 - String LITERALS ("hello") are stored once in the String pool and shared.
 - new String("hello") always creates a NEW object on the heap.
 - Compile-time constant expressions ("hel" + "lo") are joined by the compiler -> pooled.
 - Strings built at runtime (concat, +, StringBuilder) are new objects, not pooled.
 - intern() returns the pooled copy.
RULE: always compare string contents with equals() (or equalsIgnoreCase), never with ==.
*/
public class G_StringPoolAndEquality {

    public static void main(String[] args) {
        String a = "hello";
        String b = "hello";
        String c = new String("hello");
        String d = "hel" + "lo";                       // constant expression: folded at compile time
        String part = "hel";
        String e = part + "lo";                        // built at runtime
        final String finalPart = "hel";
        String f = finalPart + "lo";                   // final constant: folded again

        System.out.println(a == b);                    // true   (same pooled object)
        System.out.println(a == c);                    // false  (c is a new object)
        System.out.println(a.equals(c));               // true   (same characters)
        System.out.println(a == d);                    // true
        System.out.println(a == e);                    // false
        System.out.println(a == f);                    // true
        System.out.println(a == c.intern());           // true   (intern returns the pooled copy)

        // Comparing safely
        String input = null;
        System.out.println("yes".equals(input));       // false  (literal first: no NullPointerException)
        System.out.println(java.util.Objects.equals(input, null));   // true
        System.out.println("Java".equalsIgnoreCase("JAVA"));          // true

        // compareTo: ordering (negative, zero, positive), used by sorting
        System.out.println("apple".compareTo("banana") < 0);          // true
        System.out.println("b".compareTo("a") + " " + "a".compareTo("a"));   // 1 0
        System.out.println("Zebra".compareTo("apple") < 0);           // true   (uppercase letters sort before lowercase)
        System.out.println("Zebra".compareToIgnoreCase("apple") > 0); // true

        // String concatenation surprises
        System.out.println(1 + 2 + "3");               // 33
        System.out.println("1" + 2 + 3);               // 123
        System.out.println('a' + 'b' + "c");           // 195c   (char + char is int addition: 97 + 98)
        System.out.println("" + 'a' + 'b');            // ab

        // Concatenating in a loop creates many objects; use StringBuilder
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 5; i++) sb.append(i).append(',');
        sb.setLength(sb.length() - 1);                 // drop the last comma
        System.out.println(sb);                        // 0,1,2,3,4
    }
}
