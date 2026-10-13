/*
 * Functions
 *  return_type name(parameters) { body }
 *  - declare (prototype) before use, or define above the caller
 *  - arguments are passed BY VALUE: the function gets copies
 *  - to change the caller's variable, pass a pointer (chapter 06)
 *  - (void) in the parameter list means "no parameters"
 */
#include <stdio.h>

int add(int a, int b); // a prototype: the definition can come later
static void greet(const char *name);
static double average(const int values[], int count);

int main(void) {
    printf("%d\n", add(2, 3)); // 5
    greet("Subbu");

    int x = 10;
    void try_to_change(int n);
    try_to_change(x);
    printf("x is still %d\n", x); // 10

    int marks[] = {80, 90, 70};
    printf("average %.1f\n", average(marks, 3)); // 80.0
    return 0;
}

int add(int a, int b) {
    return a + b;
}

static void greet(const char *name) { // static: only visible in this file
    printf("Hello, %s!\n", name);
}

void try_to_change(int n) {
    n = 99; // changes the local copy only
    (void)n;
}

static double average(const int values[], int count) {
    int sum = 0;
    for (int i = 0; i < count; i++) sum += values[i];
    return count > 0 ? (double)sum / count : 0.0;
}
