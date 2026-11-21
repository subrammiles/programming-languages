package ch04_strings;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/*
Regular expressions: java.util.regex.Pattern and Matcher
  Pattern.compile(regex)    -> compile once (it is expensive), reuse many times
  matcher.matches()         -> does the WHOLE string match?
  matcher.find()            -> find the NEXT match anywhere in the string
  matcher.group(n / name)   -> captured text
Shortcuts on String: matches(), replaceAll(), split() - they compile the regex on every call.
In Java strings, a regex backslash must be doubled: \d is written "\\d".

Common pieces:  .  any char   \d digit   \w word char   \s whitespace   [abc] one of
                ^ start   $ end   * 0+   + 1+   ? 0 or 1   {2,4} 2 to 4   (...) group
*/
public class I_RegularExpressions {

    private static final Pattern EMAIL = Pattern.compile("^[\\w.+-]+@[\\w-]+\\.[\\w.]+$");
    private static final Pattern DATE = Pattern.compile("(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})");

    public static void main(String[] args) {
        // matches(): the whole string must match
        for (String email : List.of("ann@example.com", "bad@", "bo.smith+tag@mail.co.uk")) {
            System.out.println(email + " -> " + EMAIL.matcher(email).matches());
        }
        // ann@example.com -> true
        // bad@ -> false
        // bo.smith+tag@mail.co.uk -> true

        System.out.println("12345".matches("\\d+") + " " + "123a".matches("\\d+"));   // true false

        // find(): every match in a longer text
        Matcher numbers = Pattern.compile("\\d+").matcher("Order 66 shipped 3 items for 120 dollars");
        StringBuilder found = new StringBuilder();
        while (numbers.find()) found.append(numbers.group()).append(' ');
        System.out.println(found.toString().trim());              // 66 3 120

        // results(): the same with streams (Java 9+)
        System.out.println(Pattern.compile("#\\w+").matcher("I love #java and #regex").results()
                .map(r -> r.group()).toList());                   // [#java, #regex]

        // groups, numbered and named
        Matcher date = DATE.matcher("Released on 2025-09-16.");
        if (date.find()) {
            System.out.println(date.group() + " year=" + date.group("year") + " month=" + date.group(2));
            // 2025-09-16 year=2025 month=09
        }

        // replaceAll with group references: reformat dates
        System.out.println("2025-09-16".replaceAll("(\\d{4})-(\\d{2})-(\\d{2})", "$3/$2/$1"));   // 16/09/2025

        // flags: case-insensitive
        Pattern java = Pattern.compile("java", Pattern.CASE_INSENSITIVE);
        System.out.println(java.matcher("I code in JAVA").find());   // true

        // cleaning input
        System.out.println("  too    many   spaces ".trim().replaceAll("\\s+", " "));   // too many spaces
        System.out.println("Phone: +1 (555) 010-9999".replaceAll("\\D", ""));            // 15550109999

        // quoting user input so special characters are literal
        String userInput = "1+1";
        System.out.println("1+1=2".matches(".*" + Pattern.quote(userInput) + ".*"));    // true

        // password rule with lookaheads: 8+ chars, a digit, an uppercase letter
        Pattern strong = Pattern.compile("^(?=.*\\d)(?=.*[A-Z]).{8,}$");
        System.out.println(strong.matcher("Secret123").matches() + " " + strong.matcher("secret").matches());   // true false
    }
}
