/*
 * A pointer holds a memory ADDRESS.
 *  int *p;      p is a "pointer to int"
 *  p = &x;      & gives the address of x
 *  *p           * reads or writes the value at that address (dereference)
 *  NULL         a pointer to nothing; dereferencing it crashes
 * Pointers are how C passes things by reference, builds data structures,
 * and uses dynamic memory.
 */
#include <stdio.h>

int main(void) {
    int x = 42;
    int *p = &x;

    printf("x = %d\n", x);
    printf("address of x = %p\n", (void *)&x); // different on every run
    printf("p holds        %p\n", (void *)p);
    printf("*p = %d\n", *p); // 42

    *p = 100; // change x THROUGH the pointer
    printf("x is now %d\n", x); // 100

    int y = 7;
    p = &y; // point somewhere else
    printf("*p = %d\n", *p); // 7

    int *nothing = NULL;
    if (nothing == NULL) {
        printf("always check for NULL before dereferencing\n");
    }

    printf("sizeof(int *) = %zu bytes\n", sizeof(int *)); // 8 on 64-bit systems
    return 0;
}
