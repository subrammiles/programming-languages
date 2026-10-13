/**
 * Singleton: one shared instance per transaction (each Apex transaction starts fresh).
 * Useful for caching settings or query results that many classes need.
 */
public with sharing class AppSettings {
    private static AppSettings instance;
    public Integer loadCount { get; private set; }
    public Map<String, String> values { get; private set; }

    private AppSettings() {
        // In a real org: read Custom Metadata Types or Custom Settings here
        values = new Map<String, String>{ 'currency' => 'INR', 'supportEmail' => 'help@example.com' };
        loadCount = 1;
    }

    public static AppSettings getInstance() {
        if (instance == null) {
            instance = new AppSettings();
        }
        return instance;
    }
}
