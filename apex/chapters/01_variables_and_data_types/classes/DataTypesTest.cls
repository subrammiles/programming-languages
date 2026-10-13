/**
 * Tests run the examples and check results. Run with:
 *   sf apex run test --class-names DataTypesTest --result-format human
 */
@IsTest
private class DataTypesTest {
    @IsTest
    static void examplesRunWithoutErrors() {
        DataTypes.primitives();
        DataTypes.conversions();
        DataTypes.strings();
        DataTypes.datesAndTimes();
        Assert.areEqual(0.18, DataTypes.TAX_RATE);
    }

    @IsTest
    static void integerDivisionTruncates() {
        Assert.areEqual(3, 7 / 2);
        Assert.areEqual(3.5, 7.0 / 2);
    }

    @IsTest
    static void stringEqualityIgnoresCase() {
        Assert.isTrue('apex' == 'APEX');
        Assert.isFalse('apex'.equals('APEX'));
    }

    @IsTest
    static void dateArithmetic() {
        Date d = Date.newInstance(2026, 10, 13);
        Assert.areEqual(73, d.daysBetween(Date.newInstance(2026, 12, 25)));
    }
}
