package ch06_oop.n_methods;

import java.util.ArrayList;
import java.util.List;

/*
Java is ALWAYS pass-by-value.
 - For primitives, the method gets a copy of the value.
 - For objects, the method gets a copy of the REFERENCE (the "address").
   So the method can change the object's contents (both references point to it),
   but reassigning the parameter does not affect the caller's variable.
A favourite interview question: "Is Java pass-by-reference?" -> No.
*/
public class A_PassByValue {

    static class Box {
        int value;
        Box(int value) { this.value = value; }
    }

    static void changePrimitive(int x) {
        x = 100;                         // changes only the local copy
    }

    static void changeObjectContents(Box box) {
        box.value = 100;                 // follows the copied reference to the SAME object
    }

    static void reassignParameter(Box box) {
        box = new Box(999);              // the local copy now points elsewhere; caller unaffected
        box.value = 555;
    }

    static void swap(Box a, Box b) {     // a classic "trick": this swap does not work
        Box temp = a;
        a = b;
        b = temp;
    }

    static void addItem(List<String> list) {
        list.add("added in method");
    }

    static void replaceList(List<String> list) {
        list = new ArrayList<>();
        list.add("never seen by caller");
    }

    public static void main(String[] args) {
        int number = 5;
        changePrimitive(number);
        System.out.println(number);                 // 5

        Box box = new Box(5);
        changeObjectContents(box);
        System.out.println(box.value);              // 100

        reassignParameter(box);
        System.out.println(box.value);              // 100

        Box first = new Box(1), second = new Box(2);
        swap(first, second);
        System.out.println(first.value + " " + second.value);   // 1 2

        List<String> items = new ArrayList<>(List.of("original"));
        addItem(items);
        replaceList(items);
        System.out.println(items);                  // [original, added in method]

        String text = "hello";
        text.toUpperCase();                         // Strings are immutable: a NEW string is returned
        System.out.println(text);                   // hello
    }
}
