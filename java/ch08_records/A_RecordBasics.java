package ch08_records;

/*
Records (Java 16) - classes that just hold data.
   record Point(int x, int y) {}
gives you, automatically:
 - private final fields x and y
 - a constructor Point(int x, int y)
 - accessor methods x() and y()   (not getX())
 - equals(), hashCode() and toString()
Records are immutable and cannot extend another class (they can implement interfaces).
*/
public class A_RecordBasics {

    record Point(int x, int y) {}

    // The same thing written as a normal class:
    static final class PointClass {
        private final int x;
        private final int y;

        PointClass(int x, int y) { this.x = x; this.y = y; }

        int x() { return x; }
        int y() { return y; }

        @Override public boolean equals(Object o) {
            return o instanceof PointClass p && p.x == x && p.y == y;
        }
        @Override public int hashCode() { return java.util.Objects.hash(x, y); }
        @Override public String toString() { return "PointClass[x=" + x + ", y=" + y + "]"; }
    }

    public static void main(String[] args) {
        Point p1 = new Point(3, 4);
        Point p2 = new Point(3, 4);

        System.out.println(p1);             // Point[x=3, y=4]
        System.out.println(p1.x());         // 3
        System.out.println(p1.equals(p2));  // true  -> compares values
        System.out.println(p1 == p2);       // false -> different objects
        System.out.println(p1.hashCode() == p2.hashCode()); // true

        // p1.x = 10; // error: fields are final

        // To "change" a record, create a new one
        Point moved = new Point(p1.x() + 1, p1.y());
        System.out.println(moved); // Point[x=4, y=4]
    }
}
