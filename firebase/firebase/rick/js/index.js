
// fetch("https://rickandmortyapi.com/api/character")
//   .then(response=>response.json())
//   .then(data=>{
//     const characters=data.results;
//     const grid=document.getElementById('character-grid');

//     characters.forEach(character=>{
//       const card=document.createElement('div');
//       card.className="card";

//       card.innerHTML=`
//       <img src="${character.image}" alt="${character.name}" width="150"/>
// <h3>${character.name}</h3>
// <p>Species:${character.species}</p>
// <p>status:${character.status}</p>`;

// grid.appendChild(card);
//     });
//   })
//   .catch(error=>{
//     console.log("Error fetching characters:",error)
//   })




function loadCharacters(page=1){
  fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
  .then(response=>response.json())
  .then(data=>{
    const characters=data.results;
    const grid=document.getElementById("character-grid");
    grid.innerHTML="";

    characters.forEach(character=>{
      const card=document.createElement("div");
      card.className="card";

      card.innerHTML=`
      <img src="${character.image}" alt="${character.name}" width="150">
  <h3>${character.name}</h3>
  <p>Species:${character.species}</p>
  <p>Gender: ${character.gender}</p>
  <button class="log-id-btn">Log ID</button>`;

  if(character.type){
    card.innerHTML +=`<p>Type: ${character.type}</p>`
  }

  

  grid.appendChild(card);

  const logBtn=card.querySelector(".log-id-btn");
  logBtn.addEventListener("click",()=>{
    console.log(character.id);
  })
    })
  })
  .catch(error=>console.error("failed to load",error))
}

let apiPage=1;
let displayPage=1;
let allCharacters=[];

const grid=document.getElementById("character-grid");

const pageDisplay=document.getElementById("pageDisplay");

function loadApiPage(apiPageNum){
  fetch(`https://rickandmortyapi.com/api/character?page=${apiPageNum}`)
  .then(res=>res.json())
  .then(data=>{
    allCharacters=data.results;
    displayPage=1;
    renderCharacters();
  })
}

function renderCharacters(){
  grid.innerHTML="";
  
  const start=(displayPage-1)*6;
  const end=start+6;

  const currentCharacters=allCharacters.slice(start,end);

  currentCharacters.forEach(character=>{
    const card=document.createElement("div");
    card.className="card";

    card.innerHTML=`
    <img src="${character.image}"  alt="${character.name}" width="150"/>
  <h3>${character.name}</h3>
  <p>Species: ${character.species}</p>
  <p>Gender: ${character.gender}</p>
  <button class="log-id-btn">Log ID</button>
    `;

    const logBtn=card.querySelector(".log-id-btn");
    logBtn.addEventListener("click",()=>{
      console.log(character.id);
    })

    grid.appendChild(card);
  });

  pageDisplay.textContent=`Page ${((apiPage-1)*4) + displayPage}`;
}

document.getElementById("prevBtn").addEventListener("click",()=>{
  if(displayPage>1){
    displayPage--;
    renderCharacters();
  }else if(apiPage>1){
    apiPage--;
    loadApiPage(apiPage);
  }
});

document.getElementById("nextBtn").addEventListener("click",()=>{
  if(displayPage<4){
    displayPage++;
    renderCharacters();

  }else{
    apiPage++;
    loadApiPage(apiPage);
  }
});

loadApiPage(apiPage)








document.getElementById("loadBtn").addEventListener("click",()=>{
  loadCharacters(1);
})

document.getElementById("clearBtn").addEventListener("click",()=>{
  document.getElementById("character-grid").innerHTML="";
});

document.getElementById("randomBtn").addEventListener("click",()=>{
  const randomPage=Math.floor(Math.random()*42)+1;
  loadCharacters(randomPage)
})



const params=new URLSearchParams(window.location.search);

const characterId=params.get("id");


fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
.then(res=>res.json())
.then(character =>{
  const container=document.getElementById("character-container");

   container.innerHTML = `
      <img src="${character.image}" alt="${character.name}" />
      <h2>${character.name}</h2>
      <p><strong>Status:</strong> ${statusEmoji} ${character.status}</p>
      <p><strong>Species:</strong> ${character.species}</p>
      ${character.type ? `<p><strong>Type:</strong> ${character.type}</p>` : ""}
      <p><strong>Gender:</strong> ${character.gender}</p>
      <p><strong>Origin:</strong> ${character.origin.name}</p>
      <p><strong>Location:</strong> ${character.location.name}</p>
      <p><strong>Episode appearances:</strong> ${character.episode.length}</p>
    `;
})

.catch(err => {
    document.getElementById("character-container").textContent = "Character not found!";
  });

function updateClock() {
  const clock = document.getElementById("clock");
  const now = new Date();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const formatted = now.toLocaleTimeString('en-US', { hour12: false }) +
    " " + days[now.getDay()] +
    " " + now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  clock.textContent = formatted;
}
setInterval(updateClock, 1000);
updateClock(); 





































