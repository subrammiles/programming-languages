package oops.f_interfaces.functional_interfaces.examples;

import java.util.ArrayList;
import java.util.Collections;

/*
 Java Comparable interface is used to order the objects of the user-defined class.
 * */

/*
      public interface Comparable<T> {

         public int compareTo(T o);

      }
 * */
public class ComparableInterface {

    static class Student implements Comparable<Student> {
        int rollno;
        String name;
        int age;

        Student(int rollno, String name, int age) {
            this.rollno = rollno;
            this.name = name;
            this.age = age;
        }

        @Override
        public int compareTo(Student otherStudent) {
            int currentStudentAge = age;
            if (currentStudentAge == otherStudent.age)
                return 0;
            else if (currentStudentAge > otherStudent.age)
                return 1;
            else
                return -1;
        }
    }

    public static void main(String[] args) {
        ArrayList<Student> al = new ArrayList<Student>();
        al.add(new Student(101, "Vijay", 23));
        al.add(new Student(106, "Ajay", 27));
        al.add(new Student(105, "Jai", 21));

        Collections.sort(al);
        for (Student st : al) {
            System.out.println(st.rollno + " " + st.name + " " + st.age);
        }

    }

}

