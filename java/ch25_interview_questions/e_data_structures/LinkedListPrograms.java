package ch25_interview_questions.e_data_structures;

/*
Singly linked list programs (the most asked data-structure questions)
  - reverse a list (iterative and recursive)
  - find the middle node, detect a cycle, find the cycle start (slow / fast pointers)
  - find the n-th node from the end, merge two sorted lists, remove duplicates
*/
public class LinkedListPrograms {

    static class Node {
        int value;
        Node next;
        Node(int value) { this.value = value; }
    }

    static Node of(int... values) {
        Node dummy = new Node(0), tail = dummy;
        for (int v : values) tail = tail.next = new Node(v);
        return dummy.next;
    }

    static String str(Node head) {
        StringBuilder sb = new StringBuilder("[");
        for (Node n = head; n != null; n = n.next) sb.append(n.value).append(n.next != null ? " -> " : "");
        return sb.append("]").toString();
    }

    static Node reverse(Node head) {
        Node prev = null, current = head;
        while (current != null) {
            Node next = current.next;   // remember the rest
            current.next = prev;        // point backwards
            prev = current;
            current = next;
        }
        return prev;
    }

    static Node reverseRecursive(Node head) {
        if (head == null || head.next == null) return head;
        Node newHead = reverseRecursive(head.next);
        head.next.next = head;
        head.next = null;
        return newHead;
    }

    static Node middle(Node head) {
        Node slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;           // 1 step
            fast = fast.next.next;      // 2 steps
        }
        return slow;
    }

    static boolean hasCycle(Node head) {   // Floyd's tortoise and hare
        Node slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true;
        }
        return false;
    }

    static Node cycleStart(Node head) {
        Node slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {         // meeting point found; restart one pointer from head
                slow = head;
                while (slow != fast) {
                    slow = slow.next;
                    fast = fast.next;
                }
                return slow;
            }
        }
        return null;
    }

    static Node nthFromEnd(Node head, int n) {
        Node lead = head, follow = head;
        for (int i = 0; i < n; i++) lead = lead.next;   // move lead n steps ahead
        while (lead != null) {
            lead = lead.next;
            follow = follow.next;
        }
        return follow;
    }

    static Node mergeSorted(Node a, Node b) {
        Node dummy = new Node(0), tail = dummy;
        while (a != null && b != null) {
            if (a.value <= b.value) { tail.next = a; a = a.next; }
            else { tail.next = b; b = b.next; }
            tail = tail.next;
        }
        tail.next = (a != null) ? a : b;
        return dummy.next;
    }

    static Node removeDuplicatesSorted(Node head) {
        for (Node n = head; n != null && n.next != null; ) {
            if (n.value == n.next.value) n.next = n.next.next;
            else n = n.next;
        }
        return head;
    }

    public static void main(String[] args) {
        System.out.println(str(reverse(of(1, 2, 3, 4, 5))));            // [5 -> 4 -> 3 -> 2 -> 1]
        System.out.println(str(reverseRecursive(of(1, 2, 3))));         // [3 -> 2 -> 1]
        System.out.println(middle(of(1, 2, 3, 4, 5)).value + " " + middle(of(1, 2, 3, 4)).value);   // 3 3

        Node cyclic = of(1, 2, 3, 4, 5);
        cyclic.next.next.next.next.next = cyclic.next.next;             // 5 -> 3 creates a cycle
        System.out.println(hasCycle(cyclic) + " " + hasCycle(of(1, 2)));   // true false
        System.out.println(cycleStart(cyclic).value);                   // 3

        System.out.println(nthFromEnd(of(10, 20, 30, 40, 50), 2).value);   // 40
        System.out.println(str(mergeSorted(of(1, 3, 5), of(2, 4, 6))));    // [1 -> 2 -> 3 -> 4 -> 5 -> 6]
        System.out.println(str(removeDuplicatesSorted(of(1, 1, 2, 3, 3, 3))));   // [1 -> 2 -> 3]
    }
}
