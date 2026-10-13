/*
 * Stack (last in, first out) on an array, and a queue (first in, first out)
 * as a circular buffer: when the end is reached, wrap around to the start.
 */
#include <stdbool.h>
#include <stdio.h>

#define CAPACITY 4

typedef struct {
    int items[CAPACITY];
    int top;
} Stack;

static bool stack_push(Stack *s, int v) {
    if (s->top == CAPACITY) return false;
    s->items[s->top++] = v;
    return true;
}

static bool stack_pop(Stack *s, int *out) {
    if (s->top == 0) return false;
    *out = s->items[--s->top];
    return true;
}

typedef struct {
    int items[CAPACITY];
    int head, count;
} Queue;

static bool enqueue(Queue *q, int v) {
    if (q->count == CAPACITY) return false;
    q->items[(q->head + q->count) % CAPACITY] = v;
    q->count++;
    return true;
}

static bool dequeue(Queue *q, int *out) {
    if (q->count == 0) return false;
    *out = q->items[q->head];
    q->head = (q->head + 1) % CAPACITY;
    q->count--;
    return true;
}

int main(void) {
    Stack s = {0};
    for (int i = 1; i <= 5; i++) {
        if (!stack_push(&s, i)) printf("stack full, %d not pushed\n", i);
    }
    int v;
    while (stack_pop(&s, &v)) printf("pop %d\n", v); // 4 3 2 1

    Queue q = {0};
    enqueue(&q, 1);
    enqueue(&q, 2);
    dequeue(&q, &v);
    printf("dequeued %d\n", v); // 1
    for (int i = 3; i <= 5; i++) enqueue(&q, i); // wraps around the buffer
    while (dequeue(&q, &v)) printf("%d ", v); // 2 3 4 5
    printf("\n");
    return 0;
}
