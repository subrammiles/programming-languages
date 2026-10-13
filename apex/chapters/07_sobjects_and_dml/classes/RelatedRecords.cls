/**
 * Relationships between records.
 *  Lookup / master-detail fields hold the parent's Id:  contact.AccountId
 *  Insert the parent first, then set the child's lookup to the parent's new Id.
 */
public with sharing class RelatedRecords {
    public static Account createAccountWithContacts(String accountName, List<String> lastNames) {
        Account acc = new Account(Name = accountName, Industry = 'Education');
        insert as user acc;

        List<Contact> contacts = new List<Contact>();
        for (String lastName : lastNames) {
            contacts.add(new Contact(LastName = lastName, AccountId = acc.Id));
        }
        insert as user contacts;
        return acc;
    }
}
