/**
 * Exposing your own REST API from Salesforce.
 *  @RestResource(urlMapping='/courses/*')  ->  https://YOUR-DOMAIN.my.salesforce.com/services/apexrest/courses/
 *  @HttpGet, @HttpPost, @HttpPatch, @HttpDelete mark the handler methods
 * Callers authenticate with OAuth like any Salesforce API.
 * Try it:  sf api request rest /services/apexrest/courses/
 */
@RestResource(urlMapping='/courses/*')
global with sharing class CourseRestResource {
    global class CourseInput {
        global String name;
        global Decimal price;
    }

    @HttpGet
    global static List<Course__c> listCourses() {
        return [SELECT Id, Name, Price__c, Course_Completed__c FROM Course__c WITH USER_MODE ORDER BY Name LIMIT 100];
    }

    @HttpPost
    global static Id createCourse(String name, Decimal price) {
        // A JSON body {"name": "...", "price": 10} maps onto the parameters
        Course__c c = new Course__c(Name = name, Price__c = price);
        insert as user c;
        RestContext.response.statusCode = 201;
        return c.Id;
    }

    @HttpDelete
    global static void deleteCourse() {
        String courseId = RestContext.request.requestURI.substringAfterLast('/');
        delete as user [SELECT Id FROM Course__c WHERE Id = :courseId WITH USER_MODE];
    }
}
