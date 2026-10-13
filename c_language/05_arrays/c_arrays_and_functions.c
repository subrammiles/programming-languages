/*
 * Passing arrays to functions
 * An array argument "decays" to a pointer to its first element, so:
 *  - the function can CHANGE the caller's array
 *  - sizeof inside the function gives the size of a POINTER, not the array
 *  -> always pass the length as a separate parameter
 */
#include <stdio.h>

static void double_all(int values[], size_t len) {
    // here "values" is really int *values
    for (size_t i = 0; i < len; i++) values[i] *= 2;
}

static size_t size_inside(const int *values) {
    // Written as "const int values[]", this is the classic bug: the parameter is still a
    // pointer. gcc spots that form (-Wsizeof-array-argument) and our -Werror refuses it.
    return sizeof values; // the size of a POINTER
}

static int sum(const int *values, size_t len) { // const: promises not to modify
    int total = 0;
    for (size_t i = 0; i < len; i++) total += values[i];
    return total;
}

int main(void) {
    int data[] = {1, 2, 3, 4};
    size_t len = sizeof data / sizeof data[0];

    double_all(data, len);
    printf("%d %d %d %d\n", data[0], data[1], data[2], data[3]); // 2 4 6 8 -> changed
    printf("sum = %d\n", sum(data, len)); // 20
    printf("sizeof in main: %zu, inside a function: %zu\n", sizeof data, size_inside(data)); // 16 vs 8
    return 0;
}
