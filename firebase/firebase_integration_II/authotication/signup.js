    const firebaseURL="http://www.omdbapi.com/?apikey=[3b3ae187]"
    document.getElementById("signupForm").addEventListener("submit",async function (e){
      e.preventDefault();

      const email=document.getElementById("email").value;

      const password=document.getElementById("password").value;

      const newUser={email,password};

      try{
        const response = await fetch(firebaseURL,{
          method:"POST",
          body:JSON.stringify(newUser),
          headers:{"Content-Type":"application/json"}
        });

        if(response.ok){
          alert("Signup successful!");
          window.location.href="login.html";
        }
      } catch(error){
        console.error("Error",error);
      }
    });
