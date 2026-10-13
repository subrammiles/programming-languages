"""
datetime - dates, times and durations
 date, time, datetime, timedelta, timezone
zoneinfo (3.9) - real time zones like "Asia/Kolkata", with daylight saving
Tip: store times in UTC; convert to a local zone only to show them.
"""
from datetime import UTC, date, datetime, timedelta
from zoneinfo import ZoneInfo

today = date(2026, 10, 13)
print(today, today.year, today.strftime("%A"))  # 2026-10-13 2026 Tuesday
print(today + timedelta(days=30))  # 2026-11-12
print((date(2026, 12, 25) - today).days, "days to Christmas")  # 73

meeting = datetime(2026, 10, 13, 14, 30)
print(meeting.strftime("%d/%m/%Y %I:%M %p"))  # 13/10/2026 02:30 PM
print(datetime.strptime("25-12-2026 09:00", "%d-%m-%Y %H:%M"))  # 2026-12-25 09:00:00
print(datetime.fromisoformat("2026-10-13T10:00:00+05:30"))
print(meeting.isoformat())  # 2026-10-13T14:30:00

print("<<<< time zones >>>>")
india = datetime(2026, 10, 13, 10, 0, tzinfo=ZoneInfo("Asia/Kolkata"))
print(india.astimezone(ZoneInfo("America/New_York")))  # 2026-10-13 00:30:00-04:00
print(india.astimezone(UTC))  # 2026-10-13 04:30:00+00:00
now_utc = datetime.now(UTC)  # "aware" datetime: knows its zone
print(now_utc.tzinfo)  # UTC

print("<<<< durations >>>>")
d = timedelta(hours=2, minutes=15)
print(d, d.total_seconds())  # 2:15:00 8100.0
