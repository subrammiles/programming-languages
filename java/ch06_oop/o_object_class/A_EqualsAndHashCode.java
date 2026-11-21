package ch06_oop.o_object_class;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Objects;
import java.util.Set;

/*
equals() and hashCode() - every class inherits them from java.lang.Object.
  ==        compares REFERENCES (same object in memory?)
  equals()  compares CONTENTS - but Object's default equals() is just ==, so override it

The contract (one of the most asked Java interview topics):
  1. if a.equals(b) then a.hashCode() == b.hashCode()      <- override BOTH or neither
  2. equal hash codes do NOT mean the objects are equal (collisions are allowed)
  3. equals must be reflexive, symmetric, transitive, consistent, and x.equals(null) == false

Why it matters: HashMap / HashSet first use hashCode() to find the bucket,
then equals() to find the key inside it. Break the contract and lookups fail silently.
(Records generate correct equals/hashCode for you - see ch08_records.)
*/
public class A_EqualsAndHashCode {

    // 1. No overrides: equality is identity
    static class PlainPoint {
        final int x, y;
        PlainPoint(int x, int y) { this.x = x; this.y = y; }
    }

    // 2. equals overridden but hashCode forgotten: broken in hash collections
    static class HalfPoint {
        final int x, y;
        HalfPoint(int x, int y) { this.x = x; this.y = y; }
        @Override public boolean equals(Object o) {
            return o instanceof HalfPoint p && p.x == x && p.y == y;
        }
    }

    // 3. Correct
    static final class Point {
        private final int x, y;
        Point(int x, int y) { this.x = x; this.y = y; }

        @Override public boolean equals(Object o) {
            if (this == o) return true;                       // same object: fast path
            if (!(o instanceof Point other)) return false;    // also handles null
            return x == other.x && y == other.y;
        }
        @Override public int hashCode() {
            return Objects.hash(x, y);                        // combine the SAME fields used in equals
        }
        @Override public String toString() { return "(" + x + "," + y + ")"; }
    }

    // 4. A mutable key whose hash changes after insertion gets "lost" in the map
    static class MutableKey {
        String name;
        MutableKey(String name) { this.name = name; }
        @Override public boolean equals(Object o) { return o instanceof MutableKey k && k.name.equals(name); }
        @Override public int hashCode() { return name.hashCode(); }
    }

    public static void main(String[] args) {
        System.out.println(new PlainPoint(1, 2).equals(new PlainPoint(1, 2)));   // false

        Set<HalfPoint> halfSet = new HashSet<>();
        halfSet.add(new HalfPoint(1, 2));
        System.out.println(new HalfPoint(1, 2).equals(new HalfPoint(1, 2)));     // true
        System.out.println(halfSet.contains(new HalfPoint(1, 2)));               // false   (different hash -> wrong bucket)

        Point a = new Point(1, 2), b = new Point(1, 2);
        System.out.println((a == b) + " " + a.equals(b));                        // false true
        System.out.println(a.hashCode() == b.hashCode());                        // true
        Set<Point> points = new HashSet<>(Set.of(a));
        System.out.println(points.contains(b));                                  // true
        System.out.println(a.equals(null));                                      // false

        MutableKey key = new MutableKey("alice");
        Map<MutableKey, Integer> ages = new HashMap<>();
        ages.put(key, 30);
        key.name = "bob";                                                        // hash changes!
        System.out.println(ages.get(key) + " " + ages.size());                   // null 1   (the entry is stranded)
        // Lesson: use immutable objects (String, Integer, records) as map keys.

        // Hash collisions are legal: different strings, same hash code
        System.out.println("Aa".hashCode() + " " + "BB".hashCode() + " " + "Aa".equals("BB"));   // 2112 2112 false
    }
}
