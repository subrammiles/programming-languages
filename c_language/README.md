# C

Examples organised as chapters, in the order they are meant to be read.
Written for **C17**, with a chapter on **C23** (the newest standard).

## Setup
You need a C compiler and `make`:
- Linux: `sudo apt install build-essential clang` (gcc, make, clang)
- macOS: `xcode-select --install`
- Windows: use WSL, or MSYS2 / Visual Studio

## Building and running
```bash
cd c_language
make run F=00_getting_started/hello_world.c   # build and run one example
make                                         # build everything into build/
make check                                   # build and run every example
```
By hand: `gcc -std=c17 -Wall -Wextra file.c -o program && ./program`

The Makefile compiles with **warnings as errors** and the **Address and UndefinedBehavior
sanitizers**, which stop a program the moment it reads freed memory, overflows a buffer
or hits undefined behaviour: the most common and dangerous C bugs.

## Chapters

| #  | Chapter | Topics |
|----|---------|--------|
| 00 | [Getting started](00_getting_started) | compiling, `main`, `printf`, compiler flags |
| 01 | [Variables and types](01_variables_and_types) | integer and floating types, `sizeof`, `<stdint.h>`, constants, enums, conversions, scope and storage |
| 02 | [Operators](02_operators) | arithmetic, integer division, overflow, comparison, logical, bitwise, precedence |
| 03 | [Control flow](03_control_flow) | `if`, `switch`, `for`, `while`, `do`-`while`, `break`, `continue`, `goto` for clean-up |
| 04 | [Functions](04_functions) | prototypes, pass by value, recursion, variadic functions, `static`, `inline` |
| 05 | [Arrays](05_arrays) | arrays, multi-dimensional arrays, passing arrays to functions |
| 06 | [Pointers](06_pointers) | addresses, dereferencing, pointer arithmetic, pointers to pointers, `const`, function pointers |
| 07 | [Strings](07_strings) | char arrays, `<string.h>`, safe copying, conversions, common bugs |
| 08 | [Dynamic memory](08_dynamic_memory) | `malloc`, `calloc`, `realloc`, `free`, growable arrays, memory bugs |
| 09 | [Structs, unions and enums](09_structs_unions_enums) | structs, pointers to structs, unions, bit fields, `typedef` |
| 10 | [Preprocessor](10_preprocessor) | `#define`, macros, conditional compilation, predefined macros |
| 11 | [Multiple files](11_multiple_files) | headers, include guards, separate compilation, `static`, a Makefile |
| 12 | [File I/O](12_file_io) | text and binary files, `errno`, error handling |
| 13 | [Data structures](13_data_structures) | linked list, stack, queue, hash table, binary search tree |
| 14 | [Standard library](14_standard_library) | `qsort`, `bsearch`, `<math.h>`, `<time.h>`, `<ctype.h>`, random numbers |
| 15 | [Concurrency](15_concurrency) | threads, mutexes, atomics (C11) |
| 16 | [Testing and debugging](16_testing_and_debugging) | `assert`, a tiny test framework, sanitizers, gdb, valgrind |
| 17 | [Modern C](17_modern_c) | C11 `_Generic`, `static_assert`; C23 `nullptr`, `constexpr`, `typeof`, `[[attributes]]` |
