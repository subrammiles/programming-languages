/*
 * The most common C string bugs, and the safe versions.
 *  1. Buffer overflow: copying more than fits (strcpy, strcat, gets, sprintf)
 *  2. Forgetting room for '\0'
 *  3. Comparing with == (compares ADDRESSES, not text)
 *  4. Returning a pointer to a local array
 */
#include <stdio.h>
#include <string.h>

// Copies at most size-1 characters and always terminates. Returns 1 if it all fitted.
static int copy_string(char *dst, size_t size, const char *src) {
    size_t len = strlen(src);
    if (size == 0) return 0;
    size_t n = len < size - 1 ? len : size - 1;
    memcpy(dst, src, n);
    dst[n] = '\0';
    return n == len;
}

int main(void) {
    char small[6];
    // strcpy(small, "much too long"); // overflow! The sanitizer would stop the program here.
    int fitted = copy_string(small, sizeof small, "much too long");
    printf("\"%s\" fitted=%d\n", small, fitted); // "much " fitted=0

    char a[] = "same", b[] = "same";
    const char *pa = a, *pb = b;
    // == compares ADDRESSES (written as a == b, gcc rejects it: -Warray-compare)
    printf("pa == pb: %d, strcmp: %d\n", pa == pb, strcmp(pa, pb) == 0); // 0 1

    char full[32] = "Hello";
    size_t used = strlen(full);
    snprintf(full + used, sizeof full - used, ", %s!", "World"); // safe append
    printf("%s\n", full);

    // gets() was REMOVED from C11 because it can't be used safely. Use fgets:
    // fgets(buffer, sizeof buffer, stdin);
    return 0;
}
