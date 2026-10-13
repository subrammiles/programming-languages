# Build tools and testing

This chapter is a standalone **Maven** project, so it has the standard layout
instead of a package folder like the other chapters:

```
ch23_build_and_testing/
├── pom.xml                       <- project definition and dependencies
└── src/
    ├── main/java/com/example/bank/   <- application code
    └── test/java/com/example/bank/   <- JUnit 5 tests
```

## Run it

```bash
cd ch23_build_and_testing
mvn test          # compile and run the tests
mvn package       # also build target/bank-1.0.0.jar
mvn clean         # delete the target/ folder
```

In IntelliJ: right-click `pom.xml` → **Add as Maven Project**.

## Maven lifecycle

`validate → compile → test → package → verify → install → deploy`
Running a phase runs every phase before it.

## Gradle (the other popular build tool)

The same project in Gradle (`build.gradle.kts`):

```kotlin
plugins { java }

java { toolchain { languageVersion = JavaLanguageVersion.of(21) } }

repositories { mavenCentral() }

dependencies {
    testImplementation(platform("org.junit:junit-bom:5.12.2"))
    testImplementation("org.junit.jupiter:junit-jupiter")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

tasks.test { useJUnitPlatform() }
```

Run with `gradle test`.

## Libraries you will meet next

| Need | Library |
|---|---|
| Mocking | Mockito |
| Fluent assertions | AssertJ |
| Real databases in tests | Testcontainers |
| JSON | Jackson, Gson |
| Web apps / REST APIs | Spring Boot, Quarkus, Micronaut |
| Less boilerplate | Lombok (records cover many of its uses now) |
| Logging | SLF4J + Logback |
