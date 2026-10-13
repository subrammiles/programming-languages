/*
 * Operator precedence (high to low, simplified):
 *  () [] -> .   then unary ! ~ ++ -- * & (cast) sizeof
 *  * / %   then + -   then << >>   then < <= > >=   then == !=
 *  &   then ^   then |   then &&   then ||   then ?:   then = += ...   then ,
 * Bitwise & | ^ are LOWER than ==, which surprises everyone: use parentheses.
 */
#include <stdio.h>

int main(void) {
    printf("%d\n", 2 + 3 * 4); // 14
    printf("%d\n", (2 + 3) * 4); // 20

    int flags = 6;
    // flags & 4 == 4 means flags & (4 == 4) -> flags & 1 -> 0  (wrong!)
    printf("%d\n", (flags & 4) == 4); // 1 (what we meant)

    int x = 5;
    printf("%d\n", (x > 3 && x < 10) || x == 0); // 1 -> && binds tighter than ||, but write the
    // parentheses anyway: compilers warn (-Wparentheses) when they're missing
    printf("%d\n", -x * 2); // -10 -> unary minus first
    return 0;
}
