
    let students=[];
    let editIndex=-1;
let form=document.querySelector("form");

form.addEventListener("submit",function(e){
  e.preventDefault();

  let name=document.getElementById("name").value.trim();
  let batch=document.getElementById("batch").value.trim();
  let age=parseInt(document.getElementById("age").value);
  let score=parseInt(document.getElementById("score").value);

  if(!name || !batch || isNaN(age) || isNaN(score) || score<0 || score>100){
    alert("please enter valid details.");
    return;
  }
  let student={
    name,
    batch,
    age,
    score
  };
  if(editIndex===-1){
    students.push(student);
  }else{
    students[editIndex]=student;
    editIndex=-1;
  }
  form.reset();
  renderTable();
});

function renderTable(){
  let tbody=document.getElementById("student-body");
  tbody.innerHTML="";

  students.forEach((student,index)=>{
    let row=document.createElement("tr");

    if(student.score>80){
      row.style.backgroundColor="#d4f5d4";
    }

    row.innerHTML=`
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
document.getElementById("total").innerHTML=students.length;

let avgScore=0;
if(students.length>0){
  avgScore=
  students.reduce((sum,student) => sum + student.score,0)/students.length;
}
document.getElementById("average").innerHTML=avgScore.toFixed(2);

searchStudent();
}

function deleteStudent(index){
  students.splice(index,1);
renderTable();
}
  
function editStudent(index){
  let student=students[index];
  document.getElementById("name").value=student.name;
  document.getElementById("batch").value=student.batch;
  document.getElementById("age").value=student.age;
  document.getElementById("score").value=student.score;

  editIndex=index;

  searchStudent();
}



document.getElementById("search").addEventListener("input",searchStudent);

function searchStudent(){
  let searchText=document.getElementById("search").value.trim().toLowerCase();
  let tbody=document.getElementById("student-body");
  tbody.innerHTML="";

  students.forEach((student,index)=>{
    if(student.name.toLowerCase().includes(searchText)){
      let row=document.createElement("tr");

      if(student.score>80){
        row.style.backgroundColor="#d4f5d4"
      }

      row.innerHTML=`
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
    }
  });
}

document.getElementById("sort-age").addEventListener("click",function(){
  students.sort((a,b)=>a.age-b.age);
  renderTable();
});

document.getElementById("sort-score").addEventListener("click",function(){
  students.sort((a,b)=>b.score-a.score);
  renderTable();
})

