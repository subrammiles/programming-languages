/*
 * A binary search tree: left subtree < node < right subtree.
 * Search, insert and delete are O(log n) when balanced (O(n) in the worst case).
 * In-order traversal visits values in sorted order.
 */
#include <stdio.h>
#include <stdlib.h>

typedef struct TreeNode {
    int key;
    struct TreeNode *left, *right;
} TreeNode;

static TreeNode *insert(TreeNode *root, int key) {
    if (root == NULL) {
        TreeNode *n = calloc(1, sizeof *n);
        if (n) n->key = key;
        return n;
    }
    if (key < root->key) root->left = insert(root->left, key);
    else if (key > root->key) root->right = insert(root->right, key);
    return root; // duplicates are ignored
}

static int contains(const TreeNode *root, int key) {
    while (root) {
        if (key == root->key) return 1;
        root = key < root->key ? root->left : root->right;
    }
    return 0;
}

static void in_order(const TreeNode *root) {
    if (!root) return;
    in_order(root->left);
    printf("%d ", root->key);
    in_order(root->right);
}

static int height(const TreeNode *root) {
    if (!root) return 0;
    int l = height(root->left), r = height(root->right);
    return 1 + (l > r ? l : r);
}

static void free_tree(TreeNode *root) {
    if (!root) return;
    free_tree(root->left);
    free_tree(root->right);
    free(root);
}

int main(void) {
    int keys[] = {50, 30, 70, 20, 40, 60, 80, 35};
    TreeNode *root = NULL;
    for (size_t i = 0; i < sizeof keys / sizeof keys[0]; i++) root = insert(root, keys[i]);

    in_order(root); // 20 30 35 40 50 60 70 80
    printf("\nheight %d, contains 60: %d, contains 65: %d\n", height(root), contains(root, 60), contains(root, 65)); // 4 1 0
    free_tree(root);
    return 0;
}
