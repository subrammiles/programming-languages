package ch25_interview_questions.e_data_structures;

import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;
import java.util.EmptyStackException;

/*
Stack and queue questions
  - implement a stack with an array (with growth)
  - implement a queue using two stacks
  - min stack: getMin() in O(1)
  - evaluate a postfix expression
Real code: use ArrayDeque for both (the legacy Stack class is synchronized and slower).
*/
public class StackAndQueue {

    static class ArrayStack {
        private int[] data = new int[2];
        private int size;

        void push(int x) {
            if (size == data.length) data = Arrays.copyOf(data, size * 2);   // grow
            data[size++] = x;
        }
        int pop() {
            if (size == 0) throw new EmptyStackException();
            return data[--size];
        }
        int peek() {
            if (size == 0) throw new EmptyStackException();
            return data[size - 1];
        }
        boolean isEmpty() { return size == 0; }
    }

    // Queue with two stacks: amortised O(1) per operation
    static class TwoStackQueue {
        private final Deque<Integer> in = new ArrayDeque<>(), out = new ArrayDeque<>();
        void enqueue(int x) { in.push(x); }
        int dequeue() {
            if (out.isEmpty()) while (!in.isEmpty()) out.push(in.pop());   // reverse the order once
            return out.pop();
        }
    }

    // Min stack: a second stack remembers the minimum at each level
    static class MinStack {
        private final Deque<Integer> values = new ArrayDeque<>(), mins = new ArrayDeque<>();
        void push(int x) {
            values.push(x);
            mins.push(mins.isEmpty() ? x : Math.min(x, mins.peek()));
        }
        int pop() { mins.pop(); return values.pop(); }
        int min() { return mins.peek(); }
    }

    static int evalPostfix(String expression) {
        Deque<Integer> stack = new ArrayDeque<>();
        for (String token : expression.split(" ")) {
            switch (token) {
                case "+" -> stack.push(stack.pop() + stack.pop());
                case "*" -> stack.push(stack.pop() * stack.pop());
                case "-" -> { int b = stack.pop(), a = stack.pop(); stack.push(a - b); }
                case "/" -> { int b = stack.pop(), a = stack.pop(); stack.push(a / b); }
                default -> stack.push(Integer.parseInt(token));
            }
        }
        return stack.pop();
    }

    public static void main(String[] args) {
        ArrayStack stack = new ArrayStack();
        for (int i = 1; i <= 5; i++) stack.push(i);
        System.out.println(stack.pop() + " " + stack.pop() + " " + stack.peek());   // 5 4 3

        TwoStackQueue queue = new TwoStackQueue();
        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);
        System.out.println(queue.dequeue() + " " + queue.dequeue());               // 1 2
        queue.enqueue(4);
        System.out.println(queue.dequeue() + " " + queue.dequeue());               // 3 4

        MinStack minStack = new MinStack();
        minStack.push(5);
        minStack.push(2);
        minStack.push(8);
        System.out.println(minStack.min());                                        // 2
        minStack.pop();
        minStack.pop();
        System.out.println(minStack.min());                                        // 5

        System.out.println(evalPostfix("3 4 + 2 *") + " " + evalPostfix("10 2 8 * + 3 -"));   // 14 23
    }
}
