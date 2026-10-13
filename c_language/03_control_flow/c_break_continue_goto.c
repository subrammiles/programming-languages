/*
 * break     leave the innermost loop (or switch)
 * continue  skip to the next iteration
 * goto      jump to a label. Generally avoided, EXCEPT for the common C idiom of
 *           jumping to one clean-up block when an error happens part-way through.
 */
#include <stdio.h>
#include <stdlib.h>

static int process(int fail_at) {
    int status = -1;
    int *a = malloc(10 * sizeof *a);
    if (a == NULL) goto done;
    int *b = malloc(10 * sizeof *b);
    if (b == NULL || fail_at == 1) goto free_b; // free(NULL) is allowed
    int *c = malloc(10 * sizeof *c);
    if (c == NULL || fail_at == 2) goto free_c;

    status = 0; // all steps succeeded
free_c:
    free(c);
free_b:
    free(b);
    free(a);
done:
    return status;
}

int main(void) {
    for (int i = 1; i <= 10; i++) {
        if (i % 2 == 0) continue;
        if (i > 7) break;
        printf("%d ", i); // 1 3 5 7
    }
    printf("\n");

    // Leaving nested loops: use a flag (or a function with return)
    int found = 0;
    for (int i = 1; i <= 3 && !found; i++) {
        for (int j = 1; j <= 3; j++) {
            if (i * j == 4) {
                printf("found 4 at %d,%d\n", i, j);
                found = 1;
                break;
            }
        }
    }

    printf("process: %d %d %d\n", process(0), process(1), process(2)); // 0 -1 -1, no leaks
    return 0;
}
