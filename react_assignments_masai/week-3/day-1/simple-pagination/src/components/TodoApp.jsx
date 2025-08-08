import React, { useEffect, useState } from "react";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 10;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  const totalPages = Math.ceil(todos.length / todosPerPage);
  const startIndex = (currentPage - 1) * todosPerPage;
  const endIndex = startIndex + todosPerPage;
  const paginatedTodos = todos.slice(startIndex, endIndex);

  const goToPage = (pageNumber) => setCurrentPage(pageNumber);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Paginated Todos</h1>
      <ul>
        {paginatedTodos.map((todo) => (
          <p key={todo.id}>
             id:{todo.id} Title: {todo.title} 
          </p>
        ))}
      </ul>
      <div style={{ marginTop: "20px" }}>
        <button onClick={handlePrevious} disabled={currentPage === 1} style={{
              cursor:"pointer",
              padding:"5px",
              fontWeight:"bold",
              fontSize:"16px",
              margin:"5px",
              color:"#bd159cff",
              backgroundColor:"#cbcb91ff"
            }}>
          Previous
        </button>

        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            style={{
              margin: "0 5px",
              padding: "5px 10px",
              backgroundColor: currentPage === page ? "#4caf50" : "#a06a6aff",
              color: currentPage === page ? "white" : "black",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {page}
          </button>
        ))}

          <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          style={{
              cursor:"pointer",
              padding:"5px",
              fontWeight:"bold",
              fontSize:"16px",
              margin:"5px",
              color:"red",
              backgroundColor:"#91bfcbff"
            }}
        >
          Next
        </button>
        
      </div>
    </div>
  );
}

export default TodoApp;
