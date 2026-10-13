@IsTest
private class CalloutAndRestTest {
    @IsTest
    static void parsesUsersPage() {
        Test.setMock(HttpCalloutMock.class, new ReqResMock(200));
        Test.startTest();
        ReqResClient.UsersPage page = ReqResClient.getUsers(2);
        Test.stopTest();
        Assert.areEqual(2, page.page);
        Assert.areEqual('Michael', page.data[0].first_name);
    }

    @IsTest
    static void throwsOnHttpError() {
        Test.setMock(HttpCalloutMock.class, new ReqResMock(500));
        try {
            ReqResClient.getUsers(1);
            Assert.fail('expected ApiException');
        } catch (ReqResClient.ApiException e) {
            Assert.isTrue(e.getMessage().startsWith('HTTP 500'));
        }
    }

    @IsTest
    static void createsUser() {
        Test.setMock(HttpCalloutMock.class, new ReqResMock(201));
        Assert.areEqual(201, ReqResClient.createUser('Asha', 'developer'));
    }

    @IsTest
    static void restResource() {
        RestContext.request = new RestRequest();
        RestContext.response = new RestResponse();
        Id newId = CourseRestResource.createCourse('REST APIs', 99);
        Assert.areEqual(201, RestContext.response.statusCode);
        Assert.areEqual(1, CourseRestResource.listCourses().size());

        RestContext.request.requestURI = '/services/apexrest/courses/' + newId;
        CourseRestResource.deleteCourse();
        Assert.areEqual(0, [SELECT COUNT() FROM Course__c]);
    }

    @IsTest
    static void jsonRoundTrip() {
        ReqResClient.UserDto u = new ReqResClient.UserDto();
        u.id = 1;
        u.email = 'a@b.com';
        String json = JSON.serialize(u, true); // true = leave out null fields
        Assert.areEqual('{"id":1,"email":"a@b.com"}', json);
        ReqResClient.UserDto back = (ReqResClient.UserDto) JSON.deserialize(json, ReqResClient.UserDto.class);
        Assert.areEqual('a@b.com', back.email);
    }
}
