/*
 * Binary files: write the raw bytes of values with fwrite, read them back with fread.
 * Fast and compact, but NOT portable between machines with different sizes or byte order.
 * fseek / ftell move around in a file.
 */
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int id;
    double price;
    char name[16];
} Product;

int main(void) {
    Product products[] = {{1, 10.5, "pen"}, {2, 250.0, "book"}, {3, 900.0, "bag"}};
    const char *path = "products.bin";

    FILE *f = fopen(path, "wb");
    if (f == NULL) return EXIT_FAILURE;
    size_t written = fwrite(products, sizeof products[0], 3, f);
    fclose(f);
    printf("wrote %zu records\n", written);

    f = fopen(path, "rb");
    if (f == NULL) return EXIT_FAILURE;
    fseek(f, 0, SEEK_END);
    long size = ftell(f);
    printf("file size: %ld bytes (%zu per record)\n", size, sizeof(Product));

    Product third;
    fseek(f, 2 * (long)sizeof(Product), SEEK_SET); // jump straight to record 3
    if (fread(&third, sizeof third, 1, f) == 1) {
        printf("record 3: %d %s %.2f\n", third.id, third.name, third.price); // 3 bag 900.00
    }
    fclose(f);
    remove(path);
    return 0;
}
