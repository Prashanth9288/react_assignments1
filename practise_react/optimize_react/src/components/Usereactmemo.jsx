import React from "react";
const Child = React.memo(({ count }) => {
  console.log("Child rendered");
  return <p>Count: {count}</p>;
});

export default function Parent() {
  const [count, setCount] = React.useState(0);
  const [age, setAge] = React.useState(25);

  return (
    <div>
      {/* <Parent age={age}/> */}
      <Child count={count} />
      <button onClick={() => setCount(c => c + 1)}>Increment Count</button>
      <button onClick={() => setAge(a => a + 1)}>Increment Age</button>
    </div>
  );
}
