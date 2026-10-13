/**
 * Apex data types.
 *  Primitives: Integer (32-bit), Long (64-bit), Decimal (exact, use for money), Double,
 *              String, Boolean, Date, Datetime, Time, Id, Blob
 *  Every uninitialised variable is null, including Integer and Boolean.
 *  Apex is case-INSENSITIVE: String, string and STRING are the same.
 *  Constants use the final keyword (static final for class-level constants).
 */
public with sharing class DataTypes {
    public static final Decimal TAX_RATE = 0.18;

    public static void primitives() {
        Integer count = 2147483647;
        Long big = 9223372036854775807L;
        Decimal price = 19.99;
        Double ratio = Double.valueOf(1) / 3; // Decimal -> Double is not converted automatically
        Boolean flag = false;
        System.debug(count + ' ' + big + ' ' + price + ' ' + ratio + ' ' + flag);

        System.debug(count + 1); // -2147483648: Integer overflows silently
        System.debug(7 / 2); // 3: Integer division
        System.debug(7.0 / 2); // 3.5
        System.debug(price * (1 + TAX_RATE)); // 23.5882
        System.debug((price * (1 + TAX_RATE)).setScale(2)); // 23.59

        Id accountId = '001000000000000AAA'; // NOPMD - a made-up Id; never hard-code real record Ids
        System.debug(accountId.getSObjectType()); // Account (the first 3 characters say which object)
    }

    public static void conversions() {
        Integer n = Integer.valueOf('42');
        Decimal d = Decimal.valueOf('3.14');
        String s = String.valueOf(99);
        Boolean b = Boolean.valueOf('true');
        Date day = Date.valueOf('2026-10-13');
        System.debug(n + 1); // 43
        System.debug(d * 2); // 6.28
        System.debug(s + ' bottles'); // 99 bottles
        System.debug(b && day.year() == 2026); // true

        Object anything = 10;
        Integer back = (Integer) anything; // casting from Object
        System.debug(anything instanceof Integer); // true
        System.debug(back);

        try {
            Integer.valueOf('abc');
        } catch (TypeException e) {
            System.debug('TypeException: ' + e.getMessage()); // Invalid integer: abc
        }
    }

    public static void strings() {
        String text = '  Hello, Apex World  ';
        String trimmed = text.trim();
        System.debug(trimmed.toUpperCase()); // HELLO, APEX WORLD
        System.debug(trimmed.length()); // 17
        System.debug(trimmed.contains('Apex')); // true
        System.debug(trimmed.startsWith('Hello')); // true
        System.debug(trimmed.replace('World', 'Developer')); // Hello, Apex Developer
        System.debug(trimmed.substring(7, 11)); // Apex
        System.debug(trimmed.split(', ')); // (Hello, Apex World)
        System.debug(String.join(new List<String>{ 'a', 'b', 'c' }, '-')); // a-b-c
        System.debug(String.format('{0} is {1} years old', new List<String>{ 'Asha', '30' }));
        System.debug(String.isBlank('   ')); // true -> null, empty or whitespace
        System.debug('it\'s ' + 'quoted'); // Apex strings use single quotes; escape with \'
        System.debug('apex'.equals('APEX')); // false
        System.debug('apex' == 'APEX'); // true! == on strings ignores case in Apex
    }

    public static void datesAndTimes() {
        Date d = Date.newInstance(2026, 10, 13);
        System.debug(d.addDays(30)); // 2026-11-12
        System.debug(d.addMonths(1).month()); // 11
        System.debug(d.daysBetween(Date.newInstance(2026, 12, 25))); // 73
        System.debug(d.toStartOfMonth()); // 2026-10-01

        Datetime dt = Datetime.newInstanceGmt(2026, 10, 13, 14, 30, 0);
        System.debug(dt.formatGmt('yyyy-MM-dd HH:mm')); // 2026-10-13 14:30
        System.debug(dt.addHours(5).hourGmt()); // 19

        Time t = Time.newInstance(9, 15, 0, 0);
        System.debug(t.addMinutes(45)); // 10:00:00.000Z
        System.debug(Date.today() <= Date.today().addDays(1)); // true
    }
}
