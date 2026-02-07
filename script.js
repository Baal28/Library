const dialog = document.querySelector("dialog");
const addBtn = document.querySelector("#new-book-btn");
const bookForm = document.querySelector(".form-container");
const title = document.querySelector("#title-input");
const author = document.querySelector("#author-input");
const pages = document.querySelector("#pages-input");
const bookContainer = document.querySelector(".book-container");
const checkBox = document.querySelector("#read-check");
// Show the dialog
addBtn.addEventListener("click", () => {
  dialog.showModal();
});

const inputs = [title, author];

inputs.forEach((input) => {
  input.addEventListener("invalid", () => {
    if (input.id === "title-input") {
      input.setCustomValidity("The title name must be filled!");
    } else if (input.id === "author-input") {
      input.setCustomValidity("The author name must be filled!");
    }
  });

  // Clear the error every time the user presses a key
  input.addEventListener("input", () => {
    input.setCustomValidity("");
  });
});

pages.addEventListener("input", () => {
  if (pages.validity.rangeUnderflow) {
    pages.setCustomValidity("A book must have at least 1 page!");
  } else if (pages.validity.stepMismatch) {
    pages.setCustomValidity("Decimals are not allowed.");
  } else if (pages.validity.valueMissing) {
    pages.setCustomValidity("Please enter the number of pages.");
  } else {
    // Very important to clear the error if everything is correct
    pages.setCustomValidity("");
  }
});

// We also add it to the 'invalid' event so it triggers upon clicking submit
pages.addEventListener("invalid", () => {
  if (pages.validity.rangeUnderflow) {
    pages.setCustomValidity("A book must have at least 1 page!");
  } else if (pages.id === "pages-input") {
    pages.setCustomValidity("Please enter the number of pages.");
  }
});

pages.addEventListener("keydown", (e) => {
  // Block the minus sign, the period, the letter 'e' (scientific notation), and the plus sign
  if (["-", "e", ".", ",", "+"].includes(e.key)) {
    e.preventDefault();
  }
});

class Library {
  constructor() {
    this.books = [];
  }

  addBook(newBook) {
    this.books.push(newBook);
  }

  removeBook(index) {
    this.books.splice(index, 1);
  }

  getBooks() {
    return this.books;
  }
}
let myLibrary = new Library();

bookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const bookTitle = title.value.trim();
  const bookAuthor = author.value.trim();
  const bookPages = pages.value;
  const readCheck = checkBox.checked;
  let readString;

  if (readCheck) {
    readString = "Readed";
  } else {
    readString = "Not Yet Readed";
  }

  //1. Create the new book object using the captured data.
  const newBook = new Book(bookTitle, bookAuthor, bookPages, readString);

  //2. Add the book to the library array
  myLibrary.addBook(newBook);

  //3.shows the book recently created
  displayBooks();

  //4. Close the modal and reset the form
  dialog.close();
  bookForm.reset();

  //console.log(`Title: ${bookTitle}, Author: ${bookAuthor}, Pages: ${bookPages}`);
});

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
  }

  //methods below
  toggleReadStatus() {
    this.read = this.read === "Readed" ? "Not Yet Readed" : "Readed";
  }
}

function displayBooks() {
  //1.clear display
  bookContainer.innerHTML = "";

  //2. iterate loop through every book object in the array
  myLibrary.getBooks().forEach((book, index) => {
    //3. create html for book card
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    // use data attribute to store the array index for easy removal later
    bookCard.setAttribute("data-index", index);

    //4. populate content using book objects properties
    const statusClass =
      book.read === "Readed" ? "status-read" : "status-not-read";
    bookCard.innerHTML = `
    <h2>${book.title}</h2>
    <p><strong>Author:</strong> ${book.author}</p>
    <p><strong>Pages:</strong> ${book.pages}</p>
    <p class="${statusClass}"><span>Status:</span> ${book.read}</p>
    <div class="card-actions">
        <button class="read-toggle-btn">Toggle Read</button>
        <button class="remove-btn" data-index="${index}">Remove</button>
    </div>
`;

    //5. Inject into dom
    bookContainer.appendChild(bookCard);
  });
}

function removeBook() {
  bookContainer.addEventListener("click", (event) => {
    // Get the index and the target element
    const target = event.target;

    //remove button on the card book
    if (target.classList.contains("remove-btn")) {
      const indexToRemove = target.dataset.index;
      // remove from the data source
      myLibrary.removeBook(indexToRemove);

      displayBooks();
      return; // stop execution after removal
    }

    // toggle read button on the card book
    if (target.classList.contains("read-toggle-btn")) {
      // Get the index from the closest parent book card
      const bookCard = target.closest(".book-card");
      const indexToToggle = bookCard.dataset.index;
      // Get the book object from the array
      const book = myLibrary.getBooks()[indexToToggle];

      //Toggle the read status
      book.toggleReadStatus();

      displayBooks();
    }
  });
}

removeBook();
