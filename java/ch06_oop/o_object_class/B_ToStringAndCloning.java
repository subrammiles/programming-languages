package ch06_oop.o_object_class;

import java.util.ArrayList;
import java.util.List;

/*
toString(), and copying objects: clone() vs copy constructors

toString(): Object's default prints ClassName@hexHashCode, which is useless. Override it.

clone():
 - the class must implement Cloneable (a marker interface), or Object.clone() throws
   CloneNotSupportedException
 - Object.clone() makes a SHALLOW copy: fields are copied, but referenced objects
   (lists, arrays, other objects) are SHARED between original and copy
 - for a DEEP copy you must copy those referenced objects yourself
Effective Java advice: prefer a copy constructor or a static factory over clone().
*/
public class B_ToStringAndCloning {

    static class NoToString {
        int id = 7;
    }

    static class Team implements Cloneable {
        String name;
        List<String> members;

        Team(String name, List<String> members) {
            this.name = name;
            this.members = members;
        }

        Team(Team other) {                                    // copy constructor (deep copy)
            this(other.name, new ArrayList<>(other.members));
        }

        @Override
        protected Team clone() throws CloneNotSupportedException {
            return (Team) super.clone();                      // shallow: members list is shared
        }

        Team deepClone() throws CloneNotSupportedException {
            Team copy = (Team) super.clone();
            copy.members = new ArrayList<>(members);          // copy the mutable field too
            return copy;
        }

        @Override
        public String toString() {
            return name + members;
        }
    }

    static class NotCloneable {
        Object tryClone() throws CloneNotSupportedException { return super.clone(); }
    }

    public static void main(String[] args) throws CloneNotSupportedException {
        String defaultText = new NoToString().toString();
        System.out.println(defaultText.startsWith("ch06_oop.o_object_class.B_ToStringAndCloning$NoToString@"));   // true

        Team original = new Team("devs", new ArrayList<>(List.of("ann", "bo")));
        Team shallow = original.clone();
        Team deep = original.deepClone();
        Team copied = new Team(original);

        shallow.name = "renamed";               // Strings are immutable: reassigning is safe
        shallow.members.add("cy");              // but the list is shared with the original!

        System.out.println(original);           // devs[ann, bo, cy]
        System.out.println(shallow);            // renamed[ann, bo, cy]
        System.out.println(deep);               // devs[ann, bo]
        System.out.println(copied);             // devs[ann, bo]
        System.out.println(original.members == shallow.members);   // true
        System.out.println(original.members == deep.members);      // false

        try {
            new NotCloneable().tryClone();
        } catch (CloneNotSupportedException e) {
            System.out.println("CloneNotSupportedException: " + e.getMessage());
            // CloneNotSupportedException: ch06_oop.o_object_class.B_ToStringAndCloning$NotCloneable
        }

        int[] numbers = {1, 2, 3};
        int[] numbersCopy = numbers.clone();    // arrays support clone() (shallow, fine for primitives)
        numbersCopy[0] = 99;
        System.out.println(numbers[0] + " " + numbersCopy[0]);     // 1 99
    }
}
