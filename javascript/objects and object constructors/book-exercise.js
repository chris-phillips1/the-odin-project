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

theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);

console.log(theHobbit.info());