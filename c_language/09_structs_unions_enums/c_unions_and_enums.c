/*
 * union: all members share the SAME memory; only one is valid at a time.
 *        Size = the largest member. Used for variants and saving memory.
 * A "tagged union" pairs an enum (which member is valid) with the union.
 */
#include <stdio.h>

typedef enum { SHAPE_CIRCLE, SHAPE_RECT } ShapeKind;

typedef struct {
    ShapeKind kind;
    union { // anonymous union (C11): members are accessed directly
        struct { double radius; } circle;
        struct { double width, height; } rect;
    };
} Shape;

static double area(const Shape *s) {
    switch (s->kind) {
    case SHAPE_CIRCLE:
        return 3.14159 * s->circle.radius * s->circle.radius;
    case SHAPE_RECT:
        return s->rect.width * s->rect.height;
    }
    return 0;
}

union Number {
    int i;
    float f;
    unsigned char bytes[4];
};

int main(void) {
    Shape shapes[] = {
        {.kind = SHAPE_CIRCLE, .circle = {1.0}},
        {.kind = SHAPE_RECT, .rect = {2.0, 3.0}},
    };
    for (int i = 0; i < 2; i++) printf("area %.2f\n", area(&shapes[i])); // 3.14 6.00

    union Number n;
    n.i = 1;
    printf("sizeof(union Number) = %zu\n", sizeof n); // 4
    printf("first byte of int 1: %u (1 = little-endian machine)\n", n.bytes[0]);
    return 0;
}
