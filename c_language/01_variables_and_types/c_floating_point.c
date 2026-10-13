/*
 * Floating point: float (~7 digits), double (~15 digits, the default), long double.
 * They are binary fractions: 0.1 can't be stored exactly, so never compare with ==.
 */
#include <float.h>
#include <math.h>
#include <stdio.h>

int main(void) {
    float f = 3.14159265358979f; // the f suffix makes a float literal
    double d = 3.14159265358979;
    printf("float  %.15f\n", f); // only ~7 digits are right
    printf("double %.15f\n", d);

    double sum = 0.1 + 0.2;
    printf("0.1 + 0.2 = %.17f\n", sum); // 0.30000000000000004
    printf("== 0.3? %s\n", sum == 0.3 ? "yes" : "no"); // no
    printf("close enough? %s\n", fabs(sum - 0.3) < 1e-9 ? "yes" : "no"); // yes

    printf("DBL_MAX = %g, DBL_EPSILON = %g\n", DBL_MAX, DBL_EPSILON);
    printf("1.0 / 0.0 = %f, sqrt(-1) = %f\n", 1.0 / 0.0, sqrt(-1.0)); // inf, -nan or nan
    printf("7 / 2 = %d but 7.0 / 2 = %.1f\n", 7 / 2, 7.0 / 2); // 3 vs 3.5
    return 0;
}
