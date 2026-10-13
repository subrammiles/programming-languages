package ch02_variables_and_data_types.a_variables;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/*
var - local variable type inference (Java 10)
The compiler works out the type from the value on the right.
The variable is still STRONGLY typed: its type is fixed at compile time.
Rules:
 1. Only for local variables (inside methods), not fields or parameters.
 2. Must be initialised on the same line.
 3. Cannot be initialised with null.
*/
public class D_Var {

    public static void main(String[] args) {
        var name = "Subbu";          // String
        var age = 30;                // int
        var price = 99.5;            // double
        var names = new ArrayList<String>(); // ArrayList<String>
        names.add("Asha");

        System.out.println(((Object) age).getClass().getSimpleName()); // Integer (boxed for printing)

        // age = "thirty";  // error: var does not make it dynamic, age is an int

        // Best use: long generic types
        Map<String, List<Integer>> marksOld = new HashMap<String, List<Integer>>();
        var marks = new HashMap<String, List<Integer>>();
        marks.put("maths", List.of(90, 85));

        // In for loops
        for (var entry : marks.entrySet()) {
            System.out.println(entry.getKey() + " -> " + entry.getValue()); // maths -> [90, 85]
        }

        // var x;          // error: cannot infer type without an initialiser
        // var y = null;   // error: null has no type
    }
}
