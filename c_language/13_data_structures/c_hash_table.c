/*
 * A hash table (string -> int) with separate chaining:
 *  hash the key to pick a bucket; each bucket is a linked list of entries.
 * Average O(1) lookups. Real tables also resize when they get too full.
 */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define BUCKETS 16

typedef struct Entry {
    char *key;
    int value;
    struct Entry *next;
} Entry;

typedef struct {
    Entry *buckets[BUCKETS];
} Table;

static unsigned long hash(const char *s) { // djb2, a simple well-known string hash
    unsigned long h = 5381;
    for (; *s; s++) h = h * 33 + (unsigned char)*s;
    return h;
}

static Entry *find(Table *t, const char *key) {
    for (Entry *e = t->buckets[hash(key) % BUCKETS]; e; e = e->next) {
        if (strcmp(e->key, key) == 0) return e;
    }
    return NULL;
}

static int put(Table *t, const char *key, int value) {
    Entry *e = find(t, key);
    if (e) {
        e->value = value;
        return 1;
    }
    e = malloc(sizeof *e);
    if (e == NULL) return 0;
    size_t len = strlen(key) + 1;
    e->key = malloc(len);
    if (e->key == NULL) {
        free(e);
        return 0;
    }
    memcpy(e->key, key, len);
    e->value = value;
    size_t b = hash(key) % BUCKETS;
    e->next = t->buckets[b];
    t->buckets[b] = e;
    return 1;
}

static void free_table(Table *t) {
    for (int b = 0; b < BUCKETS; b++) {
        for (Entry *e = t->buckets[b]; e;) {
            Entry *next = e->next;
            free(e->key);
            free(e);
            e = next;
        }
    }
}

int main(void) {
    Table t = {0};
    char text[] = "the cat and the hat and the bat";
    for (char *w = strtok(text, " "); w; w = strtok(NULL, " ")) {
        Entry *e = find(&t, w);
        put(&t, w, e ? e->value + 1 : 1);
    }
    const char *words[] = {"the", "and", "cat", "dog"};
    for (int i = 0; i < 4; i++) {
        Entry *e = find(&t, words[i]);
        printf("%s: %d\n", words[i], e ? e->value : 0); // the: 3, and: 2, cat: 1, dog: 0
    }
    free_table(&t);
    return 0;
}
