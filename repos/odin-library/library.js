class ScreenController {
    static createBookButton; 
    static tableElement; 
    static createBookDialog; 
    static createBookForm; 
    static createBookFormButtons; 
    static confirmButton;

    static initialize() {
        createBookButton = document.getElementById('createBookButton');
        tableElement = document.querySelector('table');

        createBookDialog = document.getElementById('createBookDialog');
        createBookForm = createBookDialog.querySelector('form');
        createBookFormButtons = createBookForm.querySelector('#formButtons');
        cancelButton = createBookDialog.querySelector('#cancelButton');
        confirmButton = createBookDialog.querySelector("#confirmButton");
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
            Library.addBookFromForm(createBookForm);

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

    static addBookFromForm(formNode) {
        let formInputs = formNode.children;
        formInputs.forEach((formInput) => {
            this.add(new Book(formInput.title, formInput.author, formInput.pages, formInput.read));
        })
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

ScreenController.initialize();
Library.add(new Book('Test', 'Test', 'Test', true));
Library.display();