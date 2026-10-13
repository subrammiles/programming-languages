// Compact source files and instance main methods (Java 25)
//
// No class declaration, no "public static", no String[] args needed.
// IO.println / IO.readln are new simple console methods in java.lang.
// All of java.base is imported automatically (List, Map, LocalDate ...).
// Made for beginners and small scripts; it grows into a normal class when needed.
//
// Requires JDK 25+. Run directly, no javac step:
//     java HelloCompact.java

String greeting = "Hello";

void main() {
    IO.println(greeting + ", compact Java!");

    var langs = List.of("Java", "Kotlin", "Scala");
    for (var lang : langs) {
        IO.println(" - " + lang + " runs on the JVM");
    }
    IO.println("Today is " + LocalDate.now().getDayOfWeek());
}
