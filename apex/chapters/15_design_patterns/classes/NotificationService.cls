/**
 * Strategy + factory: choose behaviour at runtime through an interface.
 * Type.forName creates a class from its NAME, so the choice can come from configuration
 * (Custom Metadata) without changing code: a simple form of dependency injection.
 */
public with sharing class NotificationService {
    public interface Channel {
        String send(String recipient, String message);
    }

    public class EmailChannel implements Channel {
        public String send(String recipient, String message) {
            return 'email to ' + recipient + ': ' + message;
        }
    }

    public class SmsChannel implements Channel {
        public String send(String recipient, String message) {
            return 'sms to ' + recipient + ': ' + message.left(20);
        }
    }

    public static Channel channelFor(String className) {
        Type t = Type.forName(className);
        if (t == null) {
            throw new IllegalArgumentException('No channel class named ' + className);
        }
        return (Channel) t.newInstance();
    }
}
