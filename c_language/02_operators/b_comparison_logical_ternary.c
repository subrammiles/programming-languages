/*
 * Comparison: == != < > <= >=   result is int 1 (true) or 0 (false)
 * Logical:    && || !           short-circuit: the right side may not run
 * Ternary:    cond ? a : b
 * In C, 0 is false and any other value is true.
 * Classic bug: if (x = 5) assigns instead of comparing (compilers warn).
 */
#include <stdbool.h>
#include <stdio.h>

static int calls = 0;
static bool expensive_check(void) {
    calls++;
    return true;
}

int main(void) {
    int age = 25;
    printf("%d %d %d\n", age > 18, age == 30, age != 30); // 1 0 1

    bool adult = age >= 18 && age < 60; // bool from <stdbool.h> (a keyword in C23)
    printf("adult: %s\n", adult ? "yes" : "no");

    if (age < 18 && expensive_check()) { // left side false -> right side skipped
        printf("never\n");
    }
    printf("expensive_check called %d times\n", calls); // 0

    int *maybe = NULL;
    if (maybe != NULL && *maybe > 0) { // && protects the dereference
        printf("positive\n");
    }

    printf("!0 = %d, !5 = %d\n", !0, !5); // 1 0
    const char *label = age >= 18 ? "adult" : "minor";
    printf("%s\n", label);
    return 0;
}
