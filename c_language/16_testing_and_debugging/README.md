# Testing and debugging

| Tool | What it finds | How |
|---|---|---|
| compiler warnings | many bugs before running | `-Wall -Wextra -Wpedantic -Werror` (used by this project) |
| AddressSanitizer | buffer overflows, use-after-free, leaks | `-fsanitize=address` (used by this project) |
| UndefinedBehaviorSanitizer | signed overflow, bad shifts, null derefs | `-fsanitize=undefined` (used by this project) |
| ThreadSanitizer | data races | `-fsanitize=thread` (not together with address) |
| valgrind | memory errors and leaks, no recompiling | `valgrind --leak-check=full ./program` |
| gdb / lldb | step through code, inspect variables | build with `-g`, then `gdb ./program` |
| static analysers | bugs found by reading the code | `clang --analyze file.c`, `cppcheck .`, `clang-tidy` |

ThreadSanitizer on recent Linux kernels may stop with "unexpected memory mapping".
Run the program with address randomisation disabled: `setarch $(uname -m) -R ./program`

## A gdb session in 30 seconds
```
gdb ./build/13_data_structures/a_linked_list
(gdb) break reverse        # stop when reverse() is called
(gdb) run
(gdb) next                 # run one line
(gdb) print *cur           # show a variable
(gdb) backtrace            # how did we get here?
(gdb) continue
```
