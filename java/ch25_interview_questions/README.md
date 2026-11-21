# Interview questions

The programs Java interviews ask you to **write** or **predict**. The earlier chapters
explain the concepts; this chapter practises them. Targets Java 21.

Run from the `java/` folder, like the other chapters:
```bash
java ch25_interview_questions/a_string_programs/StringPrograms.java
```
Every printed line is followed by a `//` comment with the expected output.

## a–d. Coding programs

| File | Programs |
|---|---|
| [StringPrograms](a_string_programs/StringPrograms.java) | reverse, palindrome, anagram, character frequency, first non-repeated char, duplicates, vowels, reverse words, rotation, compression, longest substring without repeats, balanced brackets, permutations, group anagrams |
| [NumberPrograms](b_number_programs/NumberPrograms.java) | FizzBuzz, prime check, sieve, Fibonacci, factorial (and its overflow), reverse number, Armstrong, perfect numbers, GCD / LCM, digits, binary, power of two, swap without temp |
| [ArrayPrograms](c_array_programs/ArrayPrograms.java) | second largest, duplicates, missing number, two sum, reverse, rotate, move zeros, merge sorted, Kadane, stock profit, dedupe sorted, intersection, majority element, rotate a matrix |
| [SearchingAndSorting](d_searching_and_sorting/SearchingAndSorting.java) | binary search (iterative, recursive); bubble, selection, insertion, merge, quick and counting sort, with a complexity table |

## e. Data structures

| File | Covers |
|---|---|
| [LinkedListPrograms](e_data_structures/LinkedListPrograms.java) | reverse (iterative, recursive), middle, cycle detection and start, n-th from end, merge sorted, remove duplicates |
| [BinarySearchTree](e_data_structures/BinarySearchTree.java) | insert, search, delete, traversals, height, validate, lowest common ancestor, mirror |
| [MyHashMap](e_data_structures/MyHashMap.java) | "how does HashMap work?": buckets, hashing, collisions, resizing |
| [LRUCache](e_data_structures/LRUCache.java) | with `LinkedHashMap`, and with a HashMap + doubly linked list |
| [StackAndQueue](e_data_structures/StackAndQueue.java) | array stack, queue with two stacks, min stack, postfix evaluation |

## f. Concurrency programs

| File | Covers |
|---|---|
| [OddEvenPrinter](f_concurrency_programs/OddEvenPrinter.java) | odd / even numbers from two threads (`wait` / `notify`, semaphores), ABC from three threads |
| [DeadlockFreeTransfer](f_concurrency_programs/DeadlockFreeTransfer.java) | bank transfers without deadlock: lock ordering and `tryLock` |

Also see: producer-consumer in [ch18 / o_producer_consumer](../ch18_concurrency/o_producer_consumer),
thread-safe singletons in [ch22 / singleton](../ch22_design_patterns/singleton).

## g. Predict the output

| File | Topic |
|---|---|
| [A_StringsAndWrappers](g_predict_the_output/A_StringsAndWrappers.java) | Integer cache, `==` vs `equals`, unboxing `null`, `remove(int)`, char arithmetic, ternary promotion, `i = i++` |
| [B_InitializationOrder](g_predict_the_output/B_InitializationOrder.java) | static / instance blocks, constructors, overridable call in a constructor, lazy class loading |
| [C_ExceptionsAndFinally](g_predict_the_output/C_ExceptionsAndFinally.java) | `return` in `try` and `finally`, swallowed exceptions, `System.exit` |
| [D_OverloadingAndOverriding](g_predict_the_output/D_OverloadingAndOverriding.java) | runtime vs compile-time binding, field and static method hiding, overload resolution order |

## h. Java 8 stream questions

| File | Covers |
|---|---|
| [StreamPrograms](h_stream_programs/StreamPrograms.java) | duplicates, second highest, char / word frequency, group by department, highest paid per department, partitioning, sorting, `toMap`, `flatMap` |

## Concept questions and where they are answered

| Question | File |
|---|---|
| Is Java pass-by-value or pass-by-reference? | [ch06 / n_methods / A_PassByValue](../ch06_oop/n_methods/A_PassByValue.java) |
| The `equals` / `hashCode` contract | [ch06 / o_object_class / A_EqualsAndHashCode](../ch06_oop/o_object_class/A_EqualsAndHashCode.java) |
| Shallow vs deep copy | [ch06 / o_object_class / B_ToStringAndCloning](../ch06_oop/o_object_class/B_ToStringAndCloning.java) |
| How do you make a class immutable? | [ch06 / o_object_class / C_ImmutableClass](../ch06_oop/o_object_class/C_ImmutableClass.java) |
| String pool, `==` vs `equals`, `intern()` | [ch04 / G_StringPoolAndEquality](../ch04_strings/G_StringPoolAndEquality.java) |
| `String` vs `StringBuilder` vs `StringBuffer` | [ch04 / mutable_classes](../ch04_strings/mutable_classes) |
| Stack vs heap, garbage collection, memory leaks | [ch02 / e_memory](../ch02_variables_and_data_types/e_memory/StackHeapAndGarbageCollection.java) |
| Why not `double` for money? | [ch02 / d_numbers / B_BigDecimalAndBigInteger](../ch02_variables_and_data_types/d_numbers/B_BigDecimalAndBigInteger.java) |
| Checked vs unchecked exceptions | [ch10 / E_CheckedVsUnchecked](../ch10_exception_handling/E_CheckedVsUnchecked.java) |
| Type erasure, `? extends` vs `? super` | [ch11 / TypeErasureAndPECS](../ch11_generics/TypeErasureAndPECS.java) |
| `ConcurrentModificationException`, fail-fast vs fail-safe | [ch12 / iterators / FailFastIterators](../ch12_collections/iterators/FailFastIterators.java) |
| `HashMap` vs `TreeMap` vs `LinkedHashMap` vs `ConcurrentHashMap` | [ch12 / maps](../ch12_collections/maps) |
| `Comparable` vs `Comparator` | [ch12 / sorting](../ch12_collections/sorting/A_ComparableAndComparator.java) |
| `synchronized` vs `ReentrantLock` vs `ReadWriteLock`, `volatile` | [ch18 / h_locks](../ch18_concurrency/h_locks), [k_thread_local_and_volatile](../ch18_concurrency/k_thread_local_and_volatile) |
| `wait` / `notify`, producer-consumer | [ch18 / o_producer_consumer](../ch18_concurrency/o_producer_consumer) |
| Thread-safe singleton, double-checked locking | [ch22 / singleton](../ch22_design_patterns/singleton) |
| Abstract class vs interface | [ch06 / e_abstraction](../ch06_oop/e_abstraction), [f_interfaces](../ch06_oop/f_interfaces) |
