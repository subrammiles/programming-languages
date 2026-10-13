/*
 * Pointer to pointer: int **pp  (e.g. to change which address a caller's pointer holds)
 * const and pointers - read right to left:
 *  const int *p        pointer to a const int: can't change *p, can change p
 *  int *const p        const pointer: can change *p, can't change p
 *  const int *const p  neither
 * void *: a pointer to "anything"; must be converted before dereferencing.
 */
#include <stdio.h>

static int first = 1, second = 2;

static void point_to_second(int **pp) {
    *pp = &second; // changes the caller's pointer
}

int main(void) {
    int *p = &first;
    point_to_second(&p);
    printf("*p = %d\n", *p); // 2

    int value = 10, other = 20;
    const int *read_only = &value;
    // *read_only = 5;   // error: assignment of read-only location
    read_only = &other; // fine

    int *const fixed = &value;
    *fixed = 11; // fine
    // fixed = &other;   // error: assignment of read-only variable
    printf("%d %d\n", *read_only, value); // 20 11

    void *anything = &value;
    int *back = anything; // void * converts to any object pointer
    printf("%d\n", *back); // 11

    const char *words[] = {"apple", "banana", "cherry"}; // an array of pointers
    const char **w = words;
    printf("%s %s\n", *w, *(w + 2)); // apple cherry
    return 0;
}
