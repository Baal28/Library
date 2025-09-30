const myLibrary = [];
const dialog = document.querySelector('dialog');
const addBtn = document.querySelector('#new-book-btn');
const bookForm = document.querySelector('.form-container');
const title = document.querySelector('#title-input');
const author = document.querySelector('#author-input');
const pages = document.querySelector('#pages-input');
const bookContainer = document.querySelector('.book-container');
// Show the dialog
addBtn.addEventListener('click', () => {
    dialog.showModal();
})

bookForm.addEventListener('submit', (event) =>{
    event.preventDefault();
    const bookTitle = title.value;
    const bookAuthor = author.value;
    const bookPages = pages.value;

    //1. Create the new book object using the captured data.
    const newBook = new Book(bookTitle, bookAuthor, bookPages, 'not read yet');
    
    //2. Add the book to the library array
    myLibrary.push(newBook);

    //3.shows the book recently created
    displayBooks();

    //4. Close the modal and reset the form
    dialog.close();
    bookForm.reset();

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

function displayBooks() {
        //1.clear display
        bookContainer.innerHTML= '';
        
        //2. iterate loop through every book object in the array
        myLibrary.forEach((book, index) => {
            //3. create html for book card
            const bookCard = document.createElement('div');
            bookCard.classList.add('book-card');
            // use data attribute to store the array index for easy removal later
            bookCard.setAttribute('data-index', index);

            //4. populate content using book objects properties
            bookCard.innerHTML = `
                <h2>${book.title}</h2>
                <p>Author: ${book.author}</p>
                <p>Pages: ${book.pages}</p>

                <div class="card-actions">
                    <button class="read-toggle-btn">${book.read}</button>
                    <button class="remove-btn" data-index="${index}">Remove</button>
                </div>
            `;

            //5. Inject into dom
            bookContainer.appendChild(bookCard);
        });
    }
/*
const theHobbit = new Book('The Hobbit', 'J.R.R Tolkien', 295, 'not read yet');

console.log(theHobbit.info());

console.log(Object.getPrototypeOf(theHobbit))
console.log(theHobbit.valueOf())

const harryPotter = new Book('Harry Potter', 'J. K. Rowling', 300, 'readed' );
console.log(harryPotter.info());
console.log(harryPotter.valueOf());

myLibrary.push(theHobbit);
myLibrary.push(harryPotter);
console.log(myLibrary);
*/
