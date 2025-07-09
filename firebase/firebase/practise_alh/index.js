
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
  import { getDatabase,ref,set,get,child,update,remove} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";
  
  const firebaseConfig = {
    apiKey: "AIzaSyDbuGab4qZvDsAcdsxTgsxjrIzHNRIfQcg",
    authDomain: "auth-43287.firebaseapp.com",
    databaseURL: "https://auth-43287-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "auth-43287",
    storageBucket: "auth-43287.firebasestorage.app",
    messagingSenderId: "683880645501",
    appId: "1:683880645501:web:92807dc7fd2cf5fdd5c214",
    measurementId: "G-NWPLD3LDMC"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  //add a book to data 
  function writeBookdata(){
    set(ref(db,'books/book2'),{
      title:"coding",
      author:"prashanth"
    }).then(()=>{
      console.log("data written successfully..")
    }).catch((error)=>{
      console.error("Write failed:",error);
    })
  }
//to read
  function readBookData(){
    const dbRef=ref(db);

    get(child(dbRef,'books/book1')).then((snapshot)=>{
      if(snapshot.exists()){
        const data=snapshot.val();
        console.log("Book",data);
      }else{
        console.log("No data found");
      }
    }).catch((error)=>{
      console.log("Read failed:",error);
    });
  }


  //update book title only
function updateBookTitle(){
  update(ref(db,'books/book1'),{
    title:"Atomic Habits (Updated)"
  }).then(()=>{
    console.log("Book title updated!");
  }).catch((error)=>{
    console.log("Update failed:",error)
  });
}
//update book not yet present in data base 
function updateBookTitled(){
  update(ref(db,'books/book1'),{
  genre:"self-help"
}).then(()=>{
  console.log("Book Title updated...!")
}).catch((error)=>{
  console.log("Update failed...",error)
})
}

function updateBookTitler(){
  update(ref(db,'books/book1'),{
  author:"null"
  })}
// deleting data with remove()
function deleteBook2(){
  remove(ref(db,'books/book2'))
    .then(()=>{
      console.log("Book2 deleted successfully.");
    })
    .catch((error)=>{
      console.error("delete fialed",error);
    })
}

//update field that doesn't exit yet?


updateBookTitler()
updateBookTitled()
  deleteBook2()
  updateBookTitle();
 writeBookdata();
  readBookData();