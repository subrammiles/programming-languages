/*
 * Text files with <stdio.h>
 *  FILE *f = fopen(path, mode);   modes: "r" read, "w" write (truncates), "a" append, "r+" ...
 *  fprintf / fputs                write
 *  fgets / fscanf / fgetc         read
 *  fclose(f)                      always close (flushes buffered data)
 * fopen returns NULL on failure: check it, and use errno/perror for the reason.
 */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {
    const char *path = "notes.txt";

    FILE *f = fopen(path, "w");
    if (f == NULL) {
        perror("fopen");
        return EXIT_FAILURE;
    }
    fprintf(f, "line %d\n", 1);
    fputs("line 2\n", f);
    fprintf(f, "%s,%d,%.1f\n", "Asha", 30, 90.5);
    fclose(f);

    f = fopen(path, "a");
    if (f == NULL) return EXIT_FAILURE;
    fputs("appended line\n", f);
    fclose(f);

    f = fopen(path, "r");
    if (f == NULL) return EXIT_FAILURE;
    char line[128];
    int number = 0;
    while (fgets(line, sizeof line, f) != NULL) { // reads one line, including '\n'
        line[strcspn(line, "\n")] = '\0'; // strip the newline
        printf("%d: %s\n", ++number, line);
    }
    fclose(f);

    f = fopen(path, "r");
    if (f == NULL) return EXIT_FAILURE;
    char name[32];
    int age;
    double score;
    // skip two lines (checking the result: a short file returns NULL)
    if (fgets(line, sizeof line, f) && fgets(line, sizeof line, f) &&
        fscanf(f, "%31[^,],%d,%lf", name, &age, &score) == 3) { // %31 limits the length
        printf("parsed: %s is %d with %.1f\n", name, age, score);
    }
    fclose(f);

    remove(path);
    return 0;
}
