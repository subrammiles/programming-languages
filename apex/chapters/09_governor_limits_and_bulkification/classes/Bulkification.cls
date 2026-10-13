/**
 * Governor limits: because many orgs share Salesforce's servers, each transaction is limited, e.g.
 *   100 SOQL queries (200 in async code), 150 DML statements, 50,000 rows retrieved,
 *   10,000 DML rows, 10 s CPU time (60 s async), 6 MB heap (12 MB async)
 * Hitting a limit throws System.LimitException, which can't be caught.
 *
 * Bulkification: write code that handles MANY records with FEW queries and DML statements.
 *   - never put SOQL or DML inside a loop
 *   - collect Ids in a Set, query once with IN, look results up in a Map
 *   - build a List and do one DML at the end
 * Triggers receive up to 200 records at a time, so this matters everywhere.
 */
public with sharing class Bulkification {
    /** BAD: one query and one DML per contact. 101 contacts -> "Too many SOQL queries: 101". */
    public static void copyIndustryOneByOne(List<Contact> contacts) {
        for (Contact c : contacts) {
            Account a = [SELECT Industry FROM Account WHERE Id = :c.AccountId WITH USER_MODE]; // NOPMD - deliberately bad
            c.Description = 'Industry: ' + a.Industry;
            update as user c; // NOPMD - deliberately bad
        }
    }

    /** GOOD: one query and one DML, whatever the number of contacts. */
    public static void copyIndustryBulk(List<Contact> contacts) {
        Set<Id> accountIds = new Set<Id>();
        for (Contact c : contacts) {
            accountIds.add(c.AccountId);
        }
        Map<Id, Account> accounts = new Map<Id, Account>([SELECT Industry FROM Account WHERE Id IN :accountIds WITH USER_MODE]);
        for (Contact c : contacts) {
            c.Description = 'Industry: ' + accounts.get(c.AccountId)?.Industry;
        }
        update as user contacts;
    }

    public static String limitsReport() {
        return 'SOQL ' + Limits.getQueries() + '/' + Limits.getLimitQueries() +
            ', DML ' + Limits.getDmlStatements() + '/' + Limits.getLimitDmlStatements() +
            ', CPU ' + Limits.getCpuTime() + '/' + Limits.getLimitCpuTime() + ' ms';
    }
}
