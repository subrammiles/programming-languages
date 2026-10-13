package ch24_whats_new.java22_to_25;

/// Markdown documentation comments (Java 23)
///
/// Comments starting with `///` are written in **Markdown** instead of HTML.
/// The `javadoc` tool turns them into documentation pages.
///
/// Before:
/// ```
/// /**
///  * Returns the <b>sum</b> of {@code a} and {@code b}.
///  * <ul><li>first</li><li>second</li></ul>
///  */
/// ```
///
/// Requires JDK 23+ for javadoc to render it (to the compiler these are normal comments).
public class F_MarkdownDocComments {

    /// Adds two numbers.
    ///
    /// - works with negatives
    /// - may overflow, see [Math#addExact(int, int)]
    ///
    /// @param a the first number
    /// @param b the second number
    /// @return the **sum** of `a` and `b`
    static int add(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        System.out.println(add(2, 3)); // 5
        // Generate the docs: javadoc -d docs F_MarkdownDocComments.java
    }
}
