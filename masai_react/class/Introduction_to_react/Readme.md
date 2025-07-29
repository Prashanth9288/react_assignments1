1.React ?
2.Library and FrameWork
3.Declarative(just tell to do task ) and Imperative(giving a detail explaination of task )
4.Es6 --> Arrow functions, Destructing and `${}`

//Imperative way of writing example

let arr=[1,2,3,4]
let doubledNumbers=[];

for(let i=0;i<arr.length;i++){
doubledNumbers.push(arr[i]\*2)
}
console.log(doubledNumbers)

//Declarative way of example.

let doubledNumbers=arr.map(number=>number\*2)
console.log(doubledNumber)

//1.Function Declaration
function greet(){
console.log("hello)
}
//2.Function Expression
let greet=function(){
return "hello"
}

//Arrow functions
syntax=
let add=(a,b) =>{
console.log(a+b)
}
add(5,4)

let greet=(name)=>{
console.log(name)
}
greet("Tommy")

//destructuring

let fruits=['apple','mango','grapes']

let [firstFruit,secondFruit,thirdFruit]=fruits

console.log(firstFruit,secondFruit,thirdFruit)

//1.SPA--->Single Page Application
//2. SSR--> CSR-->
// SSR==> Server Side Rendering
// CSR==> Client Side Rendering
