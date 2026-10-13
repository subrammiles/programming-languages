# What's new in Apex

Salesforce ships three releases a year: **Spring**, **Summer** and **Winter** (named for the next year,
so Winter '27 arrives in autumn 2026). Each one raises the API version by one.
This project uses API version **65.0** (`sfdx-project.json`), which every current org supports.

| Feature | Since | Example |
|---|---|---|
| `switch on` (values and sObject types) | Summer '18 | `02_operators_and_control_flow/ControlFlow.cls` |
| Safe navigation `?.` | Winter '21 | `02_operators_and_control_flow` |
| Transaction Finalizers | Spring '21 | `11_asynchronous_apex/PriceUpdateJob.cls` |
| `Assert` class | Winter '23 | every `*Test.cls` |
| `Database.queryWithBinds` | Winter '23 | `08_soql_and_sosl`, `15_design_patterns` |
| User mode: `WITH USER_MODE`, `insert as user` | Summer '23 | chapters 07–15 |
| `Comparator` for `List.sort` | Winter '24 | `ModernApex.cls` |
| Null coalescing `??` | Spring '24 | `ModernApex.cls`, chapters 02, 03, 13 |

Check the release notes for each new release: https://help.salesforce.com/s/articleView?id=release-notes.salesforce_release_notes.htm
