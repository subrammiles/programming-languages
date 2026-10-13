package ch17_io_and_files.b_nio_files;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Comparator;
import java.util.stream.Stream;

/*
Listing and searching folders
 Files.list(dir)        -> direct children only
 Files.walk(dir)        -> everything, recursively
 Files.find(dir, depth, filter)
All return streams that hold the folder open: always use try-with-resources.
*/
public class B_WalkingDirectories {

    public static void main(String[] args) throws IOException {
        Path root = Files.createTempDirectory("walk-demo");
        Files.createDirectories(root.resolve("src/main"));
        Files.writeString(root.resolve("README.md"), "# demo");
        Files.writeString(root.resolve("src/App.java"), "class App {}");
        Files.writeString(root.resolve("src/main/Util.java"), "class Util {}");

        System.out.println("<<<< list >>>>");
        try (Stream<Path> s = Files.list(root)) {
            s.map(p -> root.relativize(p).toString()).sorted().forEach(System.out::println);
        }
        // README.md, src

        System.out.println("<<<< walk: all .java files >>>>");
        try (Stream<Path> s = Files.walk(root)) {
            s.filter(p -> p.toString().endsWith(".java"))
                    .map(p -> root.relativize(p).toString())
                    .sorted()
                    .forEach(System.out::println);
        }
        // src/App.java, src/main/Util.java

        System.out.println("<<<< total size >>>>");
        try (Stream<Path> s = Files.walk(root)) {
            long bytes = s.filter(Files::isRegularFile).mapToLong(p -> p.toFile().length()).sum();
            System.out.println(bytes + " bytes");
        }

        // Delete a folder tree: deepest paths first
        try (Stream<Path> s = Files.walk(root)) {
            s.sorted(Comparator.reverseOrder()).forEach(p -> p.toFile().delete());
        }
        System.out.println("deleted: " + !Files.exists(root));
    }
}
