/**
 * A custom exception. Its name MUST end with "Exception" and it extends Exception.
 * It automatically gets constructors: (), (String message), (Exception cause), (String, Exception).
 */
public with sharing class InsufficientFundsException extends Exception {
}
