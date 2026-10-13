// Run: sf apex run --file chapters/08_soql_and_sosl/scripts/queries.apex
CourseQueries.printCourses();
System.debug('completed courses: ' + CourseQueries.countCompleted());
System.debug(RelationshipQueries.accountsPerIndustry());

for (Account a : [SELECT Name, (SELECT LastName FROM Contacts) FROM Account WITH USER_MODE LIMIT 5]) {
    System.debug(a.Name + ' has ' + a.Contacts.size() + ' contacts');
}
