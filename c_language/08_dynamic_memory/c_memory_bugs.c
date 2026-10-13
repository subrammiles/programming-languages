/*
 * The classic memory bugs. Each one is undefined behaviour: the program may seem to work,
 * crash later, or corrupt data. They are shown in comments; uncomment one and run with
 * the Makefile's AddressSanitizer to see it caught immediately.
 *
 * 1. Memory leak:          malloc without free
 * 2. Use after free:       free(p); p[0] = 1;
 * 3. Double free:          free(p); free(p);
 * 4. Buffer overflow:      int *p = malloc(4 * sizeof *p); p[4] = 1;
 * 5. Uninitialised read:   int *p = malloc(...); printf("%d", p[0]);
 * 6. Dangling pointer:     returning the address of a local variable
 * 7. Forgetting the NULL check after malloc
 *
 * Tools: -fsanitize=address,undefined (compile time), valgrind ./program (run time).
 */
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *p = malloc(4 * sizeof *p);
    if (p == NULL) return EXIT_FAILURE;
    for (int i = 0; i < 4; i++) p[i] = i;

    // p[4] = 99;           // 2. heap-buffer-overflow
    free(p);
    // printf("%d\n", p[0]); // 3. heap-use-after-free
    // free(p);             // 4. attempting double-free
    p = NULL; // after this, an accidental free(p) is harmless and *p crashes clearly

    int *leak = malloc(100);
    (void)leak;
    free(leak); // remove this line and LeakSanitizer reports "100 byte(s) leaked"

    printf("no memory errors in this run\n");
    return 0;
}
