/*
 * A growable array (like std::vector, ArrayList or a Python list), built with realloc.
 *  realloc(p, new_size) resizes a block, possibly MOVING it; the old pointer becomes invalid.
 *  Always assign realloc's result to a temporary: on failure it returns NULL and the
 *  original block is still yours to free.
 * Growing by doubling makes appends cheap on average.
 */
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int *data;
    size_t len;
    size_t cap;
} IntVec;

static int vec_push(IntVec *v, int value) {
    if (v->len == v->cap) {
        size_t new_cap = v->cap ? v->cap * 2 : 4;
        int *bigger = realloc(v->data, new_cap * sizeof *bigger);
        if (bigger == NULL) return 0; // v->data is still valid
        v->data = bigger;
        v->cap = new_cap;
    }
    v->data[v->len++] = value;
    return 1;
}

static void vec_free(IntVec *v) {
    free(v->data);
    *v = (IntVec){0};
}

int main(void) {
    IntVec v = {0};
    for (int i = 1; i <= 10; i++) {
        if (!vec_push(&v, i * 10)) {
            vec_free(&v);
            return EXIT_FAILURE;
        }
        printf("len=%2zu cap=%2zu\n", v.len, v.cap);
    }
    long sum = 0;
    for (size_t i = 0; i < v.len; i++) sum += v.data[i];
    printf("sum = %ld\n", sum); // 550
    vec_free(&v);
    return 0;
}
