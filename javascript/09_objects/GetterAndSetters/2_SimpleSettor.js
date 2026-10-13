const person = {
    firstName: "John",
    lastName: "Doe",
    language: "",
    set setLang(lang) {
      this.language = lang;
    }
  };
  // Set an object property using a setter:
  person.setLang = "en";
  console.log(person.language)