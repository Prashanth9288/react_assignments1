
// <div id="parent">
//     <div id="child">
//       <h1></h1>
//     </div>
//   </div>

//ReactELement(Object)=>HTML(Browser  Understands)

const parent = React.createElement("div", { id: "parent" },
  React.createElement("div", { id: "child" }, [
    React.createElement("h1", {}, "I'am  an h1 tag"),
    React.createElement("h2", {}, "Im an  h2 tag"),
  ]), React.createElement("div", { id: "child" }, [
    React.createElement("h1", {}, "I'am  an h1 tag"),
    React.createElement("h2", {}, "Im an  h2 tag"),
  ])
);

//JSX
console.log(parent);

const heading = React.createElement("h1", { id: "heading" }, "Hello world from React");

console.log(parent);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(parent);
 
//core react basics 