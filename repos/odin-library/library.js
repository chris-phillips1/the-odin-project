class ScreenController {

    initialize() {
        const createBookButton = document.getElementById('createBookButton');
        const tableElement = document.querySelector('table');
    }

    buildBookDialog() {
        const createBookDialog = document.getElementById('createBookDialog');
        const createBookForm = createBookDialog.querySelector('form');
        const createBookFormButtons = createBookForm.querySelector('#formButtons');
        const confirmButton = createBookDialog.querySelector("#confirmButton");
    }

    clear() {
        while (tableElement.firstChild) {
            tableElement.removeChild(tableElement.firstChild);
        }
    }

    display(library) {
        library.forEach((book, rowIndex) => {
            const bookRow = book.buildRow();
            book.addControlsToRow(bookRow, rowIndex);
            tableElement.appendChild(bookRow);
        });
    }
}

class Library {
    static myLibrary = [];

    static add(book) {
        myLibrary.push(book);
    }

    static display() {
        ScreenController.clear();
        ScreenController.display(this.myLibrary);
    }
}

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        //Additional properties needed for associated HTMLElement and row index within the library
    }

    toggleRead() {
        this.read = !this.read;
    }

    buildRow() {
        const bookTitle = document.createElement('td');
        bookTitle.innerText = this.title;

        const bookAuthor = document.createElement('td');
        bookAuthor.innerText = this.author;

        const bookPages = document.createElement('td');
        bookPages.innerText = this.pages;

        const bookRead = document.createElement('td');
        bookRead.innerText = this.read ? 'Yes' : 'No';

        const bookRow = document.createElement('tr');
        bookRow.appendChild(bookTitle);
        bookRow.appendChild(bookAuthor);
        bookRow.appendChild(bookPages);
        bookRow.appendChild(bookRead);
        bookRow.appendChild(updateButtons);

        return bookRow;
    }

    addControlsToRow(rowElement, index) {
        const updateButtons = document.createElement('td');
        const deleteBookButton = document.createElement('button');
        const toggleReadStatusButton = document.createElement('button');

        deleteBookButton.innerText = 'Delete';
        deleteBookButton.dataset.bookIndex = index;
        deleteBookButton.onclick = () => {
            library.splice(deleteBookButton.dataset.bookIndex, 1);
            displayBooks();
        };

        toggleReadStatusButton.innerText = 'Toggle Read';
        toggleReadStatusButton.onclick = () => {
            book.toggleRead();
            displayBooks();
        };

        updateButtons.appendChild(deleteBookButton);
        updateButtons.appendChild(toggleReadStatusButton);
        rowElement.appendChild(updateButtons);
    }
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