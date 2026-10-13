/*
 * if / else if / else, and switch.
 *  - switch works on INTEGER values (int, char, enum), not strings
 *  - each case falls through to the next unless you "break"
 */
#include <stdio.h>

static const char *grade(int marks) {
    if (marks >= 90) {
        return "A";
    } else if (marks >= 75) {
        return "B";
    } else if (marks >= 35) {
        return "C";
    }
    return "Fail";
}

static const char *day_type(int day) {
    switch (day) {
    case 1:
    case 7:
        return "weekend"; // two cases sharing one body
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
        return "weekday";
    default:
        return "invalid";
    }
}

int main(void) {
    printf("%s %s %s %s\n", grade(95), grade(80), grade(40), grade(10)); // A B C Fail
    printf("%s %s %s\n", day_type(7), day_type(3), day_type(9)); // weekend weekday invalid

    char op = '*';
    int a = 6, b = 3, result = 0;
    switch (op) {
    case '+':
        result = a + b;
        break;
    case '*':
        result = a * b;
        break; // without this, execution would continue into the next case
    default:
        printf("unknown operator\n");
    }
    printf("%d %c %d = %d\n", a, op, b, result); // 6 * 3 = 18
    return 0;
}
