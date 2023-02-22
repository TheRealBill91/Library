let titleInput = document.getElementById("title");
let authorInput = document.getElementById("author");
let pagesInput = document.getElementById("pages");
let checkedInput = document.getElementById("read");
const bookDisplayContainer = document.querySelector(".bookDisplayContainer");
let radioButtonValue;
const form = document.getElementById("form");
let deleteButton;

let myLibrary = [];

function Book(title, author, pages, read, removeBook) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.removeBook = "Delete";
}

Book.prototype.info = function () {
  if (this.read === true) {
    this.read = "already read";
  } else {
    this.read = "not read yet";
  }
  return `The ${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
};

function getRadioButtonValue() {
  const checkbox = document.getElementById("read");
  if (checkbox.checked){
    radioButtonValue = "Read"
  } else {
    radioButtonValue = "Not Read";
  }
  return radioButtonValue;
}

const checkbox = document.getElementById("read");
// checkbox.addEventListener("change", getRadioButtonValue);

form.addEventListener("submit", addBookToLibrary);

function addBookToLibrary(event) {
  console.log("Adding event listner...");
  event.preventDefault();
  let inputValueOne = titleInput.value;
  let inputValueTwo = authorInput.value;
  let inputValueThree = pagesInput.value;
  radioButtonValue = getRadioButtonValue();
  deleteButton = this.removeBook;

  const book = new Book(
    inputValueOne,
    inputValueTwo,
    inputValueThree,
    radioButtonValue,
    deleteButton
  );
  console.log("It is working...");
  myLibrary.push(book);
  displayEachBook();
  form.reset();
  /* console.log(myLibrary); */
}

function displayEachBook() {
  bookDisplayContainer.innerHTML = "";

  let p;
  let button;

  for (let i = 0; i < myLibrary.length; i++) {
    let cardDiv = document.createElement("div");
    cardDiv.classList.add(`bookCard-${i}`);
    let book = myLibrary[i];
    let keys = Object.keys(book);
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let bookValue = book[key];
      if (i < 3) {
        p = document.createElement("p");
        p.textContent = bookValue;
        cardDiv.appendChild(p);
      } else {
        button = document.createElement("button");
        button.textContent = bookValue;
        cardDiv.appendChild(button);
      }
    }
    bookDisplayContainer.appendChild(cardDiv);
  }
}

/* addBookToLibrary(); */

/* const book1 = new Book('Harry Potter', 'J.K. Rowling', 256, true)
const book2 = new Book('Lightning Thief', 'Some dude', 300, false) */
