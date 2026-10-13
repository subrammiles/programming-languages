/**
 * HTTP callouts: calling an external REST API from Apex.
 *  - the endpoint must be allowed: a Remote Site Setting (included in this folder) or,
 *    better for real projects, a Named Credential that also stores the authentication
 *  - callouts can't happen after DML in the same transaction (do them first, or use async)
 *  - tests can't make real callouts: they use Test.setMock with an HttpCalloutMock
 * This calls https://reqres.in, a free test API (the original version of this file).
 */
public with sharing class ReqResClient {
    public static final String BASE_URL = 'https://reqres.in';

    /** The shape of one user in the JSON response. Field names match the JSON keys. */
    public class UserDto {
        public Integer id;
        public String email;
        public String first_name; // NOPMD - must match the JSON key
        public String last_name; // NOPMD - must match the JSON key
    }

    public class UsersPage {
        public Integer page;
        public Integer total;
        public List<UserDto> data;
    }

    public class ApiException extends Exception {
    }

    public static UsersPage getUsers(Integer page) {
        HttpRequest request = new HttpRequest();
        request.setMethod('GET');
        request.setEndpoint(BASE_URL + '/api/users?page=' + page);
        request.setHeader('Accept', 'application/json');
        request.setTimeout(10000); // milliseconds

        HttpResponse response = new Http().send(request);
        if (response.getStatusCode() != 200) {
            throw new ApiException('HTTP ' + response.getStatusCode() + ': ' + response.getStatus());
        }
        return (UsersPage) JSON.deserialize(response.getBody(), UsersPage.class);
    }

    public static Integer createUser(String name, String job) {
        HttpRequest request = new HttpRequest();
        request.setMethod('POST');
        request.setEndpoint(BASE_URL + '/api/users');
        request.setHeader('Content-Type', 'application/json');
        request.setBody(JSON.serialize(new Map<String, String>{ 'name' => name, 'job' => job }));

        HttpResponse response = new Http().send(request);
        Map<String, Object> body = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
        System.debug('created user ' + body.get('id'));
        return response.getStatusCode();
    }
}
