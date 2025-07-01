const firebaseurl = "https://notes-app-553cb-default-rtdb.asia-southeast1.firebasedatabase.app/"

const bookForm = document.getElementById('book-form');
const bookTable = document.getElementById("book-table").getElementsByTagName('tbody')[0];

bookForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value;

  const author = document.getElementById("author").value;

  const genre = document.getElementById("genre").value;

  const year = document.getElementById("year").value;
  const available = document.getElementById("available").value;

  const book = {
    title,
    author,
    genre,
    year,
    available
  };

  firebasePush(book);
  bookForm.reset();
});

function displayBooks(snapshot) {
  bookTable.innerHTML = "";

  const books = snapshot.val();

  if (books) {
    Object.entries(books).forEach(([id, book]) => {
      const row = document.createElement("tr");

      row.innerHTML = `
    <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.genre}</td>
  <td>${book.year}</td>
  <td>${book.available}</td>
  <td>
    <button onclick="deleteBook('${id}')">Delete</button>
  </td>
    `;
      bookTable.appendChild(row)
    });
  } else {
    bookTable.innerHTML = "<tr><td colspan='6'>No books found</td></tr>";
  }
}

function firebasePush(book) {
  firebasePush.database().ref("books").push(book);
}

function deleteBook(id) {
  db.ref("books/" + id).remove();
}
