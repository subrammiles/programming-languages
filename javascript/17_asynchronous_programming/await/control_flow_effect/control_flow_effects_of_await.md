
# Control flow effects of await
make sure to use await only when necessary (to unwrap promises into their values).

When an await is encountered in code (either in an async function or in a module), the awaited expression is executed, while all code that depends on the expression's value is paused and pushed into the microtask queue. The main thread is then freed for the next task in the event loop. This happens even if the awaited value is an already-resolved promise or not a promise