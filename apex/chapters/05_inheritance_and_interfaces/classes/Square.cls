public with sharing class Square extends Rectangle {
    public Square(Decimal side) {
        super('Square', side, side);
    }

    public override String describe() {
        return 'A square! ' + super.describe();
    }
}
