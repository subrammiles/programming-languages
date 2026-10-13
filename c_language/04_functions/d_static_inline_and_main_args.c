/*
 *  static function   visible only in this file
 *  inline            a hint to expand the body at the call site
 *  main(argc, argv)  command-line arguments: argv[0] is the program name
 *  return value of main / exit()   0 = success, non-zero = failure
 * Try: ./build/04_functions/d_static_inline_and_main_args hello world
 */
#include <stdio.h>
#include <stdlib.h>

static inline int square(int x) {
    return x * x;
}

int main(int argc, char *argv[]) {
    printf("square(7) = %d\n", square(7));
    printf("argc = %d\n", argc);
    for (int i = 0; i < argc; i++) {
        printf("argv[%d] = %s\n", i, argv[i]);
    }
    return EXIT_SUCCESS; // or EXIT_FAILURE
}
