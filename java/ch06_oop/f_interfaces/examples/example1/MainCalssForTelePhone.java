package oops.f_interfaces.examples.example1;

public class MainCalssForTelePhone {

    public static void main(String[] args) {

        MobilePhone phone1 = new MobilePhone();
        phone1.powerOn();
        phone1.call(12345);
        if (phone1.portable()) {
            System.out.println("Take mobile phone to outside");
        }
        phone1.endCall();
        phone1.powerOff();

        /*
         * ITelePhone and DeskPhone are different class.But DeskPhone implements
         * ITelePhone
         */
        ITelePhone phone2 = new DeskPhone();
        phone2.powerOn();
        phone2.call(12345);
        if (phone2.portable()) {
            System.out.println("Take mobile phone to outside");
        }
        phone2.endCall();
        phone2.powerOff();

    }

}

