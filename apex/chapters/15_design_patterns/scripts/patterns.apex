// Run: sf apex run --file chapters/15_design_patterns/scripts/patterns.apex
System.debug(AppSettings.getInstance().values.get('supportEmail'));
for (String name : new List<String>{ 'NotificationService.EmailChannel', 'NotificationService.SmsChannel' }) {
    System.debug(NotificationService.channelFor(name).send('asha', 'Your Apex course starts today'));
}
System.debug(new CourseSelector().selectOpen(5));
