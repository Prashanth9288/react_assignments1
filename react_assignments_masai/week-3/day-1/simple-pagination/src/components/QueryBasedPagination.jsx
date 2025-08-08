import React, { useEffect, useState } from "react";

 export default function QueryBasedPagination(){
  const[currentPage,setCurrentPage]=useState(1)
  const[posts,setPosts]=useState([]);
  const postsPerPage=10;

  async function fetchPosts() {
    let response =await fetch(`https://jsonplaceholder.typicode.com/todos`)
    let result=await response.json();
    setPosts(result);
  }

  useEffect(()=>{
    fetchPosts();
  },[]);

  const indexOfLastPost=currentPage*postsPerPage;
  const indexOfFirstPost=indexOfLastPost-postsPerPage;
  const currentPosts=posts.slice(indexOfFirstPost,indexOfLastPost);

  return(
    <div>
      <h2>Posts (Page {currentPage})</h2>
      <ul>
        {currentPosts.map((posts)=>(
          <p key={posts.id}>
            Id:{posts.id}<span>Title:{posts.title}</span>
          </p>
        ))}
        <button onClick={()=>setCurrentPage((prev)=>prev-1)} disabled={currentPage===1}>prev</button>

        <button onClick={()=>setCurrentPage((prev)=>prev+1)}>Next</button>
      </ul>
    </div>
  )
}