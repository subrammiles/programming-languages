/*
 * C11 features (also part of C17, which mostly fixed defects in C11)
 *  _Generic         choose code by the TYPE of an expression (type-generic macros)
 *  static_assert    compile-time checks
 *  _Alignof/_Alignas  alignment control
 *  anonymous structs and unions
 *  _Noreturn        a function that never returns
 *  <threads.h>, <stdatomic.h>, and bounds-checked "_s" functions (Annex K, rarely available)
 */
#include <assert.h>
#include <stdalign.h>
#include <stdio.h>
#include <stdlib.h>

#define type_name(x) _Generic((x), \
    int: "int", \
    double: "double", \
    char *: "string", \
    default: "something else")

#define print_any(x) _Generic((x), int: print_int, double: print_double, char *: print_str)(x)
static void print_int(int v) { printf("int %d\n", v); }
static void print_double(double v) { printf("double %.2f\n", v); }
static void print_str(char *v) { printf("string %s\n", v); }

struct Vec3 {
    union {
        struct { float x, y, z; }; // anonymous: v.x works directly
        float items[3];
    };
};

static _Noreturn void fatal(const char *msg) {
    fprintf(stderr, "fatal: %s\n", msg);
    exit(1);
}

int main(void) {
    char name[] = "C";
    printf("%s %s %s %s\n", type_name(42), type_name(3.14), type_name(name), type_name(1.5f));
    print_any(7);
    print_any(2.5);
    print_any(name);

    static_assert(sizeof(struct Vec3) == 3 * sizeof(float), "no padding expected");
    struct Vec3 v = {.x = 1, .y = 2, .z = 3};
    printf("v.y = %.0f = items[1] = %.0f\n", v.y, v.items[1]);

    alignas(64) static char cache_line[64];
    printf("alignof(double) = %zu, cache_line aligned to 64: %d\n", alignof(double), ((size_t)cache_line % 64) == 0);
    if (v.x < 0) fatal("negative");
    return 0;
}
