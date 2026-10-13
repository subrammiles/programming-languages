package ch22_design_patterns.observer;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

/*
Observer pattern (publish/subscribe)
A subject keeps a list of listeners and notifies them when something happens.
The subject does not need to know what the listeners do.
Examples: UI button click listeners, event buses, reactive streams (Flow API).
*/
public class ObserverPattern {

    record PriceChange(String stock, double oldPrice, double newPrice) {}

    static class Stock {
        private final String symbol;
        private double price;
        private final List<Consumer<PriceChange>> listeners = new ArrayList<>();

        Stock(String symbol, double price) {
            this.symbol = symbol;
            this.price = price;
        }

        Runnable subscribe(Consumer<PriceChange> listener) {
            listeners.add(listener);
            return () -> listeners.remove(listener); // call this to unsubscribe
        }

        void setPrice(double newPrice) {
            PriceChange change = new PriceChange(symbol, price, newPrice);
            price = newPrice;
            listeners.forEach(l -> l.accept(change));
        }
    }

    public static void main(String[] args) {
        Stock tcs = new Stock("TCS", 4000);

        tcs.subscribe(c -> System.out.println("[log] " + c));
        Runnable unsubscribeAlert = tcs.subscribe(c -> {
            double pct = (c.newPrice() - c.oldPrice()) / c.oldPrice() * 100;
            if (Math.abs(pct) >= 5) System.out.printf("[alert] %s moved %.1f%%%n", c.stock(), pct);
        });

        tcs.setPrice(4100);  // log only
        tcs.setPrice(3800);  // log + alert (-7.3%)
        unsubscribeAlert.run();
        tcs.setPrice(3000);  // log only, alert was removed
    }
}
