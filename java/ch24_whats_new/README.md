# What's new in Java (9 → 25)

Java ships a new version every 6 months. **LTS** (long-term support) versions are the ones
most companies use: **11, 17, 21, 25**.
This repo targets **Java 21**; files in `java22_to_25/` and `compact_source_file/` need **JDK 25**.

| Version | Feature | Where to learn it |
|---|---|---|
| 9  | `List.of`, `Set.of`, `Map.of` | ch12_collections/modern |
| 9  | JShell (interactive Java: run `jshell`) | try it in a terminal |
| 9  | `Optional.ifPresentOrElse`, `or`, `stream`; `Stream.takeWhile` / `dropWhile` | ch15, ch14 |
| 9  | Modules (`module-info.java`) | mostly used by libraries |
| 10 | `var` | ch02 / a_variables/D_Var |
| 11 **LTS** | `HttpClient` | ch19_networking/http |
| 11 | `String.isBlank`, `strip`, `lines`, `repeat`; `Files.readString` | ch04, ch17 |
| 11 | Run a file directly: `java Hello.java` | any file |
| 14 | Switch expressions, helpful NullPointerException messages | ch03, ch10 |
| 15 | Text blocks `"""` | ch04_strings/D_TextBlocks |
| 16 | Records, `instanceof` patterns, `Stream.toList()` | ch08, ch09, ch14 |
| 17 **LTS** | Sealed classes | ch09 |
| 18 | UTF-8 by default, `jwebserver` | – |
| 19 | `ExecutorService` is `AutoCloseable` | ch18 |
| 21 **LTS** | Virtual threads | ch18/n_virtual_threads |
| 21 | Pattern matching for `switch`, record patterns | ch09 |
| 21 | Sequenced collections (`getFirst`, `getLast`, `reversed`) | ch12_collections/modern |
| 22 | Unnamed variables `_` | java22_to_25/A_UnnamedVariables |
| 22 | Launch multi-file programs with `java Main.java` | – |
| 23 | Markdown doc comments `///` | java22_to_25/F_MarkdownDocComments |
| 24 | Stream gatherers | java22_to_25/B_StreamGatherers |
| 25 **LTS** | Compact source files, instance `main`, `IO.println` | compact_source_file/HelloCompact |
| 25 | Flexible constructor bodies (code before `super()`) | java22_to_25/C_FlexibleConstructorBodies |
| 25 | Scoped values (modern `ThreadLocal`) | java22_to_25/D_ScopedValues |
| 25 | Module import declarations (`import module java.base;`) | java22_to_25/E_ModuleImports |

### Still in preview (Java 25)
Preview features can change; enable them with `--enable-preview`.
- **Structured concurrency** – treat a group of concurrent tasks as one unit.
- **Primitive types in patterns** – `case int i when i > 0 ->`.
