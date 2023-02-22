/* eslint-disable */

let titleInput = document.getElementById("title");
let authorInput = document.getElementById("author");
let pagesInput = document.getElementById("pages");
let radioButtons = document.querySelectorAll('input[type="radio"]');
let selectedValue;
const bookDisplayContainer = document.querySelector('.bookDisplayContainer');
const form = document.getElementById("form");

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read

}

Book.prototype.info = function () {
    if (this.read === true) {
        this.read = 'already read'
    } else {
        this.read = 'not read yet'
    };
    return `The ${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
}


function getRadioButtonValue() {
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            selectedValue = radioButton.value;

        }
        return selectedValue;
    }
}

form.addEventListener("submit", addBookToLibrary);

function addBookToLibrary(event) {
    console.log("Adding event listner...")
    event.preventDefault();
    const inputValueOne = titleInput.value;
    const inputValueTwo = authorInput.value;
    const inputValueThree = pagesInput.value;
    const radioButtonValue = getRadioButtonValue();

    const book = new Book(
        inputValueOne,
        inputValueTwo,
        inputValueThree,
        radioButtonValue);
    console.log("It is working...")
    myLibrary.push(book);
    displayEachBook();
    form.reset();
    /* console.log(myLibrary); */

}

function displayEachBook() {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("bookCard");

    let p;
    let button;

    for (let i = 0; i < myLibrary.length; i++) {
        let book = myLibrary[i];
        let keys = Object.keys(book);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            let bookValue = book[key];
            if (i < 3) {
                p = document.createElement('p');
                p.textContent = bookValue;
                cardDiv.appendChild(p);
            } else {
                button = document.createElement('button');
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
