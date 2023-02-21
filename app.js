function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function () {
        if (this.read === true) {
            this.read = 'already read'
        } else {
            this.read = 'not read yet'
        };
        return `The ${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
    }
}

const book1 = new Book('Harry Potter', 'J.K. Rowling', 256, true)
const book2 = new Book('Lightning Thief', 'Some dude', 300, false)
