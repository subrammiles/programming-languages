
/*super can also be accessed during class field initialization*/

class Base {
    static baseStaticField = 90;
    baseMethod() {
      return 10;
    }
  }
  
  class Extended extends Base {
    extendedField = super.baseMethod(); // 10
    static extendedStaticField = super.baseStaticField; // 90
  }