/*
 * Conditional compilation: include or exclude code before compiling.
 *  #if / #elif / #else / #endif     #ifdef NAME / #ifndef NAME
 * Uses: debug-only code, platform differences, feature flags, include guards (chapter 11).
 * Define a name from the command line:  gcc -DVERBOSE file.c
 * Predefined macros: __FILE__ __LINE__ __func__ __DATE__ __STDC_VERSION__
 */
#include <stdio.h>

#ifndef VERBOSE
#define VERBOSE 0
#endif

#if defined(_WIN32)
#define PLATFORM "Windows"
#elif defined(__APPLE__)
#define PLATFORM "macOS"
#elif defined(__linux__)
#define PLATFORM "Linux"
#else
#define PLATFORM "unknown"
#endif

int main(void) {
    printf("platform: %s\n", PLATFORM);
    printf("C standard: %ld\n", __STDC_VERSION__); // 201710 for C17
    printf("in function %s at line %d\n", __func__, __LINE__);

#if VERBOSE
    printf("verbose mode is on\n");
#else
    printf("verbose mode is off (build with -DVERBOSE=1)\n");
#endif

#ifdef NDEBUG
    printf("NDEBUG is set: assert() is disabled\n");
#else
    printf("NDEBUG is not set: assert() is active\n");
#endif
    return 0;
}
