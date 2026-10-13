/*
 * Pointers to structs: use -> to reach a field (p->x is (*p).x).
 * Pass large structs by pointer (const if read-only) to avoid copying them.
 * Opaque handles and "methods": functions that take a struct pointer as the first argument.
 */
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    char owner[32];
    double balance;
} Account;

static void deposit(Account *acc, double amount) {
    acc->balance += amount;
}

static int withdraw(Account *acc, double amount) {
    if (amount > acc->balance) return 0;
    acc->balance -= amount;
    return 1;
}

static void print_account(const Account *acc) {
    printf("%s: %.2f\n", acc->owner, acc->balance);
}

int main(void) {
    Account a = {"Asha", 100.0};
    deposit(&a, 50);
    printf("withdraw 500: %s\n", withdraw(&a, 500) ? "ok" : "insufficient funds");
    print_account(&a); // Asha: 150.00

    Account *heap = malloc(sizeof *heap); // a struct on the heap
    if (heap == NULL) return EXIT_FAILURE;
    *heap = (Account){"Ravi", 20.0};
    deposit(heap, 5.5);
    print_account(heap); // Ravi: 25.50
    free(heap);
    return 0;
}
