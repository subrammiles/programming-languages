package ch09_sealed_classes_and_pattern_matching;

/*
Record patterns (Java 21)
Take a record apart ("deconstruct" it) right inside instanceof or switch.
Patterns can be nested, and var can be used for the parts.
*/
public class D_RecordPatterns {

    record Point(int x, int y) {}
    record Line(Point start, Point end) {}

    sealed interface Expr permits Num, Add, Mul {}
    record Num(int value) implements Expr {}
    record Add(Expr left, Expr right) implements Expr {}
    record Mul(Expr left, Expr right) implements Expr {}

    // A tiny calculator: evaluates an expression tree
    static int eval(Expr e) {
        return switch (e) {
            case Num(int v) -> v;
            case Add(Expr l, Expr r) -> eval(l) + eval(r);
            case Mul(Num(var a), Num(var b)) -> a * b;      // nested pattern
            case Mul(Expr l, Expr r) -> eval(l) * eval(r);
        };
    }

    static String show(Expr e) {
        return switch (e) {
            case Num(int v) -> String.valueOf(v);
            case Add(var l, var r) -> "(" + show(l) + " + " + show(r) + ")";
            case Mul(var l, var r) -> show(l) + " * " + show(r);
        };
    }

    public static void main(String[] args) {
        Object o = new Point(3, 4);
        if (o instanceof Point(int x, int y)) {
            System.out.println("x+y = " + (x + y)); // x+y = 7
        }

        Object line = new Line(new Point(0, 0), new Point(3, 4));
        if (line instanceof Line(Point(var x1, var y1), Point(var x2, var y2))) {
            System.out.println("length = " + Math.hypot(x2 - x1, y2 - y1)); // length = 5.0
        }

        // (2 + 3) * 4
        Expr expr = new Mul(new Add(new Num(2), new Num(3)), new Num(4));
        System.out.println(show(expr) + " = " + eval(expr)); // (2 + 3) * 4 = 20
    }
}
