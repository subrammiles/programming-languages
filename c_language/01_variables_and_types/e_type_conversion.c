/*
 * Type conversions
 *  Implicit: in mixed arithmetic the "smaller" type is converted up (int -> double)
 *  Explicit: a cast  (double)x
 * Watch out for: integer division, truncation when converting double -> int,
 * and signed/unsigned comparisons.
 */
#include <stdio.h>

int main(void) {
    int total = 7, count = 2;
    double wrong = total / count; // integer division happens FIRST: 3, then converted to 3.0
    double right = (double)total / count; // 3.5
    printf("%.1f vs %.1f\n", wrong, right);

    double d = 9.99;
    int truncated = (int)d; // drops the fraction: 9 (it does not round)
    printf("(int)9.99 = %d\n", truncated);

    char c = 'A';
    int code = c; // char is a small integer
    printf("'%c' is %d, %d + 1 is '%c'\n", c, code, code, code + 1); // 'A' is 65, ... 'B'

    int negative = -1;
    unsigned int positive = 1;
    // In a comparison, -1 is converted to unsigned: 4294967295 > 1
    printf("-1 < 1u is %s\n", (unsigned int)negative < positive ? "true" : "false (surprise!)");
    return 0;
}
