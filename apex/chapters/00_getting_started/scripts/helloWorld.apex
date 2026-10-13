// Anonymous Apex: statements you run once, without saving a class.
// Run it:
//   sf apex run --file chapters/00_getting_started/scripts/helloWorld.apex
// or in the Developer Console: Debug > Open Execute Anonymous Window, paste, tick "Open Log", Execute.
// System.debug writes to the DEBUG LOG, not to the screen: filter the log by "USER_DEBUG".

System.debug('Hello world');

String language = 'Apex';
System.debug('Hello from ' + language + ', running in org ' + UserInfo.getOrganizationName());
System.debug('Logged in as ' + UserInfo.getUserName());
