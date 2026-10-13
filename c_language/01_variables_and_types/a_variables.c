/*
 * Variables: declare the type, then the name.
 *  - C is statically typed: a variable's type never changes
 *  - a LOCAL variable without an initial value contains garbage: always initialise
 *  - names: letters, digits and _; can't start with a digit; case-sensitive
 */
#include <stdio.h>

int main(void) {
    int age = 30;
    double price = 19.99;
    char grade = 'A'; // a single character, in single quotes
    const char *name = "Subbu"; // a string (see chapter 07)

    printf("%s is %d, grade %c, paid %.2f\n", name, age, grade, price);

    int a = 1, b = 2, c; // several at once (c is uninitialised: don't read it yet)
    c = a + b;
    printf("a + b = %d\n", c); // 3

    age = age + 1; // assignment
    age += 1; // the same, shorter
    printf("age is now %d\n", age); // 32
    return 0;
}
