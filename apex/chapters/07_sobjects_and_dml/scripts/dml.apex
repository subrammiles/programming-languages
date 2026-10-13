// WARNING: unlike tests, this script really saves records in your org.
// Run: sf apex run --file chapters/07_sobjects_and_dml/scripts/dml.apex

Course__c course = CourseService.createCourse('Photography', 4999);
System.debug('Inserted course with Id ' + course.Id);

CourseService.completeCourse(course);
System.debug([SELECT Name, Course_Completed__c FROM Course__c WHERE Id = :course.Id]);

Account acc = RelatedRecords.createAccountWithContacts('Apex Tutorial Ltd', new List<String>{ 'Rao', 'Iyer' });
System.debug('Account ' + acc.Id + ' has ' + [SELECT COUNT() FROM Contact WHERE AccountId = :acc.Id] + ' contacts');

// Clean up what we created
delete as user [SELECT Id FROM Contact WHERE AccountId = :acc.Id WITH USER_MODE];
delete as user acc;
delete as user course;
