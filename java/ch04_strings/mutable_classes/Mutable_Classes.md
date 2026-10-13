
Mutable classes:


    
1.String is immutable in Java, whenever we do String manipulation like concatenation,
substring, etc. 
it generates a new String and discards the older String for garbage collection. 
These are heavy operations and generate a lot of garbage in heap. 

2.So Java has provided StringBuffer and StringBuilder classes that should be used for 
String manipulation. 

3.StringBuffer and StringBuilder are mutable objects in Java. 

4.They provide append(), insert(), delete(), and substring() methods 
for String manipulation.

String is immutable whereas StringBuffer and StringBuilder are mutable classes.
StringBuffer is thread-safe and synchronized whereas StringBuilder is not. That’s why StringBuilder is faster than StringBuffer.
String concatenation operator (+) internally uses StringBuffer or StringBuilder class.
For String manipulations in a non-multi threaded environment, we should use StringBuilder else use StringBuffer class.
