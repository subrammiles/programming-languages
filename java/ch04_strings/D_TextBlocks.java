package ch04_strings;

/*
Text blocks (Java 15)
Multi-line strings with """ ... """
 - no need for \n or + to join lines
 - common indentation is removed automatically
 - quotes inside do not need escaping
Great for JSON, SQL, HTML.
*/
public class D_TextBlocks {

    public static void main(String[] args) {
        String oldJson = "{\n" +
                "  \"name\": \"Subbu\",\n" +
                "  \"lang\": \"Java\"\n" +
                "}";

        String json = """
                {
                  "name": "Subbu",
                  "lang": "Java"
                }""";

        System.out.println(json);
        System.out.println(json.equals(oldJson)); // true

        String sql = """
                SELECT name, city
                FROM users
                WHERE city = '%s'
                ORDER BY name
                """.formatted("Hyderabad");
        System.out.println(sql);

        // \ at the end of a line joins it with the next line
        String oneLine = """
                This is a very long sentence \
                that stays on one line.""";
        System.out.println(oneLine);

        // \s keeps a trailing space that would otherwise be stripped
        String padded = """
                red  \s
                green\s
                """;
        System.out.print(padded.replace(" ", "."));
        // red...
        // green.
    }
}
