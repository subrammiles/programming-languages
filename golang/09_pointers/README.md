# Pointers

Pointers let you work directly with memory addresses: you can read and change a value
through its address instead of copying it.

| Syntax | Meaning |
|---|---|
| `*int` | the type "pointer to an int" |
| `&x` | the address of `x` |
| `*p` | the value at address `p` |
| `new(T)` / `new(value)` | allocate and get a pointer (`new(value)` is Go 1.26) |

Run: `go run ./09_pointers`
