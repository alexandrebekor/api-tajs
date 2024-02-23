class Person {
  static validate(person) {
    if (person.name === undefined || person.name === '') {
      throw new Error('Name is required');
    }
    if (person.age === undefined || person.age === '') {
      throw new Error('Age is required');
    }
    if (person.age < 0) {
      throw new Error('Age must be a positive number');
    }

    return person
  }


  static process(person) {
    this.validate(person);

    return true
  }
}

export default Person;