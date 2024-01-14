class Library {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
  }

  removeBook(title) {
    this.books = this.books.filter((book) => book.title !== title);
  }

  isInLibrary(title) {
    return this.books.some((book) => book.title === title);
  }
}

export default Library;
