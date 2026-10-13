/*
 * <math.h>  sqrt pow fabs floor ceil round fmod sin cos log exp hypot  (link with -lm)
 * <time.h>  time, clock, localtime/gmtime, strftime, difftime
 */
#include <math.h>
#include <stdio.h>
#include <time.h>

int main(void) {
    printf("sqrt(2) = %.4f, pow(2, 10) = %.0f, hypot(3, 4) = %.1f\n", sqrt(2.0), pow(2, 10), hypot(3, 4));
    printf("floor(-2.5) = %.1f, ceil(-2.5) = %.1f, round(-2.5) = %.1f\n", floor(-2.5), ceil(-2.5), round(-2.5)); // -3 -2 -3
    printf("fmod(10, 3) = %.1f, M_PI-ish = %.5f\n", fmod(10, 3), acos(-1.0));

    struct tm launch = {.tm_year = 2026 - 1900, .tm_mon = 9, .tm_mday = 13, .tm_hour = 14, .tm_min = 30};
    char text[64];
    time_t t = mktime(&launch); // fills in the day of the week (tm_wday) and normalises the fields
    strftime(text, sizeof text, "%A, %d %B %Y", &launch);
    printf("%s\n", text); // Tuesday, 13 October 2026
    (void)t;

    clock_t start = clock();
    volatile double x = 0;
    for (int i = 0; i < 1000000; i++) x += sqrt(i);
    double seconds = (double)(clock() - start) / CLOCKS_PER_SEC;
    printf("loop took %s\n", seconds >= 0 ? "some CPU time (measured with clock())" : "?");
    return 0;
}
