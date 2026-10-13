/**
 * sObjects and DML
 *  An sObject is a record: standard (Account, Contact) or custom (Course__c, names end in __c).
 *  DML statements save records:  insert, update, upsert, delete, undelete, merge
 *  They work on ONE record or a LIST: always prefer one DML on a list (see chapter 09).
 *  "as user" runs the DML in user mode, respecting the user's permissions (chapter 14).
 */
public with sharing class CourseService {
    public static Course__c createCourse(String name, Decimal price) {
        Course__c course = new Course__c(Name = name, Price__c = price);
        insert as user course; // after insert, the record has an Id
        return course;
    }

    public static List<Course__c> createCourses(List<String> names) {
        List<Course__c> courses = new List<Course__c>();
        for (String name : names) {
            courses.add(new Course__c(Name = name));
        }
        insert as user courses; // ONE statement for the whole list
        return courses;
    }

    public static void completeCourse(Course__c course) {
        course.Course_Completed__c = true;
        update as user course;
    }

    public static void upsertByName(String name, Decimal price) {
        List<Course__c> existing = [SELECT Id FROM Course__c WHERE Name = :name WITH USER_MODE LIMIT 1];
        Course__c course = new Course__c(Name = name, Price__c = price);
        if (!existing.isEmpty()) {
            course.Id = existing[0].Id;
        }
        upsert as user course; // insert if no Id, update if it has one
    }

    public static void deleteAndRestore(Course__c course) {
        delete as user course; // goes to the Recycle Bin
        undelete as user course; // brings it back
    }

    /**
     * Database methods give more control than DML statements.
     * allOrNone = false: save the good records, report the bad ones, don't throw.
     */
    public static List<String> insertPartially(List<Course__c> courses) {
        List<String> messages = new List<String>();
        Database.SaveResult[] results = Database.insert(courses, false, AccessLevel.USER_MODE);
        for (Integer i = 0; i < results.size(); i++) {
            if (results[i].isSuccess()) {
                messages.add('saved ' + courses[i].Name);
            } else {
                messages.add('failed: ' + results[i].getErrors()[0].getMessage());
            }
        }
        return messages;
    }

    /** Generic sObjects: work with any object type by field NAME. */
    public static String describeGeneric(SObject record) {
        Schema.SObjectType objectType = record.getSObjectType();
        return objectType.getDescribe().getLabel() + ': ' + record.get('Name');
    }
}
