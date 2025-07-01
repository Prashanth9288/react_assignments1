// GET / POST / PATCH / DELETE

//POST

async function addPost() {
  let response= await fetch('https://jsonplaceholder.typicode.com/posts',{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      name:"Tommy",
      age:20
    })
  })
  let data=await response.json()
  console.log(data)
  }

  addPost()



