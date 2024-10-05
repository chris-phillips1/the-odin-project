class ScreenController {
    static createBookButton;
    static tableElement;

    static initialize() {
        this.createBookButton = document.getElementById('createBookButton');
        this.tableElement = document.querySelector('table');
    }

    static setupEventHandlers() {
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
    }

    static clear() {
        while (this.tableElement.firstChild) {
            this.tableElement.removeChild(this.tableElement.firstChild);
        }
    }

    static display(library) {
        library.forEach((book, rowIndex) => {
            const bookRow = book.buildRow(rowIndex);
            this.tableElement.appendChild(bookRow);
        });
    }
}

class Library {
    static library = [];

    static add(book) {
        this.library.push(book);
    }

    static remove(index) {
        this.library.splice(index, 1);
    }

    static display() {
        ScreenController.clear();
        ScreenController.display(this.library);
    }

    static buildDialog() {
        const createBookDialog = document.getElementById('createBookDialog');
        const createBookForm = createBookDialog.querySelector('form');
        const createBookFormButtons = createBookForm.querySelector('#formButtons');
        const confirmButton = createBookDialog.querySelector("#confirmButton");
    }
}

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

    buildRow(index) {
        const rowElement = document.createElement('tr');
        const bookPropertyNames = Object.getOwnPropertyNames(this);

        bookPropertyNames.forEach((bookPropertyName) => {
            const bookPropertyValue = this[bookPropertyName];
            const propertyElement = document.createElement('td');
            propertyElement.innerText = bookPropertyValue;
            rowElement.appendChild(propertyElement);
        });

        this.buildRowControls(rowElement, index);

        return rowElement;
    }

    buildRowControls(rowElement, index) {
        const updateButtons = document.createElement('td');
        const deleteBookButton = document.createElement('button');
        const toggleReadStatusButton = document.createElement('button');

        deleteBookButton.innerText = 'Delete';
        deleteBookButton.dataset.bookIndex = index;
        deleteBookButton.addEventListener('click', () => {
            Library.remove(deleteBookButton.dataset.bookIndex);
            Library.display();
        });

        toggleReadStatusButton.innerText = 'Toggle Read';
        toggleReadStatusButton.addEventListener('click', () => {
            this.toggleRead();
            Library.display();
        });

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

// buildBookForm();
ScreenController.initialize();
Library.buildDialog();
Library.add(new Book('Test', 'Test', 'Test', true));
Library.display();