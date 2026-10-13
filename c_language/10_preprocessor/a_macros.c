/*
 * The preprocessor runs BEFORE compilation and works on text.
 *  #include   paste a header file in
 *  #define    object-like macro (a constant) or function-like macro
 * Macro pitfalls: always parenthesise parameters and the whole body, and never pass
 * arguments with side effects (like i++) because a parameter may be evaluated twice.
 * Prefer const variables, enums and static inline functions where they work.
 * See the expanded code with:  gcc -E a_macros.c
 */
#include <stdio.h>

#define PI 3.14159
#define SQUARE_BAD(x) x * x
#define SQUARE(x) ((x) * (x))
#define MAX(a, b) ((a) > (b) ? (a) : (b))
#define ARRAY_LEN(arr) (sizeof(arr) / sizeof((arr)[0]))
#define STRINGIFY(x) #x
#define CONCAT(a, b) a##b
#define DEBUG_PRINT(fmt, ...) fprintf(stdout, "[%s:%d] " fmt "\n", __FILE__, __LINE__, __VA_ARGS__)

int main(void) {
    printf("%.5f\n", PI);
    printf("SQUARE_BAD(1 + 2) = %d\n", SQUARE_BAD(1 + 2)); // 5, because it becomes 1 + 2 * 1 + 2
    printf("SQUARE(1 + 2) = %d\n", SQUARE(1 + 2)); // 9
    printf("MAX(3, 7) = %d\n", MAX(3, 7));

    int values[] = {1, 2, 3, 4};
    printf("ARRAY_LEN = %zu\n", ARRAY_LEN(values)); // 4
    printf("%s\n", STRINGIFY(hello world)); // "hello world" as a string
    int CONCAT(my, Var) = 42; // declares myVar
    printf("myVar = %d\n", myVar);
    DEBUG_PRINT("value is %d", 42); // [10_preprocessor/a_macros.c:32] value is 42
    return 0;
}
