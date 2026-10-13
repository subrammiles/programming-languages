/**
 When calling super.prop as a function, the this value inside the prop function is the current this, not the object that super points to. For example, the super.getName() call logs "Extended", despite the code looking like it's equivalent to Base.getName().
 */
 class Base {
    static getName() {
      console.log(this.name);
    }
  }
  
  class Extended extends Base {
    static getName() {
      super.getName();
    }
  }
  
  Extended.getName(); // Logs "Extended"