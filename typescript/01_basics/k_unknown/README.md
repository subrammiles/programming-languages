# unknown vs any

1. `unknown` is the **safe** alternative to `any`.
2. Any value can be stored in an `unknown` variable, but you can't use it until you check its type (narrowing).
3. `any` switches type checking off completely; `unknown` keeps it on.

Rule of thumb: use `unknown` for data from outside (JSON, user input, `catch` errors), never `any`.
