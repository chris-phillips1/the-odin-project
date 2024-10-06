class ScreenController {
    static createBookButton; 
    static tableElement; 
    static createBookDialog; 
    static createBookForm; 
    static createBookFormButtons; 
    static confirmButton;

    static initialize() {
        this.createBookButton = document.getElementById('createBookButton');
        this.tableElement = document.querySelector('table');

        this.createBookDialog = document.getElementById('createBookDialog');
        this.createBookForm = this.createBookDialog.querySelector('form');
        this.createBookFormButtons = this.createBookForm.querySelector('#formButtons');
        this.cancelButton = this.createBookDialog.querySelector('#cancelButton');
        this.confirmButton = this.createBookDialog.querySelector("#confirmButton");
        this.setupEventHandlers();
    }

    static setupEventHandlers() {
        createBookButton.addEventListener('click', () => {
            this.createBookDialog.showModal();
        });

        cancelButton.addEventListener('click', () => {
            this.createBookDialog.close();
        })
        
        confirmButton.addEventListener('click', (event) => {
            event.preventDefault();
            this.createBookDialog.close();

            this.addBookFromForm();
            Library.display();
        });
    }

    static addBookFromForm() {
        this.createBookForm.childNodes.forEach((formItem) => {
            console.log(formItem);
        });
    }

    static addItemToForm(itemToAdd) {
        this.createBookForm.insertBefore(itemToAdd, this.createBookFormButtons);
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
    ScreenController.addItemToForm(formItem);
}

function buildBookForm() {
    createFormField('Title:', 'text', 'titleTextField');
    createFormField('Author:', 'text', 'authorTextField');
    createFormField('Pages:', 'number', 'pagesNumberField');
    createFormField('Read:', 'checkbox', 'readCheckboxField');
}

ScreenController.initialize();
buildBookForm();
Library.add(new Book('Test', 'Test', 'Test', true));
Library.display();