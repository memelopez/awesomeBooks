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
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');

    const item = document.createElement('li');

    item.innerHTML = `
      <p>${book.title}</p>
      <p>${book.author}</p>
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
