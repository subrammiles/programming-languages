/*
 * Recursion: a function that calls itself. It needs a base case that stops it.
 * Each call uses stack space, so very deep recursion can overflow the stack.
 */
#include <stdio.h>

static unsigned long long factorial(unsigned n) {
    return n <= 1 ? 1 : n * factorial(n - 1);
}

static long fibonacci(int n) {
    // naive version: exponential time. Fine for small n.
    return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
}

static int binary_search(const int a[], int lo, int hi, int target) {
    if (lo > hi) return -1;
    int mid = lo + (hi - lo) / 2; // avoids overflow of (lo + hi)
    if (a[mid] == target) return mid;
    return a[mid] < target ? binary_search(a, mid + 1, hi, target) : binary_search(a, lo, mid - 1, target);
}

static void hanoi(int disks, char from, char to, char via) {
    if (disks == 0) return;
    hanoi(disks - 1, from, via, to);
    printf("move disk %d %c -> %c\n", disks, from, to);
    hanoi(disks - 1, via, to, from);
}

int main(void) {
    printf("20! = %llu\n", factorial(20)); // 2432902008176640000
    printf("fib(20) = %ld\n", fibonacci(20)); // 6765
    int sorted[] = {1, 3, 5, 7, 9, 11};
    printf("index of 9: %d\n", binary_search(sorted, 0, 5, 9)); // 4
    hanoi(2, 'A', 'C', 'B');
    return 0;
}
