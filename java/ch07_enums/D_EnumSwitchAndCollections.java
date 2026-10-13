package ch07_enums;

import java.util.EnumMap;
import java.util.EnumSet;
import java.util.Map;

/*
1. Switch expressions over enums: the compiler checks you covered every constant,
   so no default is needed.
2. EnumSet / EnumMap: very fast Set and Map implementations for enum keys.
*/
public class D_EnumSwitchAndCollections {

    enum Status { NEW, PAID, SHIPPED, DELIVERED, CANCELLED }

    static String describe(Status s) {
        return switch (s) {   // remove a case and it will not compile
            case NEW -> "waiting for payment";
            case PAID -> "packing";
            case SHIPPED -> "on the way";
            case DELIVERED -> "done";
            case CANCELLED -> "cancelled";
        };
    }

    public static void main(String[] args) {
        System.out.println(describe(Status.SHIPPED)); // on the way

        EnumSet<Status> active = EnumSet.range(Status.PAID, Status.SHIPPED);
        EnumSet<Status> finished = EnumSet.complementOf(EnumSet.of(Status.NEW, Status.PAID, Status.SHIPPED));
        System.out.println(active);   // [PAID, SHIPPED]
        System.out.println(finished); // [DELIVERED, CANCELLED]

        Map<Status, Integer> counts = new EnumMap<>(Status.class);
        for (Status s : new Status[]{Status.NEW, Status.PAID, Status.NEW, Status.DELIVERED}) {
            counts.merge(s, 1, Integer::sum);
        }
        System.out.println(counts); // {NEW=2, PAID=1, DELIVERED=1} (always in declaration order)
    }
}
