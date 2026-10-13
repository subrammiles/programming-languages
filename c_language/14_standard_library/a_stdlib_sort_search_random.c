/*
 * <stdlib.h> highlights
 *  qsort / bsearch   generic sorting and binary search with a comparison callback
 *  rand / srand      simple pseudo-random numbers (NOT for security)
 *  abs, div, exit, getenv, atexit
 */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    const char *name;
    int age;
} Person;

static int by_age(const void *a, const void *b) {
    const Person *x = a, *y = b;
    return (x->age > y->age) - (x->age < y->age);
}

static int by_name(const void *a, const void *b) {
    return strcmp(((const Person *)a)->name, ((const Person *)b)->name);
}

static void goodbye(void) {
    printf("atexit handler: goodbye\n");
}

int main(void) {
    atexit(goodbye);

    Person people[] = {{"Ravi", 25}, {"Asha", 30}, {"Meena", 22}};
    qsort(people, 3, sizeof people[0], by_age);
    for (int i = 0; i < 3; i++) printf("%s(%d) ", people[i].name, people[i].age); // Meena(22) Ravi(25) Asha(30)
    printf("\n");

    qsort(people, 3, sizeof people[0], by_name);
    Person key = {"Meena", 0};
    Person *found = bsearch(&key, people, 3, sizeof people[0], by_name); // needs sorted data
    printf("found %s, age %d\n", found ? found->name : "nobody", found ? found->age : 0);

    srand(42); // fixed seed: the same sequence every run
    printf("dice: %d %d %d\n", rand() % 6 + 1, rand() % 6 + 1, rand() % 6 + 1);

    div_t d = div(17, 5);
    printf("17 / 5 = %d remainder %d, abs(-9) = %d\n", d.quot, d.rem, abs(-9));
    const char *home = getenv("HOME");
    printf("HOME is %s\n", home ? "set" : "not set");
    return 0;
}
