 //const apiUrl='https://rickandmortyapi.com/api/character'

// fetch(apiUrl)
// .then(response =>{
//   if(!response.ok){
//     throw new Error('HTTP error! status:${response.status}')
//   }
//   return response.json()
// })

// .then(data=>{
//   const charactersDiv=document.getElementById('characters');
// // only take first 6 characters
//   data.results
//   .slice(0,6)
//   .forEach(character=>{
//     //log name and status for each
//     console.log(character.name,character.status);
      
    
//     //create card container
//     const charDiv=document.createElement('div');
//     charDiv.classList.add('character-card');

//     //highlight alive characters 
//     if(character.status==='Alive'){
//       charDiv.classList.add('alive');
//     }
//     // Inject character info,including Gender

//     charDiv.innerHTML=`
//     <img src="${character.image}" alt="${character.name}"/>
//   <h2>${character.name}</h2>
//   <p>Status: ${character.status}</p>
//   <p>Species: ${character.species}</p>
//   <p>Gender: ${character.gender}</p>
//     `;
//     charactersDiv.appendChild(charDiv)
//   })
// })
// .catch(error=>{
//   console.log("Fetch error:",error);

//   //show a basic error message in the UI
//   const charactersDiv=document.getElementById('characters');
//   charactersDiv.innerText="Error loading characters";
// });



//for  pagination again started above one upto fetching and displaying the data

let currentPage=1;

function loadCharacters(page=1){
  const apiUrl=`https://rickandmortyapi.com/api/character?page=${page}`

  const charactersDiv=document.getElementById('characters');

  charactersDiv.innerHTML=''; // clear old characters

  fetch(apiUrl)
  .then(response=>{
    if(!response.ok){
      throw new Error(`HTTP error! status; ${response.status}`)
    }
    return response.json()
  })
  .then(data=>{
    maxPages=data.info.pages; //update max pages dynamically 
    charactersDiv.innerHTML=''; // clear loading msgs
    data.results.slice(0,6).forEach(character =>{
      //console.log(character.name,character.status);
      const charDiv=document.createElement('div');
      charDiv.classList.add('character-card');
      if(character.status==='Alive'){
        charDiv.classList.add('alive');
      }else{
        charDiv.classList.add('dead');
      }
      charDiv.innerHTML=`
      <img src="${character.image}" alt="${character.name}" />
          <h2>${character.name}</h2>
          <p>Status: ${character.status}</p>
          <p>Species: ${character.species}</p>
          <p>Gender: ${character.gender}</p>
      `;
      charactersDiv.appendChild(charDiv);
    });

    //update page label

    document.getElementById('page-label').textContent=`page ${currentPage}`;

    //Enable/Disable buttons

    document.getElementById('next-btn').disabled=currentPage>=maxPages;
    document.getElementById('prev-btn').disabled=currentPage<=1;
  })
  .catch(error=>{
    console.log('Fetch error:',error);
    charactersDiv.innerText='Error loading characters';
  });
}

function changePage(direction){
  const newPage=currentPage+direction;
  if(newPage<1 || newPage>maxPages) return;

  currentPage=newPage;
  loadCharacters(currentPage)
}
loadCharacters(currentPage);


//search funciton

function searchCharacters(){
  const searchInput=document.getElementById('search-input')
  const query=searchInput.value.trim();

  if(query===''){
    alert('please enter a character name.');
    return;
  }
  const searchUrl=`https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(query)}`

  const charactersDiv=document.getElementById('characters')
  charactersDiv.innerHTML='Searching...';

  fetch(searchUrl)
  .then(response=>response.json())
  .then(data=>{
    charactersDiv.innerHTML='';

    if(data.results.length===0){
      charactersDiv.innerText='No characters found.';
      return;
    }
    data.results.slice(0,6).forEach(character=>{
      const charDiv=document.createElement('div');
      charDiv.classList.add('character-card');
      if(character.status==='Alive') charDiv.classList.add('alive');


      charDiv.innerHTML = `
          <img src="${character.image}" alt="${character.name}" />
          <h2>${character.name}</h2>
          <p>Status: ${character.status}</p>
          <p>Species: ${character.species}</p>
          <p>Gender: ${character.gender}</p>
        `;
        charactersDiv.appendChild(charDiv);
    });
  })
  .catch(error=>{
    console.log('search error:',error);
    charactersDiv.innerText='No characters found.';
  })
}

//filter

function applyFilters(){
  const status=document.getElementById('status-filter').value;
  const species=document.getElementById('species-filter');
  const charactersDiv=document.getElementById('characters');

  charactersDiv.innerHTML='Loading...';
  // fetch

  fetch(`https://rickandmortyapi.com/api/character?page=1`)
  .then(response=>{
    if(!response.ok) throw new Error(`status: ${response.status}`);
    return response.json();
  })

  .then (data=>{
    let results=data.results;
    //Filter by status if selected
    if(status){
      results=results.filter(char=>char.status===status);
    }

    //Filter by species if selected
    if(species){
      results=results.filter(char=>char.species===species);
    }

    charactersDiv.innerHTML=``;

    if(results.length===0){
      charactersDiv.innerText='No characters match your filters.';
      return;
    }
    results.slice(0,6).forEach(character=>{
      const charDiv=document.createElement('div');
      charDiv.classList.add('character-card');
      if(character.status==='Alive') charDiv.classList.add('alive');

      charDiv.innerHTML=`
      <img src="${character.image}" alt="${character.name}"/>
<h2>${character.name}</h2>
<p>status: ${character.status}</p>
<p>Species: ${character.species}</p>
<p>Gender: ${character.gender}</p>
      `;
      charactersDiv.appendChild(charDiv);
    });
  })
  .catch(err=>{
    charactersDiv.innerText='Error loading filtered results';
    console.error('Filter error',err)
  })
}
