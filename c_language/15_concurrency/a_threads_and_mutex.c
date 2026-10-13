/*
 * Threads with POSIX threads (pthreads), available on Linux and macOS.
 * (C11 also defines <threads.h> with thrd_create, mtx_lock ... but support varies.)
 *  pthread_create  start a thread running a function
 *  pthread_join    wait for it to finish
 *  pthread_mutex   only one thread at a time inside lock/unlock
 * A DATA RACE (two threads touching the same variable, one writing, unsynchronised)
 * is undefined behaviour. Compile with -fsanitize=thread to detect races.
 */
#include <pthread.h>
#include <stdio.h>

#define THREADS 4
#define INCREMENTS 100000

static long counter = 0;
static pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;

typedef struct {
    int id;
    long local_sum;
} WorkerArgs;

static void *worker(void *arg) {
    WorkerArgs *args = arg;
    for (int i = 0; i < INCREMENTS; i++) {
        pthread_mutex_lock(&lock);
        counter++;
        pthread_mutex_unlock(&lock);
        args->local_sum += i % 3;
    }
    return NULL;
}

int main(void) {
    pthread_t threads[THREADS];
    WorkerArgs args[THREADS];
    for (int i = 0; i < THREADS; i++) {
        args[i] = (WorkerArgs){.id = i, .local_sum = 0};
        if (pthread_create(&threads[i], NULL, worker, &args[i]) != 0) {
            perror("pthread_create");
            return 1;
        }
    }
    for (int i = 0; i < THREADS; i++) pthread_join(threads[i], NULL);

    printf("counter = %ld (expected %d)\n", counter, THREADS * INCREMENTS); // 400000
    printf("thread 0 local sum = %ld\n", args[0].local_sum); // each thread owns its own args: no lock needed
    return 0;
}
