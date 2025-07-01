import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
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
  appId: "1:24205376648:web:fc0f82b2d0777a9953f33d"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const bookForm = document.getElementById("book-form");
const bookTable = document.getElementById("book-table").getElementsByTagName("tbody")[0];
const filterAuthor = document.getElementById("filter-author");
const filterGenre = document.getElementById("filter-genre");
const filterAvailability = document.getElementById("filter-availability");
const sortBySelect = document.getElementById("sort-by");
const sortOrderSelect = document.getElementById("sort-order");
const pageSizeDropdown = document.getElementById("page-size");
const pageInfo = document.getElementById("page-info");
const prevBtn = document.getElementById("prev-page");
const nextBtn = document.getElementById("next-page");
const searchTitle = document.getElementById("search-title");

let currentPage = 1;
let pageSize = 5;
let books = {};
let editingBookId = null;

function saveStateToStorage() {
  localStorage.setItem("filter-author", filterAuthor.value);
  localStorage.setItem("filter-genre", filterGenre.value);
  localStorage.setItem("filter-availability", filterAvailability.value);
  localStorage.setItem("sort-by", sortBySelect.value);
  localStorage.setItem("sort-order", sortOrderSelect.value);
  localStorage.setItem("page-size", pageSize.toString());
  localStorage.setItem("current-page", currentPage.toString());
  localStorage.setItem("search-title", searchTitle.value);
}

function loadStateFromStorage() {
  filterAuthor.value = localStorage.getItem("filter-author") || "";
  filterGenre.value = localStorage.getItem("filter-genre") || "";
  filterAvailability.value = localStorage.getItem("filter-availability") || "All";
  sortBySelect.value = localStorage.getItem("sort-by") || "title";
  sortOrderSelect.value = localStorage.getItem("sort-order") || "asc";
  pageSize = parseInt(localStorage.getItem("page-size")) || 5;
  currentPage = parseInt(localStorage.getItem("current-page")) || 1;
  searchTitle.value = localStorage.getItem("search-title") || "";
  pageSizeDropdown.value = pageSize.toString();
}

bookForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const book = {
    title: document.getElementById("title").value,
    author: document.getElementById("author").value,
    genre: document.getElementById("genre").value,
    year: document.getElementById("year").value,
    available: document.getElementById("available").value
  };

  if (editingBookId) {
    update(ref(db, "books/" + editingBookId), book);
    editingBookId = null;
    bookForm.querySelector("button").textContent = "Add Book";
  } else {
    push(ref(db, "books"), book);
  }

  bookForm.reset();
});

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
    books = snapshot.val() || {};
    bookTable.innerHTML = "";

    const sortBy = sortBySelect.value;
    const sortOrder = sortOrderSelect.value;

    let filteredBooks = Object.entries(books).filter(([id, book]) => {
      const titleMatch = book.title.toLowerCase().includes(searchTitle.value.toLowerCase());
      const authorMatch = book.author.toLowerCase().includes(filterAuthor.value.toLowerCase());
      const genreMatch = book.genre.toLowerCase().includes(filterGenre.value.toLowerCase());
      const availMatch =
        filterAvailability.value === "All" || book.available === filterAvailability.value;
      return titleMatch && authorMatch && genreMatch && availMatch;
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

    const totalBooks = filteredBooks.length;
    const totalPages = Math.ceil(totalBooks / pageSize);
    currentPage = Math.min(currentPage, totalPages) || 1;

    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const paginatedBooks = filteredBooks.slice(start, end);

    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;

    if (paginatedBooks.length === 0) {
      bookTable.innerHTML = "<tr><td colspan='6'>No books match filter</td></tr>";
    } else {
      paginatedBooks.forEach(([id, book]) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td data-label="Title">${book.title}</td>
          <td data-label="Author">${book.author}</td>
          <td data-label="Genre">${book.genre}</td>
          <td data-label="Year">${book.year}</td>
          <td data-label="Available">${book.available}</td>
          <td data-label="Actions">
            <button onclick='editBook("${id}", ${JSON.stringify(book).replace(/"/g, '&quot;')})'>✏️ Edit</button>
            <button onclick='deleteBook("${id}")'>🗑️ Delete</button>
          </td>
        `;
        bookTable.appendChild(row);
      });
    }
  });
}

[filterAuthor, filterGenre, filterAvailability, sortBySelect, sortOrderSelect, searchTitle].forEach(input =>
  input.addEventListener("input", () => {
    currentPage = 1;
    saveStateToStorage();
    fetchAndDisplayFilteredBooks();
  })
);

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    saveStateToStorage();
    fetchAndDisplayFilteredBooks();
  }
});

nextBtn.addEventListener("click", () => {
  currentPage++;
  saveStateToStorage();
  fetchAndDisplayFilteredBooks();
});

pageSizeDropdown.addEventListener("change", () => {
  pageSize = parseInt(pageSizeDropdown.value);
  currentPage = 1;
  saveStateToStorage();
  fetchAndDisplayFilteredBooks();
});

document.getElementById("clear-filters").addEventListener("click", () => {
  filterAuthor.value = "";
  filterGenre.value = "";
  filterAvailability.value = "All";
  sortBySelect.value = "title";
  sortOrderSelect.value = "asc";
  searchTitle.value = "";
  currentPage = 1;
  saveStateToStorage();
  fetchAndDisplayFilteredBooks();
});

document.getElementById("export-csv").addEventListener("click", () => {
  let csvContent = "data:text/csv;charset=utf-8,Title,Author,Genre,Year,Available\n";
  Object.entries(books).forEach(([id, book]) => {
    csvContent += `${book.title},${book.author},${book.genre},${book.year},${book.available}\n`;
  });
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "library_books.csv");
  document.body.appendChild(link);
  link.click();
});

document.getElementById("export-pdf").addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let y = 10;
  doc.text("Library Books", 10, y);
  y += 10;
  Object.entries(books).forEach(([id, book]) => {
    doc.text(`${book.title} | ${book.author} | ${book.genre} | ${book.year} | ${book.available}`, 10, y);
    y += 10;
  });
  doc.save("library_books.pdf");
});

loadStateFromStorage();
fetchAndDisplayFilteredBooks();
