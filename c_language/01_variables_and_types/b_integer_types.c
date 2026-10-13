/*
 * Integer types and their sizes.
 * The C standard only sets MINIMUM sizes, so they differ between platforms:
 *  char >= 8 bits, short >= 16, int >= 16, long >= 32, long long >= 64
 * Use <stdint.h> when the exact size matters: int8_t, int32_t, uint64_t, size_t ...
 * sizeof(x) gives the size in bytes (type size_t, printed with %zu).
 */
#include <inttypes.h>
#include <limits.h>
#include <stdint.h>
#include <stdio.h>

int main(void) {
    printf("char      %zu byte\n", sizeof(char)); // always 1
    printf("short     %zu bytes\n", sizeof(short));
    printf("int       %zu bytes, range %d to %d\n", sizeof(int), INT_MIN, INT_MAX);
    printf("long      %zu bytes\n", sizeof(long));
    printf("long long %zu bytes, max %lld\n", sizeof(long long), LLONG_MAX);

    unsigned int u = 4000000000u; // unsigned: only >= 0, but twice the positive range
    printf("unsigned  %u (max %u)\n", u, UINT_MAX);

    int32_t exact = -123456; // exactly 32 bits everywhere
    uint8_t byte = 255;
    uint64_t big = UINT64_MAX;
    printf("int32_t %" PRId32 ", uint8_t %u, uint64_t %" PRIu64 "\n", exact, byte, big);

    size_t count = sizeof(int[10]); // size_t: sizes and array indexes
    printf("an int[10] takes %zu bytes\n", count); // 40 on most systems

    // Unsigned arithmetic wraps around (well defined)...
    uint8_t wrap = 255;
    wrap = (uint8_t)(wrap + 1);
    printf("255 + 1 as uint8_t = %u\n", wrap); // 0
    // ...but SIGNED overflow is UNDEFINED BEHAVIOUR: INT_MAX + 1 can do anything.
    // The sanitizer in our Makefile would stop the program if we tried it.
    return 0;
}
