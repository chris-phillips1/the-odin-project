const myLibrary = [];
const tableElement = document.createElement('table');

function Book(title, author, pages, read) {
    this.title = title;
    this.author - author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        let bookInfo = title + ' by ' + author + ', ' + pages + ' pages, ';
        bookInfo = read ? bookInfo += 'read' : bookInfo += 'not read yet';
        return bookInfo;
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);

}

function displayBooks() {
    for (book in myLibrary) {
        const bookRow = document.createElement('tr');

        const bookTitle = document.createElement('td');
        bookTitle.innerText = book.title;
        const bookAuthor = document.createElement('td');
        bookAuthor.innerText = book.author;
        const bookPages = document.createElement('td');
        bookPages.innerText = book.pages;
        const bookRead = document.createElement('td');
        bookRead.innerText = book.read;

        bookRow.appendChild(bookTitle);
        bookRow.appendChild(bookAuthor);
        bookRow.appendChild(bookPages);
        bookRow.appendChild(bookRead);
        tableElement.appendChild(bookRow);
    }

}

addBookToLibrary(new Book('The Hobbit', 'J.R.R. Tolkien', 295, false));
displayBooks();