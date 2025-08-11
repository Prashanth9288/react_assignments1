import React, { useState } from "react";

export default function FormAdd() {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (input.trim() === "") return; // prevent adding empty
    setList([...list, input]);
    setInput(""); // clear input after adding
  };

  const handleDelete = (e) =>{
    //use filter function and remove deleted index element in list 
  }

  // const handleEdit = (e) =>{

  // }

  return (
    <div>
      <form onSubmit={handleAdd}>
        <label htmlFor="input">Name:</label>
        <input
          type="text"
          placeholder="Enter name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {list.map((each, index) => (
          <>
          <li key={index}>{each}</li>
          <button>edit</button>
          <button>delete</button>
          </>
          
        ))}
      </ul>
    </div>
  );
}
