/*
 * Loops: for, while, do-while
 */
#include <stdio.h>

int main(void) {
    for (int i = 1; i <= 3; i++) {
        printf("for %d\n", i);
    }

    int n = 12345, digits = 0;
    while (n > 0) { // checks first
        n /= 10;
        digits++;
    }
    printf("digits: %d\n", digits); // 5

    int tries = 0;
    do { // runs at least once
        tries++;
    } while (tries < 3);
    printf("tries: %d\n", tries); // 3

    int primes[] = {2, 3, 5, 7, 11};
    int count = (int)(sizeof primes / sizeof primes[0]); // number of elements
    int sum = 0;
    for (int i = 0; i < count; i++) {
        sum += primes[i];
    }
    printf("sum of %d primes: %d\n", count, sum); // 28

    for (int row = 1; row <= 3; row++) { // nested loops: a triangle
        for (int col = 0; col < row; col++) {
            putchar('*');
        }
        putchar('\n');
    }
    return 0;
}
