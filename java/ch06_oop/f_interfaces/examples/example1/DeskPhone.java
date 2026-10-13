package oops.f_interfaces.examples.example1;


public class DeskPhone implements ITelePhone {

    public DeskPhone() {
        System.out.println("Desktop phone................");
    }

    @Override
    public void powerOn() {
        // TODO Auto-generated method stub

    }

    @Override
    public void powerOff() {
        System.out.println("Power off  phone");

    }

    @Override
    public void call(int phoneNumber) {
        // TODO Auto-generated method stub

    }

    @Override
    public void endCall() {
        // TODO Auto-generated method stub

    }

    @Override
    public boolean portable() {
        // TODO Auto-generated method stub
        return false;
    }

}
