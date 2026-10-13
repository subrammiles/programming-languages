/*
 * A C string is an array of char ending with a NUL character '\0'.
 *  char s[] = "hi";           3 bytes: 'h' 'i' '\0'  (a modifiable copy)
 *  const char *p = "hi";      points to a read-only string literal
 * strlen counts characters BEFORE the '\0'; sizeof counts the whole array.
 */
#include <stdio.h>
#include <string.h>

int main(void) {
    char greeting[] = "Hello";
    printf("%s has strlen %zu but sizeof %zu\n", greeting, strlen(greeting), sizeof greeting); // 5 6

    greeting[0] = 'J'; // arrays can be changed
    printf("%s\n", greeting); // Jello

    const char *literal = "World";
    // literal[0] = 'w'; // undefined behaviour: string literals are read-only
    printf("%c%c%c\n", literal[0], literal[1], literal[4]); // Wod

    for (const char *c = literal; *c != '\0'; c++) { // walk until the terminator
        putchar(*c);
        putchar(' ');
    }
    putchar('\n');

    char name[20];
    snprintf(name, sizeof name, "%s-%d", "user", 42); // build a string safely
    printf("%s\n", name); // user-42
    return 0;
}
