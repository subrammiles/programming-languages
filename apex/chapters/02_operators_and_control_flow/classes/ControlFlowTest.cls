@IsTest
private class ControlFlowTest {
    @IsTest
    static void gradesByMarks() {
        Assert.areEqual('A', ControlFlow.grade(95));
        Assert.areEqual('B', ControlFlow.grade(80));
        Assert.areEqual('C', ControlFlow.grade(40));
        Assert.areEqual('Fail', ControlFlow.grade(10));
    }

    @IsTest
    static void switchOnValues() {
        Assert.areEqual('Weekend', ControlFlow.dayType(7));
        Assert.areEqual('Weekday', ControlFlow.dayType(3));
        Assert.areEqual('Invalid', ControlFlow.dayType(9));
    }

    @IsTest
    static void switchOnSObjectType() {
        Assert.areEqual('Account named Acme', ControlFlow.describeRecord(new Account(Name = 'Acme')));
        Assert.areEqual('Contact Rao', ControlFlow.describeRecord(new Contact(LastName = 'Rao')));
        Assert.areEqual('nothing', ControlFlow.describeRecord(null));
        Assert.areEqual('some other record', ControlFlow.describeRecord(new Lead()));
    }

    @IsTest
    static void operatorsAndLoopsRun() {
        ControlFlow.operators();
        ControlFlow.loops();
        Assert.areEqual(2, Math.mod(17, 5));
    }
}
