/*
 * The implementation: DEFINITIONS of what geometry.h declares.
 * "static" keeps a helper private to this file.
 */
#include "geometry.h"

#include <math.h>

int geometry_calls = 0;

static double square(double v) {
    return v * v;
}

double distance(Point a, Point b) {
    geometry_calls++;
    return sqrt(square(b.x - a.x) + square(b.y - a.y));
}

double polygon_perimeter(const Point *points, int count) {
    double total = 0;
    for (int i = 0; i < count; i++) {
        total += distance(points[i], points[(i + 1) % count]);
    }
    return total;
}
