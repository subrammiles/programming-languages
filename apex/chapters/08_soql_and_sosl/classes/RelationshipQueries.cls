/**
 * Relationship and aggregate queries
 *  child -> parent:  SELECT Name, Account.Name FROM Contact            (dot notation)
 *  parent -> child:  SELECT Name, (SELECT LastName FROM Contacts) FROM Account   (sub-query)
 *  aggregates:       COUNT(), SUM(), AVG(), MIN(), MAX() with GROUP BY -> AggregateResult
 *  SOSL:             FIND 'text' IN ALL FIELDS RETURNING ...   (full-text search across objects)
 *  Dynamic SOQL:     Database.queryWithBinds(queryString, binds, AccessLevel)
 */
public with sharing class RelationshipQueries {
    public static List<String> contactsWithAccount(Id accountId) {
        List<String> lines = new List<String>();
        for (Contact c : [SELECT LastName, Account.Name FROM Contact WHERE AccountId = :accountId WITH USER_MODE ORDER BY LastName]) {
            lines.add(c.LastName + ' works at ' + c.Account.Name);
        }
        return lines;
    }

    public static Map<String, Integer> contactCountsByAccount(Set<Id> accountIds) {
        Map<String, Integer> counts = new Map<String, Integer>();
        for (Account a : [SELECT Name, (SELECT Id FROM Contacts) FROM Account WHERE Id IN :accountIds WITH USER_MODE]) {
            counts.put(a.Name, a.Contacts.size());
        }
        return counts;
    }

    public static Map<String, Integer> accountsPerIndustry() {
        Map<String, Integer> result = new Map<String, Integer>();
        for (AggregateResult row : [
            SELECT Industry, COUNT(Id) total
            FROM Account
            WHERE Industry != null
            WITH USER_MODE
            GROUP BY Industry
            LIMIT 100
        ]) {
            result.put((String) row.get('Industry'), (Integer) row.get('total'));
        }
        return result;
    }

    public static List<SObject> dynamicQuery(String objectName, String field, Object value) {
        // Object and field NAMES can't be bind variables, so validate them against the schema
        Schema.SObjectType type = Schema.getGlobalDescribe().get(objectName);
        if (type == null || !type.getDescribe().fields.getMap().containsKey(field)) {
            throw new IllegalArgumentException('Unknown object or field: ' + objectName + '.' + field);
        }
        String soql = 'SELECT Id, Name FROM ' + objectName + ' WHERE ' + field + ' = :value LIMIT 100';
        return Database.queryWithBinds(soql, new Map<String, Object>{ 'value' => value }, AccessLevel.USER_MODE);
    }

    public static List<List<SObject>> search(String term) {
        return [FIND :term IN NAME FIELDS RETURNING Account(Name), Contact(LastName), Course__c(Name) WITH USER_MODE LIMIT 20];
    }
}
