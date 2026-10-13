/*
 * Arrays: a fixed number of elements of one type, stored next to each other.
 *  int a[5];                  uninitialised (garbage) if local
 *  int b[5] = {1, 2};         the rest become 0
 *  int c[] = {1, 2, 3};       size counted for you
 * Indexes go from 0 to n-1. C does NOT check bounds: a[5] on a 5-element array
 * reads/writes random memory (undefined behaviour; the sanitizer catches it).
 */
#include <stdio.h>

int main(void) {
    int scores[5] = {90, 85, 77}; // scores[3] and scores[4] are 0
    int zeros[100] = {0}; // all zero
    int primes[] = {2, 3, 5, 7, 11};
    int days[7] = {[0] = 1, [6] = 7}; // designated initialisers (C99)

    size_t n = sizeof scores / sizeof scores[0];
    for (size_t i = 0; i < n; i++) {
        printf("%d ", scores[i]); // 90 85 77 0 0
    }
    printf("\n");

    scores[3] = 60;
    printf("scores[3] = %d, zeros[99] = %d, primes has %zu elements\n", scores[3], zeros[99], sizeof primes / sizeof *primes);
    printf("days[0] = %d, days[3] = %d, days[6] = %d\n", days[0], days[3], days[6]); // 1 0 7

    int max = primes[0];
    for (size_t i = 1; i < sizeof primes / sizeof *primes; i++) {
        if (primes[i] > max) max = primes[i];
    }
    printf("max prime: %d\n", max); // 11

    // Arrays can't be assigned with =; copy element by element (or memcpy)
    int copy[5];
    for (size_t i = 0; i < 5; i++) copy[i] = primes[i];
    printf("copy[4] = %d\n", copy[4]);
    return 0;
}
