// main.js
import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js"
import {
  getDatabase,
  ref,
  push,
  update,
  remove,
  onValue
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDuV_kKgi14TDkyreIFhyJkMqf5JWo9MJg",
  authDomain: "notes-app-553cb.firebaseapp.com",
  databaseURL: "https://notes-app-553cb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "notes-app-553cb",
  storageBucket: "notes-app-553cb.appspot.com",
  messagingSenderId: "24205376648",
  appId: "1:24205376648:web:fc0f82b2d0777a9953f33d",
  measurementId: "G-9D1VWB0X95"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const bookForm = document.getElementById("book-form");
const bookTable = document.getElementById("book-table").getElementsByTagName('tbody')[0];

const filterAuthor = document.getElementById('filter-author');
const filterGenre = document.getElementById('filter-genre');
const filterAvailability = document.getElementById("filter-availability");
const sortBySelect = document.getElementById("sort-by");
const sortOrderSelect = document.getElementById("sort-order");
let editingBookId = null;

bookForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const book = {
    title: document.getElementById("title").value,
    author: document.getElementById("author").value,
    genre: document.getElementById("genre").value,
    year: document.getElementById("year").value,
    available: document.getElementById('available').value
  }
  if (editingBookId) {

    update(ref(db, "books/" + editingBookId), book);
    editingBookId = null;
    bookForm.querySelector("button").textContent = "Add Book";
  } else {

    push(ref(db, "books"), book);
  }

  bookForm.reset(); // Clear form
})

window.editBook = function (id, book) {
  document.getElementById("title").value = book.title;
  document.getElementById("author").value = book.author;
  document.getElementById("genre").value = book.genre;
  document.getElementById("year").value = book.year;
  document.getElementById("available").value = book.available;

  editingBookId = id;
  bookForm.querySelector("button").textContent = "Update Book";
};


window.deleteBook = function (id) {
  remove(ref(db, "books/" + id));
};
function fetchAndDisplayFilteredBooks() {
  onValue(ref(db, "books"), (snapshot) => {
    const books = snapshot.val();
    bookTable.innerHTML = "";

    if (!books) {
      bookTable.innerHTML = "<tr><td colspan='6'>No books found</td></tr>";
      return;
    }

    const sortBy = sortBySelect.value;
    const sortOrder = sortOrderSelect.value;


    let filteredBooks = Object.entries(books).filter(([id, book]) => {
      const authorMatch = book.author.toLowerCase().includes(filterAuthor.value.toLowerCase());
      const genreMatch = book.genre.toLowerCase().includes(filterGenre.value.toLowerCase());
      const availMatch =
        filterAvailability.value === "All" || book.available === filterAvailability.value;
      return authorMatch && genreMatch && availMatch;
    });


    filteredBooks.sort(([, a], [, b]) => {
      let valA = a[sortBy].toString().toLowerCase();
      let valB = b[sortBy].toString().toLowerCase();
      if (sortBy === "year") {
        valA = parseInt(valA);
        valB = parseInt(valB);
      }
      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    filteredBooks.forEach(([id, book]) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.genre}</td>
        <td>${book.year}</td>
        <td>${book.available}</td>
        <td>
          <button onclick='editBook("${id}", ${JSON.stringify(book).replace(/"/g, '&quot;')})'> Edit</button>
          <button onclick='deleteBook("${id}")'> Delete</button>
        </td>
      `;
      bookTable.appendChild(row);
    });
  });
}

[filterAuthor, filterGenre, filterAvailability, sortBySelect, sortOrderSelect].forEach(input =>
  input.addEventListener("input", fetchAndDisplayFilteredBooks)
);

fetchAndDisplayFilteredBooks();