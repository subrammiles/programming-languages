/*
 * Function pointers: store and pass functions as values.
 *  int (*op)(int, int) = add;     op is a pointer to a function taking (int, int)
 *  typedef int (*BinaryOp)(int, int);   a typedef makes them readable
 * Used for callbacks (qsort), dispatch tables and plug-in behaviour.
 */
#include <stdio.h>
#include <stdlib.h>

static int add(int a, int b) { return a + b; }
static int sub(int a, int b) { return a - b; }
static int mul(int a, int b) { return a * b; }

typedef int (*BinaryOp)(int, int);

static int apply(BinaryOp op, int a, int b) {
    return op(a, b);
}

static int compare_ints(const void *a, const void *b) {
    int x = *(const int *)a, y = *(const int *)b;
    return (x > y) - (x < y); // -1, 0 or 1 without overflow
}

int main(void) {
    int (*op)(int, int) = add;
    printf("%d\n", op(2, 3)); // 5

    BinaryOp table[] = {add, sub, mul};
    const char *names[] = {"add", "sub", "mul"};
    for (int i = 0; i < 3; i++) {
        printf("%s(8, 2) = %d\n", names[i], apply(table[i], 8, 2));
    }

    int nums[] = {42, 7, 19, 3, 25};
    qsort(nums, 5, sizeof nums[0], compare_ints); // qsort calls our comparison function
    for (int i = 0; i < 5; i++) printf("%d ", nums[i]); // 3 7 19 25 42
    printf("\n");
    return 0;
}
