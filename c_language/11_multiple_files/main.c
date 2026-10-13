/*
 * A program split across files.
 * Build by hand:
 *   gcc -c geometry.c -o geometry.o      compile each .c file to an object file
 *   gcc -c main.c -o main.o
 *   gcc main.o geometry.o -lm -o app     link them into one program
 * or simply:  make   (see the Makefile in this folder)
 */
#include <stdio.h>

#include "geometry.h" // quotes: look in this folder first

int main(void) {
    Point a = {0, 0}, b = {3, 4};
    printf("distance = %.1f\n", distance(a, b)); // 5.0

    Point square[] = {{0, 0}, {2, 0}, {2, 2}, {0, 2}};
    printf("perimeter = %.1f\n", polygon_perimeter(square, 4)); // 8.0
    printf("distance() was called %d times\n", geometry_calls); // 5
    // square(2.0); // error: implicit declaration: the static helper isn't visible here
    return 0;
}
