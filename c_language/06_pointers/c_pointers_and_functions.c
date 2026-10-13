/*
 * Pointers as parameters let a function:
 *  - change the caller's variables (swap)
 *  - "return" several values through output parameters
 */
#include <stdbool.h>
#include <stdio.h>

static void swap(int *a, int *b) {
    int tmp = *a;
    *a = *b;
    *b = tmp;
}

static bool min_max(const int *values, size_t len, int *min, int *max) {
    if (len == 0) return false;
    *min = *max = values[0];
    for (size_t i = 1; i < len; i++) {
        if (values[i] < *min) *min = values[i];
        if (values[i] > *max) *max = values[i];
    }
    return true;
}

static int *find(int *values, size_t len, int target) {
    for (size_t i = 0; i < len; i++) {
        if (values[i] == target) return &values[i];
    }
    return NULL; // not found
}

int main(void) {
    int x = 1, y = 2;
    swap(&x, &y);
    printf("x = %d, y = %d\n", x, y); // 2 1

    int data[] = {4, 9, 1, 7};
    int lo, hi;
    if (min_max(data, 4, &lo, &hi)) {
        printf("min %d, max %d\n", lo, hi); // 1 9
    }

    int *hit = find(data, 4, 7);
    if (hit) {
        *hit = 70;
        printf("data[3] = %d\n", data[3]); // 70
    }
    printf("find 5: %s\n", find(data, 4, 5) ? "found" : "NULL");
    // Never return a pointer to a LOCAL variable: it dies when the function returns.
    return 0;
}
