# Interview questions

The programs JavaScript interviews ask you to **write** or **predict**.
The earlier chapters explain the concepts; this chapter puts them to work.

Run any file with `node <file>.js` (Node 22+). Every line that prints is followed by
a `//` comment showing the expected output, so you can cover the comments and test yourself.

## a. Polyfills: re-implement a built-in

| File | Question |
|---|---|
| [1_map_filter_reduce.js](a_polyfills/1_map_filter_reduce.js) | Write `Array.prototype.map`, `filter`, `reduce`, `forEach` |
| [2_call_apply_bind.js](a_polyfills/2_call_apply_bind.js) | Write `Function.prototype.call`, `apply`, `bind` |
| [3_promise_all_family.js](a_polyfills/3_promise_all_family.js) | Write `Promise.all`, `allSettled`, `race`, `any` |
| [4_custom_promise.js](a_polyfills/4_custom_promise.js) | Build a `Promise` class from scratch (states, chaining, microtasks) |

## b. Implementations: write a utility from scratch

| File | Question |
|---|---|
| [1_deep_clone.js](b_implementations/1_deep_clone.js) | Deep clone with Date, Map, Set and circular references |
| [2_deep_equal.js](b_implementations/2_deep_equal.js) | Compare two objects by value |
| [3_flatten_array_and_object.js](b_implementations/3_flatten_array_and_object.js) | Flatten nested arrays; flatten / unflatten objects |
| [4_event_emitter.js](b_implementations/4_event_emitter.js) | Pub/sub with `on`, `once`, `off`, `emit` |
| [5_lru_cache.js](b_implementations/5_lru_cache.js) | LRU cache with O(1) `get` / `put` |
| [6_async_utilities.js](b_implementations/6_async_utilities.js) | `sleep`, `promisify`, timeout, retry with backoff, run in sequence |
| [7_promise_pool.js](b_implementations/7_promise_pool.js) | Run async tasks with a concurrency limit |

Also asked, and already covered in [27_patterns](../27_patterns): debounce, throttle, memoize, curry, compose/pipe, once.

## c. Predict the output

| File | Topic |
|---|---|
| [1_hoisting_and_tdz.js](c_predict_the_output/1_hoisting_and_tdz.js) | `var` / `let` / function hoisting, the Temporal Dead Zone |
| [2_closures_in_loops.js](c_predict_the_output/2_closures_in_loops.js) | `var` vs `let` with `setTimeout` in a loop, and the fixes |
| [3_this_puzzles.js](c_predict_the_output/3_this_puzzles.js) | `this` in methods, callbacks, arrows, `bind`, classes |
| [4_event_loop_order.js](c_predict_the_output/4_event_loop_order.js) | Sync vs microtasks vs macrotasks, `async`/`await` ordering |
| [5_type_coercion.js](c_predict_the_output/5_type_coercion.js) | `+` vs `-`, `==` vs `===`, `NaN`, `typeof null`, `0.1 + 0.2`, default sort |

## d. Coding problems

| File | Problems |
|---|---|
| [1_string_problems.js](d_coding_problems/1_string_problems.js) | reverse, palindrome, anagram, frequency, first unique char, compression, longest substring without repeats, valid parentheses, group anagrams |
| [2_array_problems.js](d_coding_problems/2_array_problems.js) | remove duplicates, second largest, two sum, missing number, rotate, chunk, intersection, move zeros, max subarray (Kadane), stock profit, merge sorted |
| [3_number_and_recursion_problems.js](d_coding_problems/3_number_and_recursion_problems.js) | FizzBuzz, factorial, Fibonacci (3 ways), primes and sieve, GCD/LCM, Armstrong numbers, subsets, permutations, climbing stairs |
| [4_searching_and_sorting.js](d_coding_problems/4_searching_and_sorting.js) | linear and binary search; bubble, selection, insertion, merge and quick sort, with a complexity table |
| [5_data_structures.js](d_coding_problems/5_data_structures.js) | stack, O(1) queue, linked list (reverse, middle, cycle detection), binary search tree (insert, search, traversals, height) |
