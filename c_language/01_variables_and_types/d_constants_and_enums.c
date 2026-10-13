/*
 * Constants
 *  const int x = 5;     a read-only variable
 *  #define MAX 100      a preprocessor macro: text replaced before compiling (chapter 10)
 *  enum { A, B, C }     named integer constants 0, 1, 2 ...
 * Literals: 42 (int), 42u (unsigned), 42L (long), 0x2A (hex), 052 (octal!), 'A' (char), 3.0 (double)
 */
#include <stdio.h>

#define MAX_USERS 100

enum Weekday { SUNDAY, MONDAY, TUESDAY }; // 0, 1, 2
enum Status { ACTIVE = 1, SUSPENDED = 5, DELETED }; // DELETED = 6

int main(void) {
    const double PI = 3.14159;
    // PI = 3; // error: assignment of read-only variable 'PI'
    printf("PI = %.5f, MAX_USERS = %d\n", PI, MAX_USERS);

    enum Weekday today = MONDAY;
    printf("today = %d, DELETED = %d\n", today, DELETED); // 1 6

    printf("hex 0x2A = %d, octal 052 = %d, char 'A' = %d\n", 0x2A, 052, 'A'); // 42 42 65
    printf("a leading 0 means octal: 010 = %d, not 10\n", 010); // 8
    return 0;
}
