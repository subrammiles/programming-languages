package ch12_collections.iterators;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

/*
Fail-fast vs fail-safe iterators, and removing items while looping
 - ArrayList, HashMap, HashSet... have FAIL-FAST iterators: if the collection is changed
   during iteration (except through the iterator itself), the next step throws
   ConcurrentModificationException. It happens in a single thread too!
 - Concurrent collections (CopyOnWriteArrayList, ConcurrentHashMap) are FAIL-SAFE /
   weakly consistent: no exception, the loop works on a snapshot or a live view.

Correct ways to remove while iterating:
  1. iterator.remove()
  2. collection.removeIf(predicate)      <- simplest
  3. loop over a copy, or build a new list (streams)
*/
public class FailFastIterators {

    public static void main(String[] args) {
        List<Integer> nums = new ArrayList<>(List.of(1, 2, 3, 4, 5, 6));

        try {
            for (Integer n : nums) {
                if (n % 2 == 0) nums.remove(n);       // modifies the list behind the iterator's back
            }
        } catch (java.util.ConcurrentModificationException e) {
            System.out.println("ConcurrentModificationException");   // ConcurrentModificationException
        }

        nums = new ArrayList<>(List.of(1, 2, 3, 4, 5, 6));
        Iterator<Integer> it = nums.iterator();
        while (it.hasNext()) {
            if (it.next() % 2 == 0) it.remove();      // 1. safe
        }
        System.out.println(nums);                     // [1, 3, 5]

        nums = new ArrayList<>(List.of(1, 2, 3, 4, 5, 6));
        nums.removeIf(n -> n % 2 == 0);               // 2. safe and short
        System.out.println(nums);                     // [1, 3, 5]

        // A classic bug with an index loop: elements are skipped after a removal
        List<Integer> twos = new ArrayList<>(List.of(2, 2, 3));
        for (int i = 0; i < twos.size(); i++) {
            if (twos.get(i) == 2) twos.remove(i);     // after removing index 0, the next 2 moves to index 0
        }
        System.out.println(twos);                     // [2, 3]   (one 2 survived!)

        // remove(int index) vs remove(Object)
        List<Integer> list = new ArrayList<>(List.of(10, 20, 30));
        list.remove(1);                               // removes INDEX 1
        list.remove(Integer.valueOf(10));             // removes the VALUE 10
        System.out.println(list);                     // [30]

        // Maps: removing during iteration
        Map<String, Integer> stock = new HashMap<>(Map.of("apple", 0, "pear", 4, "kiwi", 0));
        stock.entrySet().removeIf(e -> e.getValue() == 0);
        System.out.println(stock);                    // {pear=4}

        // Fail-safe collections
        List<String> safe = new CopyOnWriteArrayList<>(List.of("a", "b"));
        for (String s : safe) safe.add(s + "!");      // iterates over a snapshot: no exception
        System.out.println(safe);                     // [a, b, a!, b!]

        Map<String, Integer> concurrent = new ConcurrentHashMap<>(Map.of("x", 1));
        for (String key : concurrent.keySet()) concurrent.put(key + "2", 2);   // no exception
        System.out.println(concurrent.containsKey("x2"));   // true
    }
}
