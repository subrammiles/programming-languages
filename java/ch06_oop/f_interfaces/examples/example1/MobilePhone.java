package oops.f_interfaces.examples.example1;

public class MobilePhone implements ITelePhone {

    public MobilePhone() {
        System.out.println("Mobile phone");
    }

    @Override
    public void powerOn() {
        // TODO Auto-generated method stub

    }

    @Override
    public void powerOff() {
        // TODO Auto-generated method stub

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
        return true;
    }

}

