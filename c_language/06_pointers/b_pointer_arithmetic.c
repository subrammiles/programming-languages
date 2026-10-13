/*
 * Pointer arithmetic moves in units of the POINTED-TO type:
 *  p + 1 points to the NEXT int (4 bytes further), not the next byte.
 * Arrays and pointers: a[i] is exactly *(a + i).
 * Only stay within an array (or one past its end): anything else is undefined behaviour.
 */
#include <stdio.h>

int main(void) {
    int a[] = {10, 20, 30, 40};
    int *p = a; // an array name is a pointer to its first element

    printf("%d %d %d\n", *p, *(p + 1), p[2]); // 10 20 30
    printf("a[3] == *(a + 3): %d == %d\n", a[3], *(a + 3));

    for (int *it = a; it < a + 4; it++) { // walk the array with a pointer
        printf("%d ", *it);
    }
    printf("\n");

    int *last = &a[3];
    printf("elements between: %td\n", last - p); // 3 (ptrdiff_t)
    printf("bytes between:    %td\n", (char *)last - (char *)p); // 12
    return 0;
}
