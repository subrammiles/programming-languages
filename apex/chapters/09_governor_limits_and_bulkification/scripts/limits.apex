// Run: sf apex run --file chapters/09_governor_limits_and_bulkification/scripts/limits.apex
System.debug(Bulkification.limitsReport());
List<Account> accounts = [SELECT Id FROM Account WITH USER_MODE LIMIT 10];
System.debug(Bulkification.limitsReport()); // one more query used
