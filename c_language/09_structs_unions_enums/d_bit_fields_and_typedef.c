/*
 *  typedef     a new NAME for a type:  typedef unsigned long ulong;
 *  bit fields  struct members with a width in bits, packed together
 * Bit field layout is implementation-defined, so don't use them for file formats or networking.
 */
#include <stdint.h>
#include <stdio.h>

typedef uint32_t Rgba; // a readable name
typedef struct {
    unsigned int read : 1;
    unsigned int write : 1;
    unsigned int execute : 1;
    unsigned int priority : 3; // 0..7
} Permissions;

int main(void) {
    Permissions p = {.read = 1, .write = 0, .execute = 1, .priority = 5};
    printf("r=%u w=%u x=%u priority=%u, sizeof=%zu\n", p.read, p.write, p.execute, p.priority, sizeof p);

    Rgba red = 0xFF0000FFu;
    printf("red channel = %u\n", (red >> 24) & 0xFFu); // 255
    return 0;
}
