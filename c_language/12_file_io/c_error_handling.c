/*
 * C has no exceptions. Functions report errors through return values, and many set
 * the global errno to say why.  strerror(errno) / perror() turn it into text.
 * Pattern: check every call that can fail, clean up, and return an error code.
 */
#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef enum { OK = 0, ERR_OPEN, ERR_READ, ERR_EMPTY } Status;

static const char *status_text(Status s) {
    switch (s) {
    case OK: return "ok";
    case ERR_OPEN: return "could not open file";
    case ERR_READ: return "could not read file";
    case ERR_EMPTY: return "file is empty";
    }
    return "unknown";
}

static Status count_lines(const char *path, int *out) {
    FILE *f = fopen(path, "r");
    if (f == NULL) return ERR_OPEN;
    int lines = 0, c;
    while ((c = fgetc(f)) != EOF) {
        if (c == '\n') lines++;
    }
    Status s = ferror(f) ? ERR_READ : (lines == 0 ? ERR_EMPTY : OK);
    fclose(f);
    *out = lines;
    return s;
}

int main(void) {
    FILE *f = fopen("/no/such/dir/file.txt", "r");
    if (f == NULL) {
        printf("errno %d: %s\n", errno, strerror(errno)); // No such file or directory
        perror("fopen"); // prints to stderr: fopen: No such file or directory
    }

    int lines = 0;
    Status s = count_lines(__FILE__, &lines); // this source file
    printf("count_lines(this file): %s, %d lines\n", status_text(s), lines);
    s = count_lines("missing.txt", &lines);
    printf("count_lines(missing.txt): %s\n", status_text(s));
    return s == ERR_OPEN ? EXIT_SUCCESS : EXIT_FAILURE; // the failure above was expected
}
