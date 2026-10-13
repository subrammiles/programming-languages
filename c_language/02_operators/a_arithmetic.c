/*
 * Arithmetic: + - * / %   increment/decrement: ++ --   compound: += -= *= /= %=
 * Integer division truncates toward zero; % takes the sign of the left operand.
 * Dividing by zero (integers) is undefined behaviour: check first.
 */
#include <stdio.h>

int main(void) {
    int a = 17, b = 5;
    printf("%d %d %d %d %d\n", a + b, a - b, a * b, a / b, a % b); // 22 12 85 3 2
    printf("-17 / 5 = %d, -17 %% 5 = %d\n", -17 / 5, -17 % 5); // -3 -2

    int i = 5;
    int pre = ++i; // increment, then use: 6
    int post = i++; // use, then increment: 6 (i becomes 7)
    printf("pre %d, post %d, i %d\n", pre, post, i);
    // Never write i = i++ or f(i++, i++): modifying a variable twice without a
    // sequence point is undefined behaviour.

    int x = 10;
    x += 5;
    x *= 2;
    x %= 7;
    printf("x = %d\n", x); // 30 % 7 = 2

    int divisor = 0;
    if (divisor != 0) {
        printf("%d\n", a / divisor);
    } else {
        printf("refusing to divide by zero\n");
    }
    return 0;
}
