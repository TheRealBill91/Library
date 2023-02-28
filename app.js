let titleInput = document.getElementById("title");
let authorInput = document.getElementById("author");
let pagesInput = document.getElementById("pages");
// let checkedInput = document.getElementById("read");
const bookDisplayContainer = document.querySelector(".bookDisplayContainer");
let radioButtonValue;
const addBookButton = document.querySelector(".addBookModal");
// for adding classes to form modal background, to get modal bg to appear and disappear
const formModalBackground = document.querySelector(".form-modal-background");
// Container form sits in, allows button to close modal without submitting form
const formContainer = document.querySelector(".form-container");
const form = document.getElementById("form");
const closeModalButton = document.querySelector(".close-modal");
let deleteButton;
let removeButtons;
let changeReadStatusButtons;

function Book(title, author, pages, read, removeBook) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.removeBook = "Delete";
}

const myLibrary = [];

function addSampleBookObject() {
  const sampleBookObject = new Book(
    "Expert Web Dev",
    "John Appleseed",
    "200",
    "Not Read",
    this.removeBook
  );
  myLibrary.push(sampleBookObject);
}

Book.prototype.info = function (event) {
  if (this.read === "Not Read") {
    this.read = "Read";
    event.target.classList.remove("read-status", "not-read")
    event.target.classList.add("read-status", "read");
  } else {
    this.read = "Not Read";
    event.target.classList.remove("read-status", "read")
    event.target.classList.add("read-status", "not-read");
  }
  return `${this.read}`;
};

function getRadioButtonValue() {
  const checkbox = document.getElementById("read");
  const buttonReadStatus = document.querySelector(".read-status");
  if (checkbox.checked) {
    radioButtonValue = "Read";
    buttonReadStatus.classList.add("read");
  } else {
    radioButtonValue = "Not Read";
    /* buttonReadStatus.classList.add("not-read"); */
  }
  return radioButtonValue;
}

form.addEventListener("submit", addBookToLibrary);

function addBookToLibrary(event) {
  // Prevent default form submission behavior to avoid sending data to a server
  event.preventDefault();
  let inputValueOne = titleInput.value;
  let inputValueTwo = authorInput.value;
  let inputValueThree = pagesInput.value;
  radioButtonValue = getRadioButtonValue();
  deleteButton = this.removeBook;

  const myBook = new Book(
    inputValueOne,
    inputValueTwo,
    inputValueThree,
    radioButtonValue,
    deleteButton
  );
  myLibrary.push(myBook);
  closeBookFormModal();
  displayEachBook();
  form.reset();
  /* console.log(myLibrary); */
}

function displayEachBook() {
  // Reset the book display container after each book submission
  bookDisplayContainer.innerHTML = "";

  let p;
  let button;

  for (let i = 0; i < myLibrary.length; i++) {
    let cardDiv = document.createElement("div");
    cardDiv.classList.add(`bookCard-${i}`);
    let book = myLibrary[i];
    let keys = Object.keys(book);
    for (let j = 0; j < keys.length; j++) {
      let key = keys[j];
      let bookValue = book[key];
      if (j < 3) {
        p = document.createElement("p");
        p.textContent = bookValue;
        cardDiv.appendChild(p);
      } else if (j === 3) {
        button = document.createElement("button");

        bookValue === "Read"
          ? button.classList.add("read-status", "read")
          : button.classList.add("read-status", "not-read");

        button.setAttribute("data-index", `${i}`);
        button.textContent = bookValue;
        cardDiv.appendChild(button);
      } else {
        button = document.createElement("button");
        button.classList.add("remove-button");
        button.setAttribute("data-index", `${i}`);
        button.textContent = bookValue;
        cardDiv.appendChild(button);
      }
    }
    cardDiv.setAttribute("data-index", `${i}`);
    bookDisplayContainer.appendChild(cardDiv);
    // Queries newly added delete buttons
    removeButtons = document.querySelectorAll(".remove-button");
    // Adds event listeners to all delete buttons, including newly added delete buttons
    addDeleteBookButtonEventListeners();
    // Queries newly added read status buttons
    changeReadStatusButtons = document.querySelectorAll(".read-status");
    // Adds event listeners to all read status buttons, including newly added read status buttons
    addChangeReadStatusListener();
  }
}

addSampleBookObject();

displayEachBook();
// Queries all book delete buttons on page load (or reload)
removeButtons = document.querySelectorAll(".remove-button");

// adds event listener to each delete button on book div object
addDeleteBookButtonEventListeners();
function addDeleteBookButtonEventListeners() {
  removeButtons.forEach((button) =>
    button.addEventListener("click", deleteBookObject)
  );
}

function deleteBookObject(event) {
  const buttonIndex = +event.target.dataset.index;
  for (let i = 0; i < myLibrary.length; i++) {
    if (i === buttonIndex) {
      myLibrary.splice(i, 1);
      /* console.log(removeButtons); */
      displayEachBook();
    }
  }
}

changeReadStatusButtons = document.querySelectorAll(".read-status");
function addChangeReadStatusListener() {
  changeReadStatusButtons.forEach((button) =>
    button.addEventListener("click", changeBookReadStatus)
  );
}

function changeBookReadStatus(event) {
  const buttonIndex = +event.target.dataset.index;
  /* console.log(event.target.textContent) */
  for (let i = 0; i < myLibrary.length; i++) {
    if (i === buttonIndex) {
      let newReadStatus = myLibrary[i].info(event);
      event.target.textContent = newReadStatus;
      // event.target.classList.toggle("read");
      break;
    }
  }
}

showBookModalListen();
function showBookModalListen() {
  addBookButton.addEventListener("click", showBookFormModal);
}

function showBookFormModal() {
  form.classList.toggle("show-modal");
  formModalBackground.classList.toggle("show-modal-container");
  formContainer.classList.toggle("show-modal");
  closeModalWithBackgroundListen();
}

closeBookModalListen();
function closeBookModalListen() {
  closeModalButton.addEventListener("click", closeBookFormModal);
}

function closeBookFormModal() {
  form.classList.toggle("show-modal");
  formModalBackground.classList.toggle("show-modal-container");
  formContainer.classList.toggle("show-modal");
}

// Event listener on form modal bg
function closeModalWithBackgroundListen() {
  // for event listener to close modal using modal bg
  const activeFormModalBackground = document.querySelector(
    ".form-modal-background"
  );
  activeFormModalBackground.addEventListener("click", closeModalWithBackground);
}

// function called when user presses anywhere on form modal background
function closeModalWithBackground() {
  closeBookFormModal();
}
