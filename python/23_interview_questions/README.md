# Interview questions

The programs Python interviews ask you to **write** or **predict**. The earlier chapters explain
the concepts; this chapter practises them. Run any file with `python3 <file>.py`.
Every printed line is followed by a `#` comment with the expected output.

| File | Programs |
|---|---|
| [a_string_programs.py](a_string_programs.py) | reverse, palindrome, anagram, frequency, first unique char, duplicates, vowels, reverse words, rotation, dedupe, compression, longest substring without repeats, balanced brackets, permutations, group anagrams, word count, pangram, Caesar cipher |
| [b_number_programs.py](b_number_programs.py) | FizzBuzz, primes and sieve, Fibonacci, factorial, reverse number, Armstrong, perfect numbers, GCD / LCM, digits, bases, power of two, swap, leap year, float precision |
| [c_list_programs.py](c_list_programs.py) | dedupe, duplicates, missing number, two sum, rotate, move zeros, merge sorted, Kadane, stock profit, flatten, chunk, set operations, pair sums, sliding window, majority, matrix transpose / rotate |
| [d_searching_and_sorting.py](d_searching_and_sorting.py) | binary search, `bisect`; bubble, selection, insertion, merge, quick and heap sort; key functions and stability |
| [e_data_structures.py](e_data_structures.py) | linked list (reverse, middle, cycle), stack, queue, min stack, BST, LRU cache, min-heap, trie, graph BFS / DFS |
| [f_pythonic_questions.py](f_pythonic_questions.py) | dict merge / invert / sort, grouping, `zip`, comprehensions, `any` / `all`, decorators, memoisation, context managers, generators, unpacking, copy vs deepcopy |
| [g_predict_the_output.py](g_predict_the_output.py) | mutable defaults, late-binding closures, `[[0]*3]*3`, `is` vs `==`, tuple `+=`, chained comparisons, `return` in `finally`, `UnboundLocalError`, class variables, exhausted generators, truthiness, `sort` vs `sorted` |
| [h_concurrency_programs.py](h_concurrency_programs.py) | odd / even threads, thread-safe counter, thread pool with `as_completed`, asyncio with limits and timeouts, async producer-consumer, deadlock-free lock ordering |

## Concept questions and where they are answered

| Question | Where |
|---|---|
| Mutable vs immutable; `is` vs `==` | [01 / c_object_identity](../01_variables_and_data_types/c_object_identity.py), [02 / c_is_vs_equals](../02_operators/c_is_vs_equals.py) |
| How does Python manage memory? Garbage collection? | [01 / k_memory_and_garbage_collection](../01_variables_and_data_types/k_memory_and_garbage_collection.py) |
| Shallow vs deep copy | [05 / g_copying](../05_data_structures/g_copying.py) |
| `*args` / `**kwargs`, positional-only and keyword-only | [06 / c_arguments](../06_functions/c_arguments.py), [d_positional_and_keyword_only](../06_functions/d_positional_and_keyword_only.py) |
| Why is a mutable default argument a bug? | [06 / e_default_argument_trap](../06_functions/e_default_argument_trap.py) |
| Closures, `global` vs `nonlocal` | [06 functions](../06_functions) |
| `__init__` vs `__new__`, metaclasses | [10 / o_metaclasses_and_class_creation](../10_oop/o_metaclasses_and_class_creation.py) |
| `__str__` vs `__repr__`, dunder methods | [10 / h_dunder_methods](../10_oop/h_dunder_methods.py) |
| How do `@property` and descriptors work? | [10 / g_properties](../10_oop/g_properties.py), [n_descriptors](../10_oop/n_descriptors.py) |
| `__eq__` and `__hash__`; why are lists unhashable? | [10 / l_eq_and_hash](../10_oop/l_eq_and_hash.py) |
| MRO and `super()` with multiple inheritance | [10 / c_inheritance / f_mro](../10_oop/c_inheritance/f_mro.py) |
| Iterators vs generators, `yield` vs `return` | [11 iterators and generators](../11_iterators_and_generators) |
| How do decorators work? With arguments? | [12 decorators](../12_decorators_and_context_managers) |
| What is the GIL? Threads vs processes vs asyncio | [16 / e_gil_and_free_threading](../16_concurrency/e_gil_and_free_threading.py), [17 asyncio](../17_asyncio) |
| Lists vs tuples vs sets vs dicts (and their complexity) | [05 data structures](../05_data_structures) |
