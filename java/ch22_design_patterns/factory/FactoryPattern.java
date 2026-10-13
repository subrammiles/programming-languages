package ch22_design_patterns.factory;

/*
Factory pattern
Code asks for an object by describing what it needs; the factory decides which class to create.
The caller depends only on the interface, so new types can be added without changing callers.
JDK examples: List.of(), Executors.newFixedThreadPool(), NumberFormat.getInstance()
*/
public class FactoryPattern {

    sealed interface Notification permits Email, Sms, Push {
        void send(String message);
    }

    record Email(String address) implements Notification {
        public void send(String message) { System.out.println("Email to " + address + ": " + message); }
    }

    record Sms(String phone) implements Notification {
        public void send(String message) { System.out.println("SMS to " + phone + ": " + message); }
    }

    record Push(String deviceId) implements Notification {
        public void send(String message) { System.out.println("Push to " + deviceId + ": " + message); }
    }

    // The factory
    static Notification create(String channel, String target) {
        return switch (channel.toLowerCase()) {
            case "email" -> new Email(target);
            case "sms" -> new Sms(target);
            case "push" -> new Push(target);
            default -> throw new IllegalArgumentException("unknown channel: " + channel);
        };
    }

    public static void main(String[] args) {
        create("email", "asha@example.com").send("Your order shipped");
        create("SMS", "+91 98765 43210").send("OTP is 1234");
        create("push", "device-42").send("New message");
    }
}
