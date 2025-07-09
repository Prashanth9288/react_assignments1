let students = [];
let editIndex = -1;

document.getElementById("student-form").addEventListener("submit", function (e) {
  e.preventDefault();

  let name = document.getElementById("name").value.trim();
  let batch = document.getElementById("batch").value.trim();
  let age = parseInt(document.getElementById("age").value);
  let score = parseInt(document.getElementById("score").value);

  if (!name || !batch || isNaN(age) || isNaN(score) || score < 0 || score > 100) {
    alert("Please enter valid details.");
    return;
  }

  let student = { name, batch, age, score };

  if (editIndex === -1) {
    students.push(student);
  } else {
    students[editIndex] = student;
    editIndex = -1;
  }

  this.reset();
  renderTable();
});

function renderTable() {
  let tbody = document.getElementById("student-body");
  tbody.innerHTML = "";

  students.forEach((student, index) => {
    let row = document.createElement("tr");

    if (student.score > 80) {
      row.classList.add("green-highlight");
    }

    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.batch}</td>
      <td>${student.age}</td>
      <td>${student.score}</td>
      <td>
        <button onclick="editStudent(${index})">Edit</button>
        <button onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;

    tbody.appendChild(row);
  });

  // Update stats
  document.getElementById("total").innerText = students.length;

  let avg = students.length > 0
    ? students.reduce((sum, s) => sum + s.score, 0) / students.length
    : 0;

  document.getElementById("average").innerText = avg.toFixed(2);

  // Keep search in sync
  searchStudent();
}

function deleteStudent(index) {
  students.splice(index, 1);
  renderTable();
}

function editStudent(index) {
  let student = students[index];
  document.getElementById("name").value = student.name;
  document.getElementById("batch").value = student.batch;
  document.getElementById("age").value = student.age;
  document.getElementById("score").value = student.score;
  editIndex = index;
}

document.getElementById("search").addEventListener("input", searchStudent);

function searchStudent() {
  let search = document.getElementById("search").value.trim().toLowerCase();
  let rows = document.querySelectorAll("#student-body tr");

  students.forEach((student, index) => {
    let match = student.name.toLowerCase().includes(search);
    rows[index].style.display = match ? "table-row" : "none";
  });
}

document.getElementById("sort-age").addEventListener("click", () => {
  students.sort((a, b) => a.age - b.age);
  renderTable();
});

document.getElementById("sort-score").addEventListener("click", () => {
  students.sort((a, b) => b.score - a.score);
  renderTable();
});
