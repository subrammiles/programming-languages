/**
 * Newer Apex features, all used elsewhere in this project:
 *  Null coalescing  a ?? b                          (Spring '24)   chapters 02, 03, 13
 *  Safe navigation  a?.b                            (Winter '21)   chapter 02
 *  switch on        values and sObject types        (Summer '18)   chapter 02
 *  Assert class     Assert.areEqual, Assert.fail    (Winter '23)   every test
 *  User mode        WITH USER_MODE, insert as user  (Summer '23)   chapters 07-15
 *  Database.queryWithBinds                          (Winter '23)   chapters 08, 15
 *  Transaction Finalizers for Queueables            (Spring '21)   chapter 11
 *  String.repeat, List/Set helpers, Comparator support for List.sort
 */
public with sharing class ModernApex {
    public static String nullCoalescing(Account acc) {
        return acc?.Name ?? 'Unknown account';
    }

    public static List<Account> sortWithComparator(List<Account> accounts) {
        // List.sort(Comparator) sorts by any rule without implementing Comparable on the type
        accounts.sort(new ByNameLength());
        return accounts;
    }

    public class ByNameLength implements Comparator<Account> {
        public Integer compare(Account a, Account b) {
            return a.Name.length() - b.Name.length();
        }
    }
}
