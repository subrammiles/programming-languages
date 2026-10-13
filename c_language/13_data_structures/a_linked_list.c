/*
 * A singly linked list: nodes allocated on the heap, each pointing to the next.
 * Insert at the front is O(1); finding an element is O(n).
 * Passing Node ** lets functions change the caller's head pointer.
 */
#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int value;
    struct Node *next;
} Node;

static int push_front(Node **head, int value) {
    Node *n = malloc(sizeof *n);
    if (n == NULL) return 0;
    n->value = value;
    n->next = *head;
    *head = n;
    return 1;
}

static int remove_value(Node **head, int value) {
    for (Node **link = head; *link; link = &(*link)->next) {
        if ((*link)->value == value) {
            Node *dead = *link;
            *link = dead->next; // unlink
            free(dead);
            return 1;
        }
    }
    return 0;
}

static void reverse(Node **head) {
    Node *prev = NULL, *cur = *head;
    while (cur) {
        Node *next = cur->next;
        cur->next = prev;
        prev = cur;
        cur = next;
    }
    *head = prev;
}

static void print_list(const Node *n) {
    for (; n; n = n->next) printf("%d -> ", n->value);
    printf("NULL\n");
}

static void free_list(Node *n) {
    while (n) {
        Node *next = n->next;
        free(n);
        n = next;
    }
}

int main(void) {
    Node *head = NULL;
    for (int i = 1; i <= 4; i++) push_front(&head, i * 10);
    print_list(head); // 40 -> 30 -> 20 -> 10 -> NULL
    remove_value(&head, 30);
    print_list(head); // 40 -> 20 -> 10 -> NULL
    reverse(&head);
    print_list(head); // 10 -> 20 -> 40 -> NULL
    free_list(head);
    return 0;
}
