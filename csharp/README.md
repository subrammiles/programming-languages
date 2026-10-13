# C#

Examples organised as chapters, in the order they are meant to be read.
Written for **C# 14** on **.NET 10** (the current long-term-support release).

## Setup
Install the [.NET 10 SDK](https://dotnet.microsoft.com/download), then check `dotnet --version`.
Editors: VS Code + **C# Dev Kit**, Visual Studio, or JetBrains Rider.

## Running the examples
Each example is a single file that .NET 10 runs directly (no project file needed):
```bash
cd csharp
dotnet run 05_classes_and_objects/c_records_and_structs.cs
```
The first run of a file takes a few seconds while it is compiled and cached.
Chapter 15 is a full solution: `cd 15_testing && dotnet test`.

## Chapters

| #  | Chapter | Topics |
|----|---------|--------|
| 00 | [Getting started](00_getting_started) | `dotnet run file.cs`, top-level statements, projects |
| 01 | [Variables and types](01_variables_and_types) | `var`, value vs reference types, `decimal`, conversions, strings, raw strings, nullable types |
| 02 | [Operators and control flow](02_operators_and_control_flow) | operators, `is`/`as`, `if`, `switch` statements and expressions, loops |
| 03 | [Methods](03_methods) | overloading, optional/named/`params` arguments, local functions, `ref`/`out`, tuples |
| 04 | [Collections](04_collections) | arrays, `List`, `Dictionary`, `HashSet`, `Queue`, `Stack`, `PriorityQueue` |
| 05 | [Classes and objects](05_classes_and_objects) | classes, properties, `init`/`required`/`field`, primary constructors, records, structs, statics, extension members |
| 06 | [Inheritance and interfaces](06_inheritance_and_interfaces) | `abstract`/`virtual`/`override`/`sealed`, interfaces, default interface methods, `IComparable` |
| 07 | [Exceptions](07_exceptions) | `try`/`catch`/`finally`, filters, custom exceptions, `using` and `IDisposable` |
| 08 | [Generics](08_generics) | generic methods and classes, constraints, generic math |
| 09 | [Delegates, lambdas and events](09_delegates_lambdas_events) | `Func`/`Action`, lambdas, closures, events |
| 10 | [LINQ](10_linq) | filtering, projection, sorting, grouping, joins, laziness, newer operators |
| 11 | [Pattern matching](11_pattern_matching) | type, relational, property, positional and list patterns |
| 12 | [Async](12_async) | `async`/`await`, `WhenAll`/`WhenAny`, cancellation, async streams, `Parallel`, channels |
| 13 | [Files and JSON](13_files_and_json) | `File`/`Path`/streams, `System.Text.Json` with source generation, `HttpClient` |
| 14 | [Modern C#](14_modern_csharp) | one feature from each version, C# 9 → 14 |
| 15 | [Testing](15_testing) | a solution with a class library and xUnit v3 tests |
| 16 | [What's new](16_whats_new) | C# 8 → 14 and the .NET release cycle |
