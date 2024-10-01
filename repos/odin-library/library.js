let myLibrary = [];
const tableElement = document.querySelector('table');
const createBookButton = document.getElementById('createBookButton');

const createBookDialog = document.getElementById('createBookDialog');
const createBookForm = createBookDialog.querySelector('form');
const createBookFormButtons = createBookForm.querySelector('#formButtons');
const confirmButton = createBookDialog.querySelector("#confirmButton");

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleRead() {
        this.read = !this.read;
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);

}

function displayBooks() {
    while (tableElement.firstChild) {
        tableElement.removeChild(tableElement.firstChild);
    }

    myLibrary.forEach((book, index) => {
        const bookRow = document.createElement('tr');

        const bookTitle = document.createElement('td');
        bookTitle.innerText = book.title;
        const bookAuthor = document.createElement('td');
        bookAuthor.innerText = book.author;
        const bookPages = document.createElement('td');
        bookPages.innerText = book.pages;
        const bookRead = document.createElement('td');
        bookRead.innerText = book.read ? 'Yes' : 'No';

        const updateButtons = document.createElement('td');
        const deleteBookButton = document.createElement('button');
        const toggleReadStatusButton = document.createElement('button');

        deleteBookButton.innerText = 'Delete';
        deleteBookButton.dataset.bookIndex = index;
        deleteBookButton.onclick = () => {
            myLibrary.splice(deleteBookButton.dataset.bookIndex, 1);
            displayBooks();
        };

        toggleReadStatusButton.innerText = 'Toggle Read';
        toggleReadStatusButton.onclick = () => {
            book.toggleRead();
            displayBooks();
        };

        updateButtons.appendChild(deleteBookButton);
        updateButtons.appendChild(toggleReadStatusButton);

        bookRow.appendChild(bookTitle);
        bookRow.appendChild(bookAuthor);
        bookRow.appendChild(bookPages);
        bookRow.appendChild(bookRead);
        bookRow.appendChild(updateButtons);
        tableElement.appendChild(bookRow);
    });
}

function createFormField(name, type, id) {
    const formItem = document.createElement('p');
    const formLabel = document.createElement('label');
    const formField = document.createElement('input');

    formLabel.innerText = name;
    formField.type = type;
    formField.id = id;

    formLabel.appendChild(formField);
    formItem.appendChild(formLabel);
    createBookForm.insertBefore(formItem, createBookFormButtons);
}

function buildBookForm() {
    createFormField('Title:', 'text', 'titleTextField');
    createFormField('Author:', 'text', 'authorTextField');
    createFormField('Pages:', 'number', 'pagesNumberField');
    createFormField('Read:', 'checkbox', 'readCheckboxField');
}

createBookButton.addEventListener('click', () => {
    createBookDialog.showModal();
});

cancelButton.addEventListener('click', () => {
    createBookDialog.close();
})

confirmButton.addEventListener('click', (event) => {
    event.preventDefault();
    createBookDialog.close();

    let title = document.getElementById('titleTextField');
    let author = document.getElementById('authorTextField');
    let pages = document.getElementById('pagesNumberField');
    let read = document.getElementById('readCheckboxField');

    addBookToLibrary(new Book(title.value, author.value, pages.value, read.checked));

    title.value = null;
    author.value = null;
    pages.value = null;
    read.checked = false;

    displayBooks();
});

buildBookForm();