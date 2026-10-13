/*
 * assert(condition) stops the program with a message if the condition is false.
 * Use it to catch PROGRAMMER errors (impossible states), not to handle user input.
 * Compiling with -DNDEBUG removes every assert. static_assert checks at compile time.
 */
#include <assert.h>
#include <stdio.h>

static int average(const int *values, int count) {
    assert(values != NULL);
    assert(count > 0 && "count must be positive"); // the string shows up in the message
    int sum = 0;
    for (int i = 0; i < count; i++) sum += values[i];
    return sum / count;
}

static_assert(sizeof(int) >= 4, "this code needs 32-bit ints");

int main(void) {
    int marks[] = {70, 80, 90};
    printf("average = %d\n", average(marks, 3)); // 80
    // average(marks, 0); // Assertion `count > 0 && "count must be positive"' failed. Aborted
    return 0;
}
