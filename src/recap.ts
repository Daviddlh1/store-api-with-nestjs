const myName = 'David';
console.log(myName);
const myAge = 24;
console.log(myAge);

const sum = (a: number, b: number) => {
  return a + b;
};
console.log(sum(10, 25));

class Persona {
  constructor(private age: number, public name: string) {}

  getSumary() {
    return `My Name is ${this.name} and I'm ${this.age} years old`;
  }
}

const david = new Persona(24, 'David');
david.getSumary();
