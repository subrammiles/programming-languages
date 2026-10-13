# Java

Examples organised as chapters, in the order they are meant to be read.
Targets **Java 21 (LTS)**. A few files in chapter 24 need **Java 25**; they say so at the top.

## Running the examples

Every folder is a Java package (`ch04_strings` → `package ch04_strings;`), with `java/` as the source root.

- **IntelliJ IDEA:** open the `java/` folder. `java.iml` already marks it as the source root.
  Set the project SDK to 21 or newer. Open `ch23_build_and_testing/pom.xml` separately as a Maven project.
- **Command line:**
  ```bash
  cd java
  javac -d out $(find . -name '*.java' -not -path './ch23_*' -not -path './ch24_*')
  java -cp out ch09_sealed_classes_and_pattern_matching.C_SwitchPatternMatching
  ```
- **One file, no compile step** (works for files that don't use other files' classes):
  `java ch08_records/A_RecordBasics.java`

Files starting `A_`, `B_`, `C_` … are meant to be read in that order.

## Chapters

| #  | Chapter | Topics |
|----|---------|--------|
| 01 | [Getting started](ch01_getting_started) | hello world, `main` method, `printf` |
| 02 | [Variables and data types](ch02_variables_and_data_types) | variables, `var`, primitive vs reference types, type casting, wrapper classes, boxing |
| 03 | [Operators and control flow](ch03_operators_and_control_flow) | operators, `if`, `switch` (classic and expressions), loops, `break` / `continue`, labels |
| 04 | [Strings](ch04_strings) | creation, methods, immutability, `StringBuilder` / `StringBuffer`, text blocks, formatting |
| 05 | [Arrays](ch05_arrays) | creating, multi-dimensional, iterating |
| 06 | [Object-oriented programming](ch06_oop) | classes, inheritance, overloading, constructors, abstraction, interfaces, functional interfaces, inner/nested/anonymous classes, polymorphism, `static` / `final` / `this` / `super`, access modifiers, binding, encapsulation |
| 07 | [Enums](ch07_enums) | constants, fields, methods per constant, `EnumSet` / `EnumMap`, enum switch |
| 08 | [Records](ch08_records) | records, compact constructors, methods, local records |
| 09 | [Sealed classes and pattern matching](ch09_sealed_classes_and_pattern_matching) | `instanceof` patterns, sealed types, `switch` patterns, record patterns, data-oriented design |
| 10 | [Exception handling](ch10_exception_handling) | try/catch, multi-catch, `throw`, try-with-resources, checked vs unchecked, custom exceptions, suppressed exceptions |
| 11 | [Generics](ch11_generics) | generic classes, methods, interfaces, bounded types, wildcards |
| 12 | [Collections](ch12_collections) | List, Set, Map, Queue, Deque, iterators, immutable collections, sequenced collections, `Comparable` / `Comparator` |
| 13 | [Lambdas](ch13_lambdas) | lambda syntax, `java.util.function`, method references, composition, variable capture |
| 14 | [Streams](ch14_streams) | creating streams, intermediate and terminal operations, collectors, primitive and parallel streams |
| 15 | [Optional](ch15_optional) | `Optional` and how to use it well |
| 16 | [Date and time](ch16_date_and_time) | `LocalDate`, `LocalDateTime`, time zones, `Instant`, `Duration`, `Period`, formatting |
| 17 | [I/O and files](ch17_io_and_files) | byte/char streams, `java.nio.file` (`Path`, `Files`), NIO, serialization |
| 18 | [Concurrency](ch18_concurrency) | threads, synchronization, locks, deadlock, executors, atomics, latches, semaphores, `CompletableFuture`, **virtual threads** |
| 19 | [Networking](ch19_networking) | sockets, `HttpClient`, a tiny HTTP server |
| 20 | [Annotations](ch20_annotations) | built-in and custom annotations |
| 21 | [Reflection](ch21_reflection) | inspecting classes at runtime |
| 22 | [Design patterns](ch22_design_patterns) | singleton, builder, factory, strategy, observer |
| 23 | [Build tools and testing](ch23_build_and_testing) | Maven, Gradle, JUnit 5 (a standalone Maven project) |
| 24 | [What's new in Java 9 → 25](ch24_whats_new) | version-by-version feature table, Java 22–25 examples |

The `HttpClient` examples in chapter 19 call a public test API and need an internet connection.
