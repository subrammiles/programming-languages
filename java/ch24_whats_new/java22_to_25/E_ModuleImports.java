package ch24_whats_new.java22_to_25;

import module java.base;

/*
Module import declarations (Java 25)
  import module java.base;
imports every public type from every package that the module exports
(java.util, java.io, java.nio.file, java.time, java.util.stream, ...).
Handy for scripts, demos and learning. In big projects, explicit imports are still clearer.
Requires JDK 25+.
*/
public class E_ModuleImports {

    public static void main(String[] args) {
        List<String> names = new ArrayList<>(List.of("Ravi", "Asha"));  // java.util
        Collections.sort(names);
        LocalDate today = LocalDate.of(2026, 10, 13);                   // java.time
        Path path = Path.of("notes.txt");                               // java.nio.file
        String joined = names.stream().collect(Collectors.joining(", ")); // java.util.stream

        System.out.println(joined + " | " + today.getDayOfWeek() + " | " + path.getFileName());
        // Asha, Ravi | TUESDAY | notes.txt
    }
}
