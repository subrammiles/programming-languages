# Getting started

Apex is Salesforce's programming language. It looks like Java, runs **on Salesforce's servers**
inside your org, and works directly with your data (Accounts, Contacts, custom objects).
There is no local runtime: you write code on your computer and deploy it to an org.

## 1. Get a free org
Sign up for a **Developer Edition** org: https://developer.salesforce.com/signup
(Or use a Trailhead Playground.)

## 2. Install the tools
- **Salesforce CLI**: https://developer.salesforce.com/tools/salesforcecli  → check with `sf --version`
- **VS Code** with the **Salesforce Extension Pack** (Apex syntax, test running, debugging)

## 3. Connect and deploy this project
```bash
cd apex
sf org login web --alias learn --set-default          # opens a browser to log in
sf project deploy start                               # deploys every class, trigger and object in chapters/
sf apex run test --test-level RunLocalTests --wait 10 --result-format human   # runs all the tests
```

## 4. Run code
```bash
sf apex run --file chapters/00_getting_started/scripts/helloWorld.apex   # anonymous Apex
```
The output of `System.debug` appears in the debug log that the command prints.

## How each chapter is laid out
```
NN_chapter/
├── classes/   *.cls + *.cls-meta.xml   saved Apex classes (deployed to the org)
├── triggers/  *.trigger                (chapter 10)
├── objects/   custom object metadata   (chapter 07)
└── scripts/   *.apex                   anonymous scripts that call the classes
```
Every chapter also has a `*Test` class: Apex requires tests (75% code coverage)
before code can be deployed to production.
