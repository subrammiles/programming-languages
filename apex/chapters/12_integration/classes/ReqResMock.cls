/**
 * A fake HTTP server for tests. Tests can't make real callouts, so Test.setMock
 * routes every callout in the test to this class.
 */
@IsTest
public class ReqResMock implements HttpCalloutMock {
    private final Integer statusCode;

    public ReqResMock(Integer statusCode) {
        this.statusCode = statusCode;
    }

    public HttpResponse respond(HttpRequest request) {
        HttpResponse response = new HttpResponse();
        response.setStatusCode(statusCode);
        response.setHeader('Content-Type', 'application/json');
        if (request.getMethod() == 'GET') {
            response.setBody('{"page": 2, "total": 12, "data": [{"id": 7, "email": "michael.lawson@reqres.in", "first_name": "Michael", "last_name": "Lawson"}]}');
        } else {
            response.setBody('{"name": "Asha", "job": "developer", "id": "123"}');
        }
        return response;
    }
}
