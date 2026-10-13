/*
 * Dynamic memory: memory you request at run time, from the HEAP.
 *  malloc(bytes)          uninitialised memory (or NULL if it fails)
 *  calloc(count, size)    zero-filled memory
 *  free(p)                give it back. Every malloc needs exactly one free.
 * Use it when the size is only known at run time, or data must outlive a function.
 * Idiom: p = malloc(n * sizeof *p);  (sizeof *p stays right if p's type changes)
 */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

static char *duplicate(const char *s) {
    size_t len = strlen(s) + 1; // +1 for '\0'
    char *copy = malloc(len);
    if (copy == NULL) return NULL;
    memcpy(copy, s, len);
    return copy; // the CALLER must free it
}

int main(void) {
    int n = 5;
    int *numbers = malloc((size_t)n * sizeof *numbers);
    if (numbers == NULL) {
        fprintf(stderr, "out of memory\n");
        return EXIT_FAILURE;
    }
    for (int i = 0; i < n; i++) numbers[i] = i * i;
    for (int i = 0; i < n; i++) printf("%d ", numbers[i]); // 0 1 4 9 16
    printf("\n");
    free(numbers);
    numbers = NULL; // avoid using a dangling pointer by accident

    double *zeros = calloc(3, sizeof *zeros);
    if (zeros == NULL) return EXIT_FAILURE;
    printf("calloc gives %.1f %.1f %.1f\n", zeros[0], zeros[1], zeros[2]); // 0.0 0.0 0.0
    free(zeros);

    char *copy = duplicate("heap string");
    if (copy) {
        copy[0] = 'H';
        printf("%s\n", copy); // Heap string
        free(copy);
    }
    return 0;
}
