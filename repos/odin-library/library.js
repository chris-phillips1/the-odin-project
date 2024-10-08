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
        this.buildBookCreationForm();
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
            this.clearForm();
            Library.display();
        });
    }

    static buildBookCreationForm() {
        this.createFormField('Title:', 'text', 'titleTextField');
        this.createFormField('Author:', 'text', 'authorTextField');
        this.createFormField('Pages:', 'number', 'pagesNumberField');
        this.createFormField('Read:', 'checkbox', 'readCheckboxField');
    }

    static createFormField(name, type, id) {
        const formItem = document.createElement('p');
        const formLabel = document.createElement('label');
        const formField = document.createElement('input');

        formLabel.innerText = name;
        formField.type = type;
        formField.id = id;

        formItem.appendChild(formLabel);
        formItem.appendChild(formField);
        this.addItemToForm(formItem);
    }

    static addBookFromForm() {
        const bookFields = {};
        const formItems = this.createBookForm.querySelectorAll('input');
        formItems.forEach((formItem) => {
            const formItemValue = formItem.value;

            switch (formItem.id) {
                case 'titleTextField':
                    bookFields.title = formItemValue;
                    break;
                case 'authorTextField':
                    bookFields.author = formItemValue;
                    break;
                case 'pagesNumberField':
                    bookFields.pages = formItemValue;
                    break;
                case 'readCheckboxField':
                    bookFields.read = formItem.checked;
                    break;
            }
        });

        Library.add(new Book(bookFields.title, bookFields.author, bookFields.pages, bookFields.read));
    }

    static addItemToForm(itemToAdd) {
        this.createBookForm.insertBefore(itemToAdd, this.createBookFormButtons);
    }

    static clearForm() {
        const formNodes = this.createBookForm.querySelectorAll('input');
        formNodes.forEach((node) => {
            if (node.type === 'checkbox') {
                node.checked = false;
            } else {
                node.value = '';
            }
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

ScreenController.initialize();
Library.display();