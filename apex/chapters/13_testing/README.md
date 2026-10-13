# Testing

Every chapter has a test class; this chapter shows the techniques.

```bash
sf apex run test --test-level RunLocalTests --code-coverage --result-format human --wait 10
sf apex run test --class-names PriceCalculatorTest --result-format human
```

| Technique | Where |
|---|---|
| `@IsTest`, `Assert` class | every `*Test.cls` |
| `@TestSetup` | `PriceCalculatorTest`, `QueriesTest` |
| test data factory | `TestDataFactory` |
| fakes through interfaces | `PriceCalculatorTest.FixedDiscount` |
| `System.runAs` | `PriceCalculatorTest.runAsAnotherUser` |
| `Test.startTest` / `stopTest` (limits, async) | `BulkificationTest`, `AsyncApexTest` |
| callout mocks (`HttpCalloutMock`) | `CalloutAndRestTest`, `ReqResMock` |
| SOSL in tests (`Test.setFixedSearchResults`) | `QueriesTest` |

Rules worth remembering:
- Tests **don't see org data** (unless `@IsTest(SeeAllData=true)`, which you should avoid) and roll back their changes.
- Production deployments need **75% code coverage** and every test passing.
- Test **behaviour** with assertions, including bulk (200 records) and failure cases.
