package oops.f_interfaces.examples.example1;


interface ITelePhone {
    /* You can remove public .Not an issue as Class must implement the class */
    public void powerOn();

    void powerOff();

    void call(int phoneNumber);

    void endCall();

    boolean portable();
}

