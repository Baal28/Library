const myLibrary = [];
const dialog = document.querySelector('dialog');
const addBtn = document.querySelector('#new-book-btn');
const bookForm = document.querySelector('.form-container');
const title = document.querySelector('#title-input');
const author = document.querySelector('#author-input');
const pages = document.querySelector('#pages-input');

// Show the dialog
addBtn.addEventListener('click', () => {
    dialog.showModal();
})

bookForm.addEventListener('submit', (event) =>{
    event.preventDefault();
    const bookTitle = title.value;
    const bookAuthor = author.value;
    const bookPages = pages.value;

    console.log(`Title: ${bookTitle}, Author: ${bookAuthor}, Pages: ${bookPages}`);
})

function Book(title, author, pages,read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
               
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
    
    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}, id: ${this.id}`
    }
}

const theHobbit = new Book('The Hobbit', 'J.R.R Tolkien', 295, 'not read yet');
/*
console.log(theHobbit.info());

console.log(Object.getPrototypeOf(theHobbit))
console.log(theHobbit.valueOf())
*/
const harryPotter = new Book('Harry Potter', 'J. K. Rowling', 300, 'readed' );
/*console.log(harryPotter.info());
console.log(harryPotter.valueOf());
*/
myLibrary.push(theHobbit);
myLibrary.push(harryPotter);
console.log(myLibrary);

