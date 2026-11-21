package ch25_interview_questions.e_data_structures;

import java.util.Objects;

/*
"How does HashMap work internally?" - build a simple one.

  - an array of BUCKETS; each bucket holds a linked list of entries (key, value, next)
  - index = hash(key) & (capacity - 1)      (capacity is a power of two)
  - put: find the bucket, replace the value if an EQUAL key exists, else add an entry
  - get: find the bucket, walk the list comparing keys with equals()
  - when size > capacity * loadFactor (0.75), double the array and re-insert (rehash)
  - null key is allowed (stored in bucket 0)

The real java.util.HashMap also:
  - spreads the hash: h ^ (h >>> 16), so high bits affect the index
  - turns a long bucket list (8+ entries) into a red-black tree: worst case O(log n), not O(n)
  - is NOT thread-safe (use ConcurrentHashMap)
*/
public class MyHashMap<K, V> {

    private static class Entry<K, V> {
        final K key;
        V value;
        Entry<K, V> next;
        Entry(K key, V value, Entry<K, V> next) { this.key = key; this.value = value; this.next = next; }
    }

    private Entry<K, V>[] buckets;
    private int size;
    private static final float LOAD_FACTOR = 0.75f;

    @SuppressWarnings("unchecked")
    public MyHashMap() {
        buckets = (Entry<K, V>[]) new Entry[4];          // small, so the demo shows a resize
    }

    private int indexFor(Object key, int capacity) {
        int h = (key == null) ? 0 : key.hashCode();
        h ^= (h >>> 16);
        return h & (capacity - 1);
    }

    public V put(K key, V value) {
        int index = indexFor(key, buckets.length);
        for (Entry<K, V> e = buckets[index]; e != null; e = e.next) {
            if (Objects.equals(e.key, key)) {            // same key: replace the value
                V old = e.value;
                e.value = value;
                return old;
            }
        }
        buckets[index] = new Entry<>(key, value, buckets[index]);   // add at the head of the list
        if (++size > buckets.length * LOAD_FACTOR) resize();
        return null;
    }

    public V get(K key) {
        for (Entry<K, V> e = buckets[indexFor(key, buckets.length)]; e != null; e = e.next) {
            if (Objects.equals(e.key, key)) return e.value;
        }
        return null;
    }

    public V remove(K key) {
        int index = indexFor(key, buckets.length);
        Entry<K, V> prev = null;
        for (Entry<K, V> e = buckets[index]; e != null; prev = e, e = e.next) {
            if (Objects.equals(e.key, key)) {
                if (prev == null) buckets[index] = e.next;
                else prev.next = e.next;
                size--;
                return e.value;
            }
        }
        return null;
    }

    @SuppressWarnings("unchecked")
    private void resize() {
        Entry<K, V>[] old = buckets;
        buckets = (Entry<K, V>[]) new Entry[old.length * 2];
        for (Entry<K, V> head : old) {
            for (Entry<K, V> e = head; e != null; e = e.next) {
                int index = indexFor(e.key, buckets.length);
                buckets[index] = new Entry<>(e.key, e.value, buckets[index]);
            }
        }
        System.out.println("  (resized from " + old.length + " to " + buckets.length + " buckets)");
    }

    public int size() { return size; }
    public int capacity() { return buckets.length; }

    // A key whose hashCode always collides: every entry lands in the same bucket
    record BadKey(String name) {
        @Override public int hashCode() { return 42; }
    }

    public static void main(String[] args) {
        MyHashMap<String, Integer> map = new MyHashMap<>();
        map.put("one", 1);
        map.put("two", 2);
        map.put("three", 3);
        map.put("four", 4);                          //   (resized from 4 to 8 buckets)
        System.out.println(map.get("three") + " " + map.size() + " " + map.capacity());   // 3 4 8

        System.out.println(map.put("two", 22) + " -> " + map.get("two"));   // 2 -> 22   (put returns the old value)
        map.put(null, 0);
        System.out.println(map.get(null));           // 0
        System.out.println(map.remove("one") + " " + map.get("one") + " " + map.size());   // 1 null 4

        MyHashMap<BadKey, String> collisions = new MyHashMap<>();
        collisions.put(new BadKey("a"), "A");
        collisions.put(new BadKey("b"), "B");
        System.out.println(collisions.get(new BadKey("a")) + collisions.get(new BadKey("b")));   // AB   (equals() tells them apart)
    }
}
