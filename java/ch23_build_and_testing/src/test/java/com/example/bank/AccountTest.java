package com.example.bank;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.ValueSource;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

/*
JUnit 5 tests
 @Test               a test method
 @BeforeEach         runs before every test (fresh objects each time)
 @Nested             group related tests
 @ParameterizedTest  run one test with many inputs
 @DisplayName        readable names in reports
Run: mvn test
Common pattern in each test: Arrange (set up) -> Act (do the thing) -> Assert (check)
*/
class AccountTest {

    private Account account;

    @BeforeEach
    void setUp() {
        account = new Account("Asha", 1000);
    }

    @Test
    @DisplayName("a new account has the opening balance")
    void newAccount() {
        assertEquals(1000, account.balance());
        assertEquals("Asha", account.owner());
        assertTrue(account.history().isEmpty());
    }

    @Nested
    @DisplayName("deposit")
    class Deposit {

        @Test
        void increasesBalance() {
            account.deposit(500);
            assertEquals(1500, account.balance());
        }

        @ParameterizedTest(name = "rejects {0}")
        @ValueSource(longs = {0, -1, -500})
        void rejectsNonPositiveAmounts(long amount) {
            assertThrows(IllegalArgumentException.class, () -> account.deposit(amount));
        }
    }

    @Nested
    @DisplayName("withdraw")
    class Withdraw {

        @ParameterizedTest(name = "withdraw {0} leaves {1}")
        @CsvSource({"100, 900", "1000, 0", "1, 999"})
        void reducesBalance(long amount, long expected) {
            account.withdraw(amount);
            assertEquals(expected, account.balance());
        }

        @Test
        void failsWhenNotEnoughMoney() {
            InsufficientFundsException e = assertThrows(InsufficientFundsException.class, () -> account.withdraw(1500));
            assertEquals(500, e.shortBy());
            assertEquals(1000, account.balance(), "balance must not change on failure");
        }
    }

    @Test
    void transferMovesMoneyAndRecordsHistory() {
        Account ravi = new Account("Ravi", 0);

        account.transferTo(ravi, 300);

        assertAll(
                () -> assertEquals(700, account.balance()),
                () -> assertEquals(300, ravi.balance()),
                () -> assertEquals("withdraw 300", account.history().get(0)),
                () -> assertEquals("deposit 300", ravi.history().get(0)));
    }

    @Test
    void historyCannotBeModifiedFromOutside() {
        assertThrows(UnsupportedOperationException.class, () -> account.history().add("hack"));
    }
}
