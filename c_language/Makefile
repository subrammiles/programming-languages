# Build and run the C examples.
#
#   make                 build every example into build/
#   make run F=03_control_flow/b_loops.c    build and run one file
#   make check           build and run EVERYTHING (fails on the first error)
#   make clean
#
# Each .c file is a separate program, except 11_multiple_files (it has its own Makefile).
# Flags: strict warnings treated as errors, debug info, and the Address/UndefinedBehavior
# sanitizers, which stop the program on memory bugs and undefined behaviour.

CC       ?= cc
STD      ?= -std=c17
WARN      = -Wall -Wextra -Wpedantic -Werror -Wshadow -Wconversion -Wno-sign-conversion
SAN       = -fsanitize=address,undefined -fno-omit-frame-pointer
CFLAGS   ?= -g -O1
LDLIBS    = -lm -pthread

SRCS := $(shell find . -name '*.c' -not -path './build/*' -not -path './11_multiple_files/*' -not -path './17_modern_c/*' 2>/dev/null | sort)
C23_SRCS := $(shell find ./17_modern_c -name '*.c' 2>/dev/null | sort)
BINS := $(patsubst ./%.c,build/%,$(SRCS))
C23_BINS := $(patsubst ./%.c,build/%,$(C23_SRCS))

.PHONY: all run check clean
all: $(BINS) $(C23_BINS) build/11_multiple_files/app

build/%: %.c
	@mkdir -p $(dir $@)
	$(CC) $(STD) $(WARN) $(SAN) $(CFLAGS) $< -o $@ $(LDLIBS)

# C23 needs a recent compiler: gcc 13+ (-std=c2x) or gcc 14+ / clang 19+ (-std=c23)
C23_STD ?= -std=c2x
$(C23_BINS): build/%: %.c
	@mkdir -p $(dir $@)
	$(CC) $(C23_STD) $(WARN) $(SAN) $(CFLAGS) $< -o $@ $(LDLIBS)

build/11_multiple_files/app: $(wildcard 11_multiple_files/*.c 11_multiple_files/*.h)
	$(MAKE) -C 11_multiple_files BUILD=../build/11_multiple_files

run: build/$(basename $(F))
	./build/$(basename $(F))

check: all
	@set -e; for b in $(BINS) $(C23_BINS) build/11_multiple_files/app; do \
		echo "===== $$b"; (cd $$(dirname $$b) && ./$$(basename $$b)) </dev/null; done

clean:
	rm -rf build
