/*
 * C23 (ISO/IEC 9899:2024), the newest C standard.
 * Compile with gcc 13 (-std=c2x), or gcc 14+ / clang 19+ (-std=c23).
 *  nullptr                 a real null pointer constant (type nullptr_t)
 *  bool, true, false       keywords (no <stdbool.h> needed); static_assert too
 *  constexpr               true compile-time constants
 *  typeof / typeof_unqual  the type of an expression (standardising a GNU extension)
 *  auto                    type inference for variables
 *  [[nodiscard]] [[maybe_unused]] [[deprecated]] [[fallthrough]]   standard attributes
 *  0b1010 binary literals, 1'000'000 digit separators
 *  enum with a fixed underlying type:  enum Color : unsigned char { ... }
 *  #elifdef / #elifndef, #embed (include a file's bytes), <stdbit.h>, unreachable()
 *  empty initialiser {} zeroes everything; K&R function definitions and implicit int are gone
 */
#include <stdio.h>

constexpr int MAX_USERS = 1'000; // digit separator
constexpr unsigned MASK = 0b1111'0000;

enum Color : unsigned char { RED, GREEN, BLUE }; // fixed underlying type

[[nodiscard]] static int compute(int x) {
    return x * 2;
}

[[deprecated("use compute()")]] [[maybe_unused]] static int old_compute(int x) {
    return x + x;
}

static const char *describe(int n) {
    switch (n) {
    case 0:
        return "zero";
    case 1:
        [[fallthrough]];
    case 2:
        return "small";
    default:
        return "big";
    }
}

int main(void) {
    int *p = nullptr;
    bool ok = p == nullptr; // bool is a keyword now
    printf("nullptr check: %s\n", ok ? "true" : "false");

    static_assert(MAX_USERS == 1000); // the message is optional in C23
    printf("MAX_USERS = %d, MASK = %u, sizeof(enum Color) = %zu\n", MAX_USERS, MASK, sizeof(enum Color)); // 1000 240 1

    auto answer = compute(21); // auto: inferred as int
    typeof(answer) copy = answer; // typeof: the same type as answer
    printf("answer = %d, copy = %d\n", answer, copy);

    int zeros[5] = {}; // empty initialiser
    printf("zeros[4] = %d, describe(1) = %s\n", zeros[4], describe(1));
    // compute(5); // warning: ignoring return value of function declared with 'nodiscard'
    return 0;
}
