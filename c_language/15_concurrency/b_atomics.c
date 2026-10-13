/*
 * C11 atomics (<stdatomic.h>): lock-free operations on single variables.
 * Faster than a mutex for simple counters and flags.
 */
#include <pthread.h>
#include <stdatomic.h>
#include <stdbool.h>
#include <stdio.h>

static atomic_long hits = 0;
static atomic_bool ready = false;

static void *worker(void *arg) {
    (void)arg;
    for (int i = 0; i < 100000; i++) atomic_fetch_add(&hits, 1);
    return NULL;
}

int main(void) {
    pthread_t t[4];
    for (int i = 0; i < 4; i++) pthread_create(&t[i], NULL, worker, NULL);
    for (int i = 0; i < 4; i++) pthread_join(t[i], NULL);
    printf("hits = %ld\n", atomic_load(&hits)); // 400000

    bool expected = false;
    printf("first claim: %d\n", atomic_compare_exchange_strong(&ready, &expected, true)); // 1
    expected = false;
    printf("second claim: %d\n", atomic_compare_exchange_strong(&ready, &expected, true)); // 0
    return 0;
}
