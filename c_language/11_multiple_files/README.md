# Multiple files

```
11_multiple_files/
├── geometry.h   <- declarations (the "interface")
├── geometry.c   <- definitions (the "implementation")
├── main.c       <- uses geometry.h
└── Makefile     <- builds and links them
```
```bash
cd 11_multiple_files && make run
```

- **Header (`.h`)**: types, prototypes, `extern` declarations, with an include guard.
- **Source (`.c`)**: the code. Each `.c` is compiled separately into an object file (`.o`).
- **Linking** joins the object files (and libraries like `-lm`) into one program.
- `static` at file level hides a function or variable from other files.

Bigger projects use **CMake**: `cmake -S . -B build && cmake --build build`.
