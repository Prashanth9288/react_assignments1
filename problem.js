// Problem 1: Create an Employee Constructor
// Create an Employee constructor function with name, position, and salary.

// Add a prototype method getDetails that returns a formatted string:

// "Alice works as a Developer and earns 80000."

// Input:

// const employee1 = new Employee("Alice", "Developer", 80000);
// console.log(employee1.getDetails());

// Expected Output:
// "Alice works as a Developer and earns 80000."
function Employee(name,position,salary){
  this.name=name;
  this.position=position;
  this.salary=salary;
}

Employee.prototype.getDetails=function(){
  return `${this.name} works as a ${this.position} and earns ${this.salary}.`;
};

const employee1 =new Employee("Alice","Developer",80000);
console.log(employee1.getDetails())







