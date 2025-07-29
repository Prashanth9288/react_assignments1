// import React from "react";

// import ReactDOM from "react-dom/client";

// //React.createElement => Object =>HTMLElement(render)

// // const heading=React.createElement(
// //   "h1",{id:"heading"},
// //   "Namaste React🚀"
// // );
// // console.log(heading);

// //JSX -is not Html in JS
// //JSX- HTML-like or XML-like syntax

// //JSX(transpiled before it reaches the JS)-PARCEL-babel

// //JSX =>Babel transpiles it to  React.createElement ==> ReactELement-JS Object => HTMLElement(render)
// // const jsxHeading=(<h1 className="head">Namaste React using JSX 🚀</h1>)
// // console.log(jsxHeading)

// // const root=ReactDOM.createRoot(document.getElementById("root"));
// // root.render(jsxHeading)





// //React Element

// const Title=()=>(
//   <h1 className="head" tabIndex="5">
//     Namaste React using JSX 🚀
//     </h1>
// );

// //React Component
// //Class Based Components ==> old way of writing code
// // Functional Components ==> new way of writing code/

// //React functional component==> 
// const HeadingComponent=()=>{
//   <div id="container">
//     <Title/>
//      <h1  className="heading">Namaste react Functional component</h1>
//   </div>
//   }
// const root=ReactDOM.createRoot(document.getElementById("root"));

// root.render(<HeadingComponent/>)



// part-4
// import React from "react";
// import ReactDOM from "react-dom/client";
// React Element
// const Title = () => (
//   <h1 className="head" tabIndex="5">
//     Namaste React using JSX 🚀
//   </h1>
// );

// //  Component Composition 
// const HeadingComponent = () => (
//   <div id="container">
//     <Title />
//     <h1 className="heading">Namaste react Functional component</h1>
//   </div>
// );

// // Rendering
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<HeadingComponent />);



//part-5

import React from "react";
import ReactDOM from "react-dom/client";

const elem=<span>React Element </span>

const Title = ()=>(
  <h1 className="head" tabIndex="5">
    Namaste React using JSX 🚀
  </h1>
);
//  Component Composition 

const HeadingComponent = () => (
  <div id="container">
   
   <Title/>
  
    <h1 className="heading">Namaste react Functional component</h1>
  </div>
);

// Rendering
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<HeadingComponent />);
