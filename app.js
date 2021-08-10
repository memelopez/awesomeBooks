// functions for local storage
function getBooks() {
  let books;
  if (localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }

  return books;
}

function addBook(book) {
  const books = getBooks();
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
}

function removeBook(index) {
  const books = getBooks();

  books.splice(index, 1);

  localStorage.setItem('books', JSON.stringify(books));
}

// functions UI : Handle UI Tasks
function addBookToList(book) {
  const list = document.querySelector('#book-list');

  const item = document.createElement('li');

  item.innerHTML = `
    <p>${book.title}</p>
    <p>${book.author}</p>
    <button>Remove</button>
  `;

  list.appendChild(item);
}

function displayBooks() {
  const books = getBooks();

  books.forEach((book) => addBookToList(book));
}

function deleteBook(el) {
  el.remove();
}

function clearFields() {
  document.querySelector('#book-title').value = '';
  document.querySelector('#book-author').value = '';
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', displayBooks());

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const title = document.querySelector('#book-title').value;
  const author = document.querySelector('#book-author').value;

  // Validate
  if (title === '' || author === '') {
    console.log('Fill in the title and author');
  } else {
    // make an object
    const book = {};
    book.title = title;
    book.author = author;

    // Add Book to UI
    addBookToList(book);

    // Add book to local storage
    addBook(book);

    // Clear fields
    clearFields();
  }
});

// Event: Delete Books
document.querySelector('#book-list').addEventListener('click', (e) => {
  const ulList = document.querySelector('#book-list');
  const item2BeRemoved = e.target.parentElement;
  const nodes = Array.from(ulList.children);
  const index = nodes.indexOf(item2BeRemoved);

  deleteBook(item2BeRemoved);

  removeBook(index);
});
