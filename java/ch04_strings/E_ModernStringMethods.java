package ch04_strings;

import java.util.stream.Collectors;

/*
String methods added in Java 11+
 isBlank()   strip() / stripLeading() / stripTrailing()
 repeat(n)   lines()   formatted(...)   indent(n)
 chars()     transform(fn)
*/
public class E_ModernStringMethods {

    public static void main(String[] args) {
        System.out.println("   ".isEmpty());   // false
        System.out.println("   ".isBlank());   // true  (Java 11)

        // strip() understands Unicode whitespace, trim() only removes chars <= ' '
        String s = "  hello  ";
        System.out.println("[" + s.trim() + "]");  // [ hello ] (em-space not removed)
        System.out.println("[" + s.strip() + "]"); // [hello]

        System.out.println("ab".repeat(3)); // ababab

        String poem = "line one\nline two\nline three";
        System.out.println(poem.lines().count()); // 3
        System.out.println(poem.lines().map(String::toUpperCase).collect(Collectors.joining(" | ")));
        // LINE ONE | LINE TWO | LINE THREE

        System.out.println("%s is %d years old".formatted("Asha", 30)); // Asha is 30 years old

        System.out.print("a\nb\n".indent(4)); // each line indented by 4 spaces

        long vowels = "programming".chars().filter(c -> "aeiou".indexOf(c) >= 0).count();
        System.out.println(vowels); // 3

        String slug = " Hello World ".transform(String::strip).transform(t -> t.toLowerCase().replace(' ', '-'));
        System.out.println(slug); // hello-world
    }
}
