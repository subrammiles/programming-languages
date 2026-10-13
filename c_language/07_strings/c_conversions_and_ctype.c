/*
 * Converting strings and characters
 *  strtol / strtod   parse numbers WITH error checking (prefer them over atoi/atof)
 *  snprintf          numbers -> strings
 *  <ctype.h>         isdigit, isalpha, isspace, toupper, tolower (pass unsigned char values)
 */
#include <ctype.h>
#include <errno.h>
#include <stdio.h>
#include <stdlib.h>

static int parse_int(const char *s, long *out) {
    char *end;
    errno = 0;
    long v = strtol(s, &end, 10);
    if (end == s || *end != '\0' || errno == ERANGE) return 0; // nothing parsed, junk left, or overflow
    *out = v;
    return 1;
}

int main(void) {
    const char *inputs[] = {"42", "-7", "12abc", "", "99999999999999999999"};
    for (int i = 0; i < 5; i++) {
        long v;
        if (parse_int(inputs[i], &v)) printf("\"%s\" -> %ld\n", inputs[i], v);
        else printf("\"%s\" -> not a valid number\n", inputs[i]);
    }

    printf("atoi(\"12abc\") = %d (no way to know it failed)\n", atoi("12abc"));
    printf("strtod: %.2f\n", strtod("3.14159", NULL));

    char word[] = "Hello World 2026";
    int letters = 0, digits = 0;
    for (char *c = word; *c; c++) {
        unsigned char uc = (unsigned char)*c;
        if (isalpha(uc)) letters++;
        if (isdigit(uc)) digits++;
        *c = (char)toupper(uc);
    }
    printf("%s: %d letters, %d digits\n", word, letters, digits); // HELLO WORLD 2026: 10 letters, 4 digits
    return 0;
}
