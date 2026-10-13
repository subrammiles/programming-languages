/*
 * <string.h> essentials
 *  strlen  length        strcmp   compare (0 = equal)   strncmp  first n chars
 *  strchr  find a char   strstr   find a substring      strtok   split (modifies the string!)
 *  memcpy / memmove / memset   raw byte operations
 * Copying and joining: strcpy/strcat don't check sizes. Prefer snprintf, or check lengths.
 */
#include <stdio.h>
#include <string.h>

int main(int argc, char *argv[]) {
    (void)argv;
    printf("strcmp: %d %d %d\n", strcmp("apple", "apple") == 0, strcmp("apple", "banana") < 0, strncmp("hello", "help", 3) == 0); // 1 1 1

    const char *text = "The quick brown fox";
    const char *found = strstr(text, "brown");
    printf("found \"%s\" at index %td\n", found, found - text); // brown fox, 10
    printf("first 'q' at %td\n", strchr(text, 'q') - text); // 4

    char buffer[16];
    const char *who = argc > 99 ? "you" : "everybody!"; // known only at run time
    // With two string LITERALS gcc sees the truncation at compile time (-Wformat-truncation).
    int needed = snprintf(buffer, sizeof buffer, "%s %s", "Hello", who);
    printf("\"%s\" (needed %d chars, buffer holds 15)\n", buffer, needed); // truncated safely

    char csv[] = "red,green,,blue";
    for (char *tok = strtok(csv, ","); tok != NULL; tok = strtok(NULL, ",")) {
        printf("[%s] ", tok); // [red] [green] [blue]  (empty fields are skipped)
    }
    printf("\n");

    char block[8];
    memset(block, '-', sizeof block - 1);
    block[7] = '\0';
    printf("%s\n", block); // -------
    return 0;
}
