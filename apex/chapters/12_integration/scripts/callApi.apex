// Makes a REAL callout to https://reqres.in (deploy the Remote Site Setting first).
// Run: sf apex run --file chapters/12_integration/scripts/callApi.apex
ReqResClient.UsersPage page = ReqResClient.getUsers(2);
for (ReqResClient.UserDto u : page.data) {
    System.debug(u.id + ' ' + u.first_name + ' ' + u.last_name + ' <' + u.email + '>');
}
System.debug('POST status: ' + ReqResClient.createUser('Subbu', 'developer')); // 201
