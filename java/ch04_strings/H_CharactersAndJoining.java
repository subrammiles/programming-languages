package ch04_strings;

import java.util.List;
import java.util.StringJoiner;
import java.util.stream.Collectors;

/*
Working with characters, and joining / splitting strings
  Character.isLetter / isDigit / isWhitespace / isUpperCase / toUpperCase / getNumericValue
  char is a 16-bit number: 'a' + 1 == 98, (char) ('a' + 1) == 'b'
  String.chars() gives an IntStream of the characters
  String.join, StringJoiner, Collectors.joining build delimited strings
*/
public class H_CharactersAndJoining {

    public static void main(String[] args) {
        String text = "Java 21 rocks!";

        int letters = 0, digits = 0, spaces = 0, others = 0;
        for (char ch : text.toCharArray()) {
            if (Character.isLetter(ch)) letters++;
            else if (Character.isDigit(ch)) digits++;
            else if (Character.isWhitespace(ch)) spaces++;
            else others++;
        }
        System.out.println(letters + " " + digits + " " + spaces + " " + others);   // 9 2 2 1

        // char arithmetic
        char c = 'a';
        System.out.println(c + 1);                     // 98
        System.out.println((char) (c + 1));            // b
        System.out.println('7' - '0');                 // 7    (digit char -> int)
        System.out.println(Character.getNumericValue('7'));   // 7
        System.out.println((int) 'A' + " " + (char) 65);      // 65 A

        // toggle case
        StringBuilder toggled = new StringBuilder();
        for (char ch : "HeLLo".toCharArray()) {
            toggled.append(Character.isUpperCase(ch) ? Character.toLowerCase(ch) : Character.toUpperCase(ch));
        }
        System.out.println(toggled);                   // hEllO

        // chars() stream
        long vowels = text.toLowerCase().chars().filter(ch -> "aeiou".indexOf(ch) >= 0).count();
        System.out.println(vowels);                    // 3

        // joining
        List<String> langs = List.of("Java", "Kotlin", "Scala");
        System.out.println(String.join(" | ", langs));                // Java | Kotlin | Scala

        StringJoiner joiner = new StringJoiner(", ", "[", "]");
        langs.forEach(joiner::add);
        System.out.println(joiner);                                   // [Java, Kotlin, Scala]

        System.out.println(langs.stream().map(String::toUpperCase).collect(Collectors.joining("-", "<", ">")));
        // <JAVA-KOTLIN-SCALA>

        // splitting
        String csv = "a,b,,c,,";
        System.out.println(csv.split(",").length);                    // 4   (trailing empty strings are dropped)
        System.out.println(csv.split(",", -1).length);                // 6   (limit -1 keeps them)
        System.out.println(String.join("/", "one  two   three".split("\\s+")));   // one/two/three
    }
}
