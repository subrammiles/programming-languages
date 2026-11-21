package ch25_interview_questions.e_data_structures;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.List;
import java.util.Queue;

/*
Binary search tree: for every node, left subtree < node < right subtree.
Search / insert / delete are O(log n) when balanced, O(n) when it degenerates into a line.
(TreeMap / TreeSet use a self-balancing red-black tree.)

Traversals:
  in-order    left, node, right   -> sorted order
  pre-order   node, left, right   -> copy / serialise a tree
  post-order  left, right, node   -> delete a tree
  level-order breadth-first, with a queue
*/
public class BinarySearchTree {

    static class Node {
        int value;
        Node left, right;
        Node(int value) { this.value = value; }
    }

    Node root;

    void insert(int value) { root = insert(root, value); }
    private Node insert(Node node, int value) {
        if (node == null) return new Node(value);
        if (value < node.value) node.left = insert(node.left, value);
        else if (value > node.value) node.right = insert(node.right, value);
        return node;                                    // duplicates are ignored
    }

    boolean contains(int value) {
        Node n = root;
        while (n != null) {
            if (value == n.value) return true;
            n = value < n.value ? n.left : n.right;
        }
        return false;
    }

    void delete(int value) { root = delete(root, value); }
    private Node delete(Node node, int value) {
        if (node == null) return null;
        if (value < node.value) node.left = delete(node.left, value);
        else if (value > node.value) node.right = delete(node.right, value);
        else {
            if (node.left == null) return node.right;   // 0 or 1 child
            if (node.right == null) return node.left;
            Node successor = node.right;                 // 2 children: use the smallest value on the right
            while (successor.left != null) successor = successor.left;
            node.value = successor.value;
            node.right = delete(node.right, successor.value);
        }
        return node;
    }

    static void inOrder(Node n, List<Integer> out) {
        if (n == null) return;
        inOrder(n.left, out);
        out.add(n.value);
        inOrder(n.right, out);
    }

    static void preOrder(Node n, List<Integer> out) {
        if (n == null) return;
        out.add(n.value);
        preOrder(n.left, out);
        preOrder(n.right, out);
    }

    static List<Integer> levelOrder(Node root) {
        List<Integer> out = new ArrayList<>();
        Queue<Node> queue = new ArrayDeque<>();
        if (root != null) queue.add(root);
        while (!queue.isEmpty()) {
            Node n = queue.poll();
            out.add(n.value);
            if (n.left != null) queue.add(n.left);
            if (n.right != null) queue.add(n.right);
        }
        return out;
    }

    static int height(Node n) {
        return n == null ? 0 : 1 + Math.max(height(n.left), height(n.right));
    }

    static boolean isValidBst(Node n, long min, long max) {
        if (n == null) return true;
        if (n.value <= min || n.value >= max) return false;
        return isValidBst(n.left, min, n.value) && isValidBst(n.right, n.value, max);
    }

    static Node lowestCommonAncestor(Node n, int a, int b) {
        while (n != null) {
            if (a < n.value && b < n.value) n = n.left;
            else if (a > n.value && b > n.value) n = n.right;
            else return n;                               // the paths split here
        }
        return null;
    }

    static Node mirror(Node n) {
        if (n == null) return null;
        Node tmp = n.left;
        n.left = mirror(n.right);
        n.right = mirror(tmp);
        return n;
    }

    public static void main(String[] args) {
        //         8
        //       /   \
        //      3     10
        //     / \      \
        //    1   6      14
        //       / \    /
        //      4   7  13
        BinarySearchTree tree = new BinarySearchTree();
        for (int v : new int[] {8, 3, 10, 1, 6, 14, 4, 7, 13}) tree.insert(v);

        List<Integer> in = new ArrayList<>(), pre = new ArrayList<>();
        inOrder(tree.root, in);
        preOrder(tree.root, pre);
        System.out.println(in);                                   // [1, 3, 4, 6, 7, 8, 10, 13, 14]
        System.out.println(pre);                                  // [8, 3, 1, 6, 4, 7, 10, 14, 13]
        System.out.println(levelOrder(tree.root));                // [8, 3, 10, 1, 6, 14, 4, 7, 13]
        System.out.println(height(tree.root));                    // 4
        System.out.println(tree.contains(6) + " " + tree.contains(5));   // true false
        System.out.println(isValidBst(tree.root, Long.MIN_VALUE, Long.MAX_VALUE));   // true
        System.out.println(lowestCommonAncestor(tree.root, 4, 7).value + " " + lowestCommonAncestor(tree.root, 4, 13).value);   // 6 8

        tree.delete(3);                                           // a node with two children
        List<Integer> afterDelete = new ArrayList<>();
        inOrder(tree.root, afterDelete);
        System.out.println(afterDelete + " root.left=" + tree.root.left.value);   // [1, 4, 6, 7, 8, 10, 13, 14] root.left=4

        mirror(tree.root);
        List<Integer> mirrored = new ArrayList<>();
        inOrder(tree.root, mirrored);
        System.out.println(mirrored);                             // [14, 13, 10, 8, 7, 6, 4, 1]
    }
}
