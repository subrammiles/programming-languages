package ch25_interview_questions.e_data_structures;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

/*
LRU (Least Recently Used) cache: fixed capacity; when full, evict the entry used longest ago.
get and put must be O(1).

Version 1: LinkedHashMap with accessOrder = true + removeEldestEntry  (the "know your JDK" answer)
Version 2: HashMap + doubly linked list                                (the "build it" answer)
  - the map finds a node in O(1)
  - the list keeps usage order: most recent at the head, least recent at the tail
*/
public class LRUCache {

    static class LinkedHashMapLru<K, V> extends LinkedHashMap<K, V> {
        private final int capacity;
        LinkedHashMapLru(int capacity) {
            super(16, 0.75f, true);                  // true = order by ACCESS, not insertion
            this.capacity = capacity;
        }
        @Override
        protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
            return size() > capacity;                // called after every put
        }
    }

    static class ManualLru<K, V> {
        private class Node {
            K key;
            V value;
            Node prev, next;
            Node(K key, V value) { this.key = key; this.value = value; }
        }

        private final int capacity;
        private final Map<K, Node> map = new HashMap<>();
        private final Node head = new Node(null, null), tail = new Node(null, null);   // sentinels

        ManualLru(int capacity) {
            this.capacity = capacity;
            head.next = tail;
            tail.prev = head;
        }

        V get(K key) {
            Node node = map.get(key);
            if (node == null) return null;
            moveToFront(node);
            return node.value;
        }

        void put(K key, V value) {
            Node node = map.get(key);
            if (node != null) {
                node.value = value;
                moveToFront(node);
                return;
            }
            if (map.size() == capacity) {
                Node lru = tail.prev;                // least recently used
                unlink(lru);
                map.remove(lru.key);
            }
            node = new Node(key, value);
            map.put(key, node);
            addAfterHead(node);
        }

        private void moveToFront(Node n) { unlink(n); addAfterHead(n); }
        private void unlink(Node n) { n.prev.next = n.next; n.next.prev = n.prev; }
        private void addAfterHead(Node n) {
            n.next = head.next;
            n.prev = head;
            head.next.prev = n;
            head.next = n;
        }

        @Override public String toString() {          // most recent first
            StringBuilder sb = new StringBuilder("[");
            for (Node n = head.next; n != tail; n = n.next) sb.append(n.key).append(n.next != tail ? ", " : "");
            return sb.append("]").toString();
        }
    }

    public static void main(String[] args) {
        LinkedHashMapLru<String, Integer> cache = new LinkedHashMapLru<>(3);
        cache.put("a", 1);
        cache.put("b", 2);
        cache.put("c", 3);
        cache.get("a");                              // a becomes most recent
        cache.put("d", 4);                           // evicts b (least recently used)
        System.out.println(cache.keySet());          // [c, a, d]   (least -> most recent)

        ManualLru<String, Integer> manual = new ManualLru<>(3);
        manual.put("a", 1);
        manual.put("b", 2);
        manual.put("c", 3);
        manual.get("a");
        manual.put("d", 4);
        System.out.println(manual);                  // [d, a, c]   (most -> least recent)
        System.out.println(manual.get("b"));         // null
        manual.put("c", 30);
        System.out.println(manual + " " + manual.get("c"));   // [c, d, a] 30
    }
}
