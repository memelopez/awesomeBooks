// Book Class: Represents a Book
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// Store Class: Handles Storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(index) {
    const books = Store.getBooks();

    books.splice(index, 1);

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// UI Class: Handle UI Tasks
class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));

    // Display Date
    /* eslint-disable */
    const DateTime = luxon.DateTime;
    /* eslint-enable */
    const now = DateTime.now();
    const dateText = now.toLocaleString(DateTime.DATETIME_MED);
    const spanForText = document.querySelector('#luxonDate');
    spanForText.textContent = dateText;

    // Hide form section
    const divForm = document.querySelector('#div4form');
    divForm.classList.add('d-none');

    // Hide contact section
    const divContact = document.querySelector('#div4contact');
    divContact.classList.add('d-none');
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');

    const item = document.createElement('li');

    item.innerHTML = `
      <p class="p-0 m-0">"${book.title}" by ${book.author}</p>
      <button>Remove</button>
    `;

    list.appendChild(item);
  }

  static deleteBook(el) {
    el.remove();
  }

  static clearFields() {
    document.querySelector('#book-title').value = '';
    document.querySelector('#book-author').value = '';
  }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const title = document.querySelector('#book-title').value;
  const author = document.querySelector('#book-author').value;

  // Validate inputs
  if (title === '' || author === '') {
    console.log('Fill in the title and author');
  } else {
    // Instantiate book
    const book = new Book(title, author);

    // Add Book to UI
    UI.addBookToList(book);

    // Add book to store
    Store.addBook(book);

    // Clear fields
    UI.clearFields();
  }
});

// Event: Delete Books
document.querySelector('#book-list').addEventListener('click', (e) => {
  const ulList = document.querySelector('#book-list');
  const item2BeRemoved = e.target.parentElement;
  const nodes = Array.from(ulList.children);
  const index = nodes.indexOf(item2BeRemoved);

  UI.deleteBook(item2BeRemoved);

  Store.removeBook(index);
});

// Event: show list
document.querySelector('#listA').addEventListener('click', (e) => {
  e.preventDefault();
  const divList = document.querySelector('#div4list');
  const divForm = document.querySelector('#div4form');
  const divContact = document.querySelector('#div4contact');

  // Remove d-none from divList
  const classesDivList = divList.className;
  divList.className = classesDivList.replaceAll('d-none', '');

  // Add d-none to divList and divForm
  divForm.classList.add('d-none');
  divContact.classList.add('d-none');
});

// Event: show form
document.querySelector('#formA').addEventListener('click', (e) => {
  e.preventDefault();

  const divList = document.querySelector('#div4list');
  const divForm = document.querySelector('#div4form');
  const divContact = document.querySelector('#div4contact');

  //  Remove d-none from divForm
  const classesDivForm = divForm.className;
  divForm.className = classesDivForm.replaceAll('d-none', '');

  // Add d-none to divList and divForm
  divList.classList.add('d-none');
  divContact.classList.add('d-none');
});

// Event: show contact
document.querySelector('#contactA').addEventListener('click', (e) => {
  e.preventDefault();
  const divList = document.querySelector('#div4list');
  const divForm = document.querySelector('#div4form');
  const divContact = document.querySelector('#div4contact');

  //  Remove d-none from divContact
  const classesDivContact = divContact.className;
  divContact.className = classesDivContact.replaceAll('d-none', '');

  // Add d-none to divList and divForm
  divList.classList.add('d-none');
  divForm.classList.add('d-none');
});
