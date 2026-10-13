/**
 * Operators and control flow.
 *  Arithmetic: + - * /     (no % operator: use Math.mod)
 *  Comparison: == != < > <= >=   (=== and !== compare object IDENTITY)
 *  Logical:    && || !
 *  Null-safe:  a?.b  safe navigation      a ?? b  null coalescing (Spring '24)
 *  Ternary:    condition ? x : y
 *  Loops:      for, for-each, while, do-while; break and continue
 *  switch on:  values, lists of values, sObject types, enums
 */
public with sharing class ControlFlow {
    public static String grade(Integer marks) {
        if (marks >= 90) {
            return 'A';
        } else if (marks >= 75) {
            return 'B';
        } else if (marks >= 35) {
            return 'C';
        }
        return 'Fail';
    }

    public static String dayType(Integer day) {
        switch on day {
            when 1, 7 {
                return 'Weekend';
            }
            when 2, 3, 4, 5, 6 {
                return 'Weekday';
            }
            when else {
                return 'Invalid';
            }
        }
    }

    public static String describeRecord(SObject record) {
        switch on record {
            when Account a {
                return 'Account named ' + a.Name;
            }
            when Contact c {
                return 'Contact ' + c.LastName;
            }
            when null {
                return 'nothing';
            }
            when else {
                return 'some other record';
            }
        }
    }

    public static void operators() {
        System.debug(17 + 5); // 22
        System.debug(Math.mod(17, 5)); // 2
        System.debug(17 / 5); // 3
        Integer x = 10;
        x += 5;
        x++;
        System.debug(x); // 16

        Boolean adult = x >= 18;
        System.debug(adult ? 'adult' : 'minor'); // minor

        Account acc = null;
        System.debug(acc?.Name); // null -> no NullPointerException
        String label = acc?.Name ?? 'No account';
        System.debug(label); // No account
    }

    public static void loops() {
        for (Integer i = 1; i <= 3; i++) {
            System.debug('classic for ' + i);
        }

        List<String> fruits = new List<String>{ 'apple', 'mango', 'banana' };
        for (String fruit : fruits) {
            if (fruit == 'mango') {
                continue;
            }
            System.debug('for-each ' + fruit); // apple, banana
        }

        Integer n = 1234;
        Integer digits = 0;
        while (n > 0) {
            n = n / 10;
            digits++;
        }
        System.debug('digits: ' + digits); // 4

        Integer tries = 0;
        do {
            tries++;
        } while (tries < 3);
        System.debug('tries: ' + tries); // 3
    }
}
