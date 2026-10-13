/*
 * Multi-dimensional arrays: arrays of arrays, stored row by row.
 */
#include <stdio.h>

#define ROWS 2
#define COLS 3

static void print_matrix(int m[][COLS], int rows) { // all sizes except the first are required
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < COLS; c++) {
            printf("%3d", m[r][c]);
        }
        printf("\n");
    }
}

int main(void) {
    int matrix[ROWS][COLS] = {{1, 2, 3}, {4, 5, 6}};
    print_matrix(matrix, ROWS);

    int transposed[COLS][ROWS];
    for (int r = 0; r < ROWS; r++)
        for (int c = 0; c < COLS; c++)
            transposed[c][r] = matrix[r][c];
    printf("transposed[2][1] = %d\n", transposed[2][1]); // 6

    char board[3][3] = {{'X', 'O', 'X'}, {' ', 'X', 'O'}, {'O', ' ', 'X'}};
    printf("diagonal: %c%c%c\n", board[0][0], board[1][1], board[2][2]); // XXX
    printf("sizeof matrix = %zu bytes\n", sizeof matrix); // 24
    return 0;
}
