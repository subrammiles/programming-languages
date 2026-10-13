// Variables: declare the type, then the name. Statements end with a semicolon.
// Run: sf apex run --file chapters/01_variables_and_data_types/scripts/variables.apex

String name = 'Subbu James';
System.debug(name);

Integer age = 30;
Decimal salary = 75000.50;
Boolean isActive = true;
Date joined = Date.newInstance(2024, 8, 11);
System.debug(name + ' (' + age + ') joined on ' + joined.format());

// Variables without a value are null (even numbers and booleans)
Integer notSet;
System.debug(notSet == null); // true

// The examples in the DataTypes class:
DataTypes.primitives();
DataTypes.conversions();
DataTypes.strings();
DataTypes.datesAndTimes();
