package oops.b_inhertience;


/*MultipleInheritance is possible with interfaces but not with the classes but not with the */

/*One interface  can not extends multiple interfaces,  InterfaceA and InterfaceB*/
/*InterfaceB  contains method1 and InterfaceA contains Method 1.
Complier can choose any one as they are not implemented */

public class E_MultipleInheritance {

    interface A{}
    interface  B{}

    interface  C extends  A,B{
        
    }

}
