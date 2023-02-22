let titleInput = document.getElementById("title");
let authorInput = document.getElementById("author");
let pagesInput = document.getElementById("pages");
let checkedInput = document.getElementById("read");
const bookDisplayContainer = document.querySelector(".bookDisplayContainer");
let radioButtonValue;

const form = document.getElementById("form");
let deleteButton;
let removeButtons;







function Book(title, author, pages, read, removeBook) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.removeBook = "Delete";
}

const myLibrary = [
    { title: "Expert Web Dev", author: "John Appleseed", pages: "200", read: "Not Read", removeBook: "Delete" }
];



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
    if (checkbox.checked) {
        radioButtonValue = "Read"
    } else {
        radioButtonValue = "Not Read";
    }
    return radioButtonValue;
}


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
                button.textContent = bookValue;
                cardDiv.appendChild(button);
            } else {
                button = document.createElement("button");
                button.classList.add("remove-button");
                button.setAttribute('data-index', `${i}`)
                button.textContent = bookValue;
                cardDiv.appendChild(button);
            }
        }
        cardDiv.setAttribute('data-index', `${i}`);
        bookDisplayContainer.appendChild(cardDiv);
        // Queries newly added delete buttons
        removeButtons = document.querySelectorAll('.remove-button');
        // Adds event listeners to all delete buttons, including newly added delete buttons
        deleteButtonsListen();
    }
}

displayEachBook();
removeButtons = document.querySelectorAll('.remove-button');



deleteButtonsListen();
function deleteButtonsListen() {
    removeButtons.forEach(button => button.addEventListener('click', deleteBookObject))
}

function deleteBookObject(event) {
    const buttonIndex = +(event.target.dataset.index);
    for (let i = 0; i < myLibrary.length; i++) {
        if (i === buttonIndex) {
            myLibrary.splice(i, 1);
            console.log(removeButtons);
            displayEachBook();
        }
    }

}





