/*
 * A header file holds DECLARATIONS shared between .c files:
 * types, function prototypes, constants and extern variables.
 * The include guard (#ifndef ... #define ... #endif) stops the contents being
 * pasted twice if the header is included more than once. (#pragma once also works.)
 */
#ifndef GEOMETRY_H
#define GEOMETRY_H

typedef struct {
    double x, y;
} Point;

double distance(Point a, Point b);
double polygon_perimeter(const Point *points, int count);

extern int geometry_calls; // DEFINED in geometry.c, usable from any file that includes this

#endif
