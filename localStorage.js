import Library from "./library.js";
import Book from "./book.js";

let library;
function initializeApp() {
  const libraryString = localStorage.getItem("library");
  // test if there is existent data (library)
  if (libraryString) {
    library = JSON.parse(libraryString);
    library = Object.assign(new Library(), library);
  } else {
    // create an instance of library
    library = new Library();
    // create some instances of books
    const book1 = new Book("The Hobbit", "J. R. R. Tolkien", 300);
    library.addBook(book1);
    console.log(library);
  }
  return library;
}

function saveDataToStorage() {
  const libraryString = JSON.stringify(library);
  localStorage.setItem("library", libraryString);
}

export { initializeApp };
export { saveDataToStorage };
