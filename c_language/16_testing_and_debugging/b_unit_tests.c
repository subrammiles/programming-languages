/*
 * A tiny unit-test "framework" in a few macros, enough for small projects.
 * Real projects use Unity, CMocka, Check or Criterion, and CTest to run them.
 */
#include <stdio.h>
#include <string.h>

static int tests_run = 0, tests_failed = 0;

#define CHECK(cond) do { \
    tests_run++; \
    if (!(cond)) { tests_failed++; printf("  FAIL %s:%d: %s\n", __FILE__, __LINE__, #cond); } \
} while (0)

#define CHECK_EQ_INT(expected, actual) do { \
    long e_ = (long)(expected), a_ = (long)(actual); \
    tests_run++; \
    if (e_ != a_) { tests_failed++; printf("  FAIL %s:%d: expected %ld, got %ld\n", __FILE__, __LINE__, e_, a_); } \
} while (0)

// --- code under test ---
static int clamp(int v, int lo, int hi) { return v < lo ? lo : v > hi ? hi : v; }

static void reverse_string(char *s) {
    size_t n = strlen(s);
    for (size_t i = 0; i < n / 2; i++) {
        char t = s[i];
        s[i] = s[n - 1 - i];
        s[n - 1 - i] = t;
    }
}

// --- tests ---
static void test_clamp(void) {
    CHECK_EQ_INT(5, clamp(5, 0, 10));
    CHECK_EQ_INT(0, clamp(-3, 0, 10));
    CHECK_EQ_INT(10, clamp(99, 0, 10));
}

static void test_reverse(void) {
    char a[] = "abc", b[] = "", c[] = "ab";
    reverse_string(a);
    reverse_string(b);
    reverse_string(c);
    CHECK(strcmp(a, "cba") == 0);
    CHECK(strcmp(b, "") == 0);
    CHECK(strcmp(c, "ba") == 0);
}

int main(void) {
    test_clamp();
    test_reverse();
    printf("%d tests, %d failed\n", tests_run, tests_failed); // 6 tests, 0 failed
    return tests_failed == 0 ? 0 : 1; // a non-zero exit code fails a CI build
}
