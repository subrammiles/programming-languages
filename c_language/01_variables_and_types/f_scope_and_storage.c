/*
 * Scope and storage duration
 *  block scope:   variables inside { } exist only there
 *  file scope:    variables outside functions are global to the file
 *  static local:  keeps its value between calls (initialised once)
 *  static global: visible only in THIS file (see chapter 11)
 *  extern:        "defined in another file"
 */
#include <stdio.h>

int global_counter = 0; // file scope, lives for the whole program

int next_id(void) {
    static int id = 100; // initialised ONCE, remembered between calls
    return id++;
}

int main(void) {
    int x = 1;
    {
        int y = 2; // y exists only inside this block
        x += y;
        // Declaring another "int x" here would SHADOW (hide) the outer x.
        // That's legal C but a common bug source, so our Makefile's -Wshadow rejects it.
    }
    printf("x = %d\n", x); // 3
    // printf("%d", y); // error: 'y' undeclared -> out of scope

    for (int i = 0; i < 3; i++) { // i exists only inside the loop
        global_counter++;
    }
    printf("global_counter = %d\n", global_counter); // 3

    int a = next_id();
    int b = next_id();
    int c = next_id();
    printf("ids: %d %d %d\n", a, b, c); // 100 101 102
    return 0;
}
