/*
 * Every C program starts in main().
 *  #include <stdio.h>   brings in the declarations for printf (standard input/output)
 *  printf               prints formatted text; "\n" ends the line
 *  return 0             tells the operating system the program succeeded
 *
 * Compile and run by hand:
 *   gcc -Wall -Wextra hello_world.c -o hello_world
 *   ./hello_world
 * or with the project Makefile:
 *   make run F=00_getting_started/hello_world.c
 */
#include <stdio.h>

int main(void) {
    printf("Hello, World!\n");
    printf("%s is %d years old\n", "C", 2026 - 1972);
    return 0;
}
