# Dynamic memory

| Function | Does |
|---|---|
| `malloc(bytes)` | allocate, contents undefined |
| `calloc(n, size)` | allocate and zero |
| `realloc(p, bytes)` | grow or shrink, may move the block |
| `free(p)` | release (`free(NULL)` is a no-op) |

Rules: check for `NULL`, free exactly once, never use memory after freeing it,
and decide clearly **who owns** (and so must free) each block.

Find bugs with the sanitizers (on by default in this project's Makefile) or valgrind:
```bash
make run F=08_dynamic_memory/c_memory_bugs.c        # AddressSanitizer + LeakSanitizer
gcc -g 08_dynamic_memory/b_dynamic_array.c -o arr && valgrind --leak-check=full ./arr
```
