let titleInput = document.getElementById("title");
let authorInput = document.getElementById("author");
let pagesInput = document.getElementById("pages");
let checkedInput = document.getElementById("read");
const bookDisplayContainer = document.querySelector(".bookDisplayContainer");
let radioButtonValue;

const form = document.getElementById("form");
let deleteButton;
let removeButtons;
let readStatusChangeButtons;







function Book(title, author, pages, read, removeBook) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.removeBook = "Delete";
}

const myLibrary = [

];

function addSampleBookObject() {
    const sampleBookObject = new Book("Expert Web Dev", "John Appleseed", "200", "Not Read", this.removeBook);
    myLibrary.push(sampleBookObject);
}

Book.prototype.info = function () {
    if (this.read === "Not Read") {
        this.read = "Read";
    } else {
        this.read = "Not Read";
    }
    return `${this.read}`;
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
                button.classList.add("read-status");
                button.setAttribute('data-index', `${i}`)
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
        addDeleteBookButtonEventListeners();
        // Queries newly added read status buttons
        readStatusChangeButtons = document.querySelectorAll('.read-status');
        // Adds event listeners to all read status buttons, including newly added read status buttons
        addChangeReadStatusListener();
    }
}

addSampleBookObject();
displayEachBook();
// Queries all book delete buttons on page load (or reload)
removeButtons = document.querySelectorAll('.remove-button');

// adds event listener to each delete button on book div object
addDeleteBookButtonEventListeners();
function addDeleteBookButtonEventListeners() {
    removeButtons.forEach(button => button.addEventListener('click', deleteBookObject))
}


function deleteBookObject(event) {
    const buttonIndex = +(event.target.dataset.index);
    for (let i = 0; i < myLibrary.length; i++) {
        if (i === buttonIndex) {
            myLibrary.splice(i, 1);
            /* console.log(removeButtons); */
            displayEachBook();
        }
    }

}

readStatusChangeButtons = document.querySelectorAll('.read-status');
function addChangeReadStatusListener() {
    readStatusChangeButtons.forEach(button => button.addEventListener('click', changeBookReadStatus))
}

function changeBookReadStatus(event) {
    const buttonIndex = +(event.target.dataset.index);
    /* console.log(event.target.textContent) */
    for (let i = 0; i < myLibrary.length; i++) {
        if (i === buttonIndex) {
            let newReadStatus = myLibrary[i].info();
            event.target.textContent = newReadStatus;
            break;
        }
    }
}


