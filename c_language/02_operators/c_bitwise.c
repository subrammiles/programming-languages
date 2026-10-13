/*
 * Bitwise operators work on individual bits:
 *  &  AND   |  OR   ^  XOR   ~  NOT   << left shift   >> right shift
 * Common uses: flags, masks, packing values, fast multiply/divide by powers of 2.
 * Use UNSIGNED types for bit work: shifting negative numbers is implementation-defined or UB.
 */
#include <stdint.h>
#include <stdio.h>

static void print_bits(uint8_t v) {
    for (int i = 7; i >= 0; i--) {
        putchar((v >> i) & 1u ? '1' : '0');
    }
    putchar('\n');
}

enum { READ = 1u << 0, WRITE = 1u << 1, EXECUTE = 1u << 2 }; // 1, 2, 4

int main(void) {
    uint8_t a = 0xCu, b = 0xAu; // 1100, 1010
    print_bits(a & b); // 00001000
    print_bits(a | b); // 00001110
    print_bits(a ^ b); // 00000110
    print_bits((uint8_t)~a); // 11110011
    print_bits((uint8_t)(1u << 4)); // 00010000

    unsigned perms = READ | WRITE; // set flags
    printf("can write: %s\n", (perms & WRITE) ? "yes" : "no");
    perms &= ~WRITE; // clear a flag
    perms ^= EXECUTE; // toggle a flag
    printf("perms = %u\n", perms); // 5 (READ | EXECUTE)

    unsigned n = 40;
    printf("40 << 1 = %u, 40 >> 2 = %u\n", n << 1, n >> 2); // 80 10
    printf("is 64 a power of two? %s\n", (64u & (64u - 1)) == 0 ? "yes" : "no");
    return 0;
}
