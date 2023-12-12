"use strict"

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

class Book {
  constructor(title,author,pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = false;
  }
}

class Ui {
  constructor() {
    this.addBookBtn = document.querySelector(".add-book");
    this.dialog = document.querySelector(".dialog");
    this.inputTitle = document.getElementById("title");
    this.inputAuthor = document.getElementById("author");
    this.inputPages = document.getElementById("pages");
    this.insertBookBtn = document.getElementById("add");
    this.cardContainer = document.querySelector(".card-container");
    this.closeModalBtn = document.getElementById("close");
    this.error = document.getElementById("error");
  }

  init() {
    this.addBookBtn.addEventListener("click", this.showDialog);
    this.closeModalBtn.addEventListener("click", this.closeDialog);
    this.insertBookBtn.addEventListener("click", this.createBook);
  }

  createBook = (e) => {
    e.preventDefault();
    let title = this.inputTitle.value;
    let author = this.inputAuthor.value;
    let pages = this.inputPages.value;
  
    if (pages <= 0 || pages % 1 !== 0) {
      this.throwIntegerError();
    } else if (!library.isInLibrary(title) && title && author && pages > 0) {
      const book = new Book(title,author,pages);
      library.addBook(book);
      this.createCard(book);
      this.closeDialog();
      this.resetInput();
    }
  }

  throwIntegerError()  {
    this.error.textContent = "Only enter positive integers.";
  }

  createCard(book) {
    const card = this.createCardElement();
    const titleDiv = this.createTitleElement(book);
    const authorDiv = this.createAuthorElement(book);
    const pagesDiv = this.createPagesElement(book);
    const readDiv = this.createReadElement(book);
    const removeButton = this.createRemoveButton();
    this.appendElementsToCard(titleDiv,authorDiv,pagesDiv,card,readDiv,removeButton);
    this.cardContainer.appendChild(card);
    this.listen();
  }

  closeDialog = () => {
    this.dialog.close();
  }

  showDialog = () => {
    console.log(this.dialog);
    this.dialog.showModal();
  }

  createCardElement() {
    const card = document.createElement("div");
    card.classList.add("card");
    return card;
  }
  
  createTitleElement(book) {
    const titleDiv = document.createElement("p");
    titleDiv.textContent = `Title: ${book.title}`;
    return titleDiv;
  }

  createAuthorElement(book) {
    const authorDiv = document.createElement("p");
    authorDiv.textContent = `Author: ${book.author}`;
    return authorDiv;
  }

  createPagesElement(book) {
    const pagesDiv = document.createElement("p");
    pagesDiv.textContent = `Pages: ${book.pages}`;
    return pagesDiv;
  }

  createReadElement() {
    const readDiv = document.createElement("div");
    readDiv.classList.add("read-container");
    const readLabel = document.createElement("label");
    readLabel.classList.add("read-label");
    const checkbox = document.createElement("input");
    checkbox.setAttribute("class","read");
    checkbox.setAttribute("id","read");
    checkbox.setAttribute("type","checkbox");
    readLabel.textContent = `Read?`;
    readLabel.appendChild(checkbox);
    readDiv.appendChild(readLabel);
    return readDiv;
  }

  createRemoveButton() {
    const remBtn = document.createElement("button");
    remBtn.classList.add("remove-button");
    remBtn.textContent = "remove book";
    return remBtn;
  }

  appendElementsToCard(titleDiv,authorDiv,pagesDiv,card,readDiv,removeButton) {
    card.appendChild(titleDiv);
    card.appendChild(authorDiv);
    card.appendChild(pagesDiv);
    card.appendChild(readDiv);
    card.appendChild(removeButton);
  }

  listen() {
    const readCheckbox = document.querySelectorAll(".read");
    readCheckbox.forEach((check) => {
      check.addEventListener("change", this.changeReadStatus);
    });
  
    const removeButtons = document.querySelectorAll(".remove-button");
    removeButtons.forEach((button) => {
      button.addEventListener("click", this.clickRemoveButton);
    });
  }

  changeReadStatus = (e) => {
    const readCard = e.target.closest(".card");
    readCard.classList.toggle("is-read");
    this.updateBook(readCard);
    console.log(library);
  }

  updateBook(element) {
    let cardContainerArray = Array.from(this.cardContainer.children); // creates an array from card container children (iterable)
    let index = cardContainerArray.indexOf(element) -1 ; // the "add new book" card is index 0
    library.books[index].isRead = !library.books[index].isRead;
  }

  clickRemoveButton = (e) => {
    const card = e.target.closest(".card");
    this.removeBook(card);
    card.remove();
  }

  removeBook(element) {
    let cardContainerArray = Array.from(this.cardContainer.children);
    let index = cardContainerArray.indexOf(element) -1 ;
    let title = library.books[index].title;
    library.removeBook(title);
  }

  resetInput () {
    this.inputTitle.value = "";
    this.inputAuthor.value = "";
    this.inputPages.value = "";
  }
}

const library = new Library();
const ui = new Ui();
ui.init();
