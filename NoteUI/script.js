const savebtn = document.querySelector("#btnSave");
const titleInput = document.querySelector("#title");
const descriptionInput = document.querySelector("#description");
const notesContainer = document.querySelector("#notes-container");
const deletebtn = document.querySelector("#btnDelete");

function clearForm() {
  titleInput.value = "";
  descriptionInput.value = "";
  deletebtn.classList.add("hideen");
}

function addNote(title, description) {
  const body = {
    title: title,
    description: description,
    isVisiable: true,
  };

  fetch("https://localhost:7262/api/Notes", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((data) => data.json())
    .then((response) => {
      clearForm();
      getAllNotes();
    });
}

function displayNoteInForm(note) {
  titleInput.value = note.title;
  descriptionInput.value = note.description;
  deletebtn.classList.remove("hidden");
  deletebtn.setAttribute("data-id", note.id);
  savebtn.setAttribute("data-id", note.id);
}

function getNoteById(id) {
  fetch(`https://localhost:7262/api/Notes/${id}`)
    .then((data) => data.json())
    .then((response) => displayNoteInForm(response));
}
function populateForm(id) {
  getNoteById(id);
}

function displayNotes(notes) {
  let allNotes = "";

  notes.forEach((note) => {
    const noteElement = `
                  <div class="note" data-id="${note.id}">
                  <h3>${note.title}</h3>
                  <p>${note.description} </p>
                  </div>
                  `;
    allNotes += noteElement;
  });
  notesContainer.innerHTML = allNotes;
  //add event listerners
  document.querySelectorAll(".note").forEach((note) => {
    note.addEventListener("click", function () {
      populateForm(note.dataset.id);
    });
  });
}

function getAllNotes() {
  fetch("https://localhost:7262/api/Notes")
    .then((data) => data.json())
    .then((response) => displayNotes(response));
}
getAllNotes();

function updateNote(id, title, description) {
  const body = {
    title: title,
    description: description,
    isVisiable: true,
  };

  fetch(`https://localhost:7262/api/Notes/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((data) => data.json())
    .then((response) => {
      clearForm();
      getAllNotes();
    });
}

savebtn.addEventListener("click", function () {
  const id = savebtn.dataset.id;
  if (id) {
    updateNote(id, titleInput.value, descriptionInput.value);
  } else {
    addNote(titleInput.value, descriptionInput.value);
  }
});

function deleteNote(id) {
  fetch(`https://localhost:7262/api/Notes/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  }).then((response) => {
    clearForm();
    getAllNotes();
  });
}

deletebtn.addEventListener("click", function () {
  const id = deletebtn.dataset.id;
  deleteNote(id);
});
