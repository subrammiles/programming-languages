/*
 * Variadic functions take a variable number of arguments, like printf.
 *  #include <stdarg.h>; declare with ...; read with va_start / va_arg / va_end
 * The function must learn the count (and types) some other way: a count parameter,
 * a format string, or a sentinel value at the end.
 */
#include <stdarg.h>
#include <stdio.h>

static int sum(int count, ...) {
    va_list args;
    va_start(args, count);
    int total = 0;
    for (int i = 0; i < count; i++) {
        total += va_arg(args, int);
    }
    va_end(args);
    return total;
}

static void log_message(const char *level, const char *format, ...) {
    va_list args;
    va_start(args, format);
    printf("[%s] ", level);
    vprintf(format, args); // the v* functions accept a va_list
    printf("\n");
    va_end(args);
}

int main(void) {
    printf("%d\n", sum(3, 10, 20, 30)); // 60
    printf("%d\n", sum(0)); // 0
    log_message("INFO", "user %s logged in %d times", "asha", 3);
    return 0;
}
