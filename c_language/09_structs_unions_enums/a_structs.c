/*
 * A struct groups related values of different types.
 *  struct Point { int x; int y; };
 *  - access fields with .
 *  - structs CAN be assigned and passed by value (copied whole), unlike arrays
 *  - they can't be compared with ==; compare field by field
 */
#include <stdio.h>
#include <string.h>

struct Point {
    int x;
    int y;
};

struct Employee {
    char name[32];
    int age;
    double salary;
    struct Point desk; // structs can contain structs
};

static struct Point add(struct Point a, struct Point b) {
    return (struct Point){a.x + b.x, a.y + b.y}; // a compound literal (C99)
}

int main(void) {
    struct Point p = {3, 4};
    struct Point q = {.y = 10, .x = 1}; // designated initialisers
    struct Point r = add(p, q);
    printf("(%d, %d)\n", r.x, r.y); // (4, 14)

    struct Employee e = {"Asha", 30, 90000.0, {2, 5}};
    struct Employee copy = e; // copies every field, including the name array
    strcpy(copy.name, "Ravi");
    printf("%s %s, desk (%d,%d)\n", e.name, copy.name, e.desk.x, e.desk.y); // Asha Ravi, desk (2,5)

    struct Employee team[] = {{"Meena", 41, 60000, {0, 0}}, {"Kiran", 35, 55000, {0, 1}}};
    double total = 0;
    for (size_t i = 0; i < sizeof team / sizeof team[0]; i++) total += team[i].salary;
    printf("total salary %.0f\n", total); // 115000

    printf("sizeof(struct Point) = %zu\n", sizeof(struct Point)); // 8
    return 0;
}
