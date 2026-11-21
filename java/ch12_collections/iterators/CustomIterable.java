package ch12_collections.iterators;

import java.util.Iterator;
import java.util.NoSuchElementException;

/*
Making your own class work with the for-each loop
  for (T item : obj)  works for arrays and for anything that implements Iterable<T>.
  Iterable<T> has one method: Iterator<T> iterator()
  Iterator<T> has hasNext() and next() (and optionally remove())
next() must throw NoSuchElementException when there are no more elements.
*/
public class CustomIterable {

    // A range of numbers: for (int i : new Range(1, 5, 2))
    record Range(int start, int end, int step) implements Iterable<Integer> {
        @Override
        public Iterator<Integer> iterator() {
            return new Iterator<>() {
                private int current = start;
                @Override public boolean hasNext() { return current < end; }
                @Override public Integer next() {
                    if (!hasNext()) throw new NoSuchElementException();
                    int value = current;
                    current += step;
                    return value;
                }
            };
        }
    }

    // A tiny linked list that is iterable
    static class MyLinkedList<T> implements Iterable<T> {
        private record Node<T>(T value, Node<T> next) {}
        private Node<T> head;

        void push(T value) { head = new Node<>(value, head); }

        @Override
        public Iterator<T> iterator() {
            return new Iterator<>() {
                private Node<T> node = head;
                @Override public boolean hasNext() { return node != null; }
                @Override public T next() {
                    if (node == null) throw new NoSuchElementException();
                    T value = node.value();
                    node = node.next();
                    return value;
                }
            };
        }
    }

    public static void main(String[] args) {
        for (int i : new Range(0, 10, 3)) System.out.print(i + " ");
        System.out.println();                         // 0 3 6 9

        MyLinkedList<String> list = new MyLinkedList<>();
        list.push("c");
        list.push("b");
        list.push("a");
        for (String s : list) System.out.print(s + " ");
        System.out.println();                         // a b c

        list.forEach(s -> System.out.print(s.toUpperCase()));   // Iterable gives forEach for free
        System.out.println();                         // ABC

        Iterator<Integer> it = new Range(0, 1, 1).iterator();
        it.next();
        try {
            it.next();
        } catch (NoSuchElementException e) {
            System.out.println("NoSuchElementException");   // NoSuchElementException
        }
    }
}
