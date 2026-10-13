package ch17_io_and_files.b_nio_files;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.List;

/*
java.nio.file (Java 7+) - the modern way to work with files
 Path   -> a file or folder location
 Files  -> static helper methods: readString, writeString, readAllLines, lines, exists, copy, move, delete ...
Simpler than FileInputStream/FileReader for most tasks.
*/
public class A_PathAndFiles {

    public static void main(String[] args) throws IOException {
        Path dir = Files.createTempDirectory("nio-demo");
        Path file = dir.resolve("notes.txt");       // dir/notes.txt

        System.out.println(file.getFileName());      // notes.txt
        System.out.println(file.getParent().equals(dir)); // true

        // Write and read whole text (Java 11)
        Files.writeString(file, "line 1\nline 2\n");
        Files.writeString(file, "line 3\n", StandardOpenOption.APPEND);
        System.out.print(Files.readString(file));

        // Lines
        List<String> lines = Files.readAllLines(file, StandardCharsets.UTF_8);
        System.out.println(lines.size()); // 3

        // For BIG files, stream the lines instead of loading them all (close it with try-with-resources)
        try (var stream = Files.lines(file)) {
            System.out.println(stream.filter(l -> l.endsWith("2")).findFirst().orElse("none")); // line 2
        }

        // Info
        System.out.println(Files.exists(file) + " " + Files.size(file) + " bytes"); // true 21 bytes
        System.out.println(Files.isDirectory(dir)); // true

        // Copy, move, delete
        Path copy = Files.copy(file, dir.resolve("copy.txt"));
        Path moved = Files.move(copy, dir.resolve("moved.txt"));
        System.out.println(Files.exists(copy) + " " + Files.exists(moved)); // false true

        Files.delete(moved);
        Files.delete(file);
        Files.delete(dir);
        System.out.println("cleaned up: " + !Files.exists(dir));
    }
}
