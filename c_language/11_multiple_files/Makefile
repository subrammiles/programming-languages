# Builds the two .c files into one program.
#   make          ->  build/app
#   make run
# Only files that changed are recompiled: make compares timestamps.

BUILD  ?= build
CC     ?= cc
CFLAGS ?= -std=c17 -Wall -Wextra -Wpedantic -Werror -g -fsanitize=address,undefined

OBJS = $(BUILD)/main.o $(BUILD)/geometry.o

$(BUILD)/app: $(OBJS)
	$(CC) $(CFLAGS) $^ -lm -o $@

$(BUILD)/%.o: %.c geometry.h
	@mkdir -p $(BUILD)
	$(CC) $(CFLAGS) -c $< -o $@

.PHONY: run clean
run: $(BUILD)/app
	./$(BUILD)/app

clean:
	rm -rf $(BUILD)
