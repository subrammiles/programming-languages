package ch12_collections.modern;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.TreeSet;

/*
Sequenced collections (Java 21)
New interfaces for collections with a defined order:
 SequencedCollection: getFirst(), getLast(), addFirst(), addLast(), removeFirst(), removeLast(), reversed()
 SequencedMap:        firstEntry(), lastEntry(), pollFirstEntry(), putFirst(), reversed() ...
Before Java 21, getting the last element was different for every type:
 list.get(list.size() - 1), deque.getLast(), sortedSet.last(), and LinkedHashSet had no way at all.
*/
public class B_SequencedCollections {

    public static void main(String[] args) {
        List<String> list = new ArrayList<>(List.of("b", "c"));
        list.addFirst("a");
        list.addLast("d");
        System.out.println(list);             // [a, b, c, d]
        System.out.println(list.getFirst());  // a
        System.out.println(list.getLast());   // d
        System.out.println(list.reversed());  // [d, c, b, a]  (a view, not a copy)

        var set = new LinkedHashSet<>(List.of(3, 1, 2));
        System.out.println(set.getLast());    // 2  -> was impossible without iterating
        System.out.println(set.reversed());   // [2, 1, 3]

        var sorted = new TreeSet<>(List.of(30, 10, 20));
        System.out.println(sorted.getFirst() + " " + sorted.getLast()); // 10 30

        var map = new LinkedHashMap<String, Integer>();
        map.put("one", 1);
        map.put("two", 2);
        map.putFirst("zero", 0);
        System.out.println(map);               // {zero=0, one=1, two=2}
        System.out.println(map.lastEntry());   // two=2
        System.out.println(map.reversed());    // {two=2, one=1, zero=0}
    }
}
