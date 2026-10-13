/**
 * A trigger runs automatically when records are inserted, updated, deleted or undeleted.
 *  before triggers: change field values before saving (no DML needed), or block the save with addError
 *  after triggers:  the records have Ids; use them to create or update OTHER records
 * Best practice: ONE trigger per object, with no logic in it: delegate to a handler class.
 */
trigger CourseTrigger on Course__c(before insert, before update, after insert, after update) {
    CourseTriggerHandler.handle(Trigger.new, Trigger.oldMap, Trigger.operationType);
}
