# Apex

Apex is Salesforce's strongly typed, object-oriented language (similar to Java). It runs **inside a
Salesforce org**, not on your computer, so this folder is a **Salesforce DX project** that you deploy.

## Setup

1. Get a free **Developer Edition** org: https://developer.salesforce.com/signup
2. Install the **Salesforce CLI** (`sf`) and VS Code with the **Salesforce Extension Pack**
3. Deploy and test:

```bash
cd apex
sf org login web --alias learn --set-default        # log in to your org (opens a browser)
sf project deploy start                             # deploy every chapter
sf org assign permset --name Apex_Tutorial          # give yourself access to the Course object
sf apex run test --test-level RunLocalTests --code-coverage --result-format human --wait 15
```

Run any example script (its `System.debug` output appears in the printed log):
```bash
sf apex run --file chapters/03_collections/scripts/collections.apex
```

Check code quality locally (no org needed) with [PMD](https://pmd.github.io/):
```bash
pmd check -d chapters -R pmd-ruleset.xml
```

## Layout

```
apex/
├── sfdx-project.json        <- project definition (package directory: chapters/)
├── .forceignore             <- scripts and READMEs are not deployed
├── pmd-ruleset.xml          <- static analysis rules
├── config/                  <- scratch org definition (for teams using a Dev Hub)
└── chapters/NN_topic/
    ├── classes/   *.cls     <- classes and their *Test classes
    ├── triggers/  *.trigger
    ├── objects/             <- custom object metadata (Course__c)
    └── scripts/   *.apex    <- anonymous Apex that calls the classes
```

## Chapters

| #  | Chapter | Topics |
|----|---------|--------|
| 00 | [Getting started](chapters/00_getting_started) | orgs, Salesforce CLI, anonymous Apex, debug logs |
| 01 | [Variables and data types](chapters/01_variables_and_data_types) | primitives, `Decimal`, `Id`, dates, conversions, String methods |
| 02 | [Operators and control flow](chapters/02_operators_and_control_flow) | operators, `?.`, `??`, `if`, `switch on`, loops |
| 03 | [Collections](chapters/03_collections) | `List`, `Set`, `Map`, grouping and counting |
| 04 | [Classes and objects](chapters/04_classes_and_objects) | constructors, static vs instance, properties, inner classes, access modifiers |
| 05 | [Inheritance and interfaces](chapters/05_inheritance_and_interfaces) | `virtual`, `abstract`, `override`, interfaces, `Comparable`, polymorphism |
| 06 | [Exceptions](chapters/06_exceptions) | `try` / `catch` / `finally`, built-in and custom exceptions, chaining |
| 07 | [sObjects and DML](chapters/07_sobjects_and_dml) | records, `insert` / `update` / `upsert` / `delete`, `Database` methods, relationships, a custom object |
| 08 | [SOQL and SOSL](chapters/08_soql_and_sosl) | queries, bind variables, relationship and aggregate queries, dynamic SOQL, SOSL |
| 09 | [Governor limits and bulkification](chapters/09_governor_limits_and_bulkification) | limits, the `Limits` class, bulk-safe patterns |
| 10 | [Triggers](chapters/10_triggers) | before/after triggers, context variables, handler pattern, `addError` |
| 11 | [Asynchronous Apex](chapters/11_asynchronous_apex) | `@future`, Queueable with Finalizers, Batch, Schedulable |
| 12 | [Integration](chapters/12_integration) | HTTP callouts, JSON, `@RestResource`, callout mocks |
| 13 | [Testing](chapters/13_testing) | test data factory, `@TestSetup`, fakes, `runAs`, coverage |
| 14 | [Security](chapters/14_security) | sharing, CRUD/FLS, user mode, `stripInaccessible`, injection, permission sets |
| 15 | [Design patterns](chapters/15_design_patterns) | singleton, strategy with `Type.forName`, selector layer |
| 16 | [What's new](chapters/16_whats_new) | modern Apex features by release |
