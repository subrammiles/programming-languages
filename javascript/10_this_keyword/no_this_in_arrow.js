

//arrow => functions have no “this”
//If this is used, that instance refernce to  outside object

let user = {
    first_name: "Subbu",
    marks: ["12", "10", "78"],
  
    average() {
      this.marks.forEach(
        subject_score => console.log(this.first_name + ' markd : ' + subject_score)
      );
    }
  };
  user.average();
