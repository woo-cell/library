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

const library = new Library();

// retrieveing HTML elements
const addBookBtn = document.querySelector(".add-book");
const dialog = document.querySelector(".dialog");
const inputTitle = document.getElementById("title");
const inputAuthor = document.getElementById("author");
const inputPages = document.getElementById("pages");
const insertBookBtn = document.getElementById("add");
const cardContainer = document.querySelector(".card-container");
const closeModalBtn = document.getElementById("close");
const error = document.getElementById("error");

// logic
const createBook = (e) => {
  e.preventDefault();
  let title = inputTitle.value;
  let author = inputAuthor.value;
  let pages = inputPages.value;

  if (pages <= 0 || pages % 1 !== 0) {
    throwIntegerError();
  } else if (!library.isInLibrary(title) && title && author && pages > 0) {
    const book = new Book(title,author,pages);
    library.addBook(book);
    createCard(book);
    closeDialog();
    resetInput();
  }
}

const changeReadStatus = (e) => {
  const readCard = e.target.closest(".card");
  readCard.classList.toggle("is-read");
  updateBook(readCard);
}

const updateBook = (element) => {
  let cardContainerArray = Array.from(cardContainer.children); // creates an array from card container children (iterable)
  let index = cardContainerArray.indexOf(element) -1 ; // the "add new book" card is index 0
  library.books[index].isRead = !library.books[index].isRead;
}

const clickRemoveButton = (e) => {
  const card = e.target.closest(".card");
  removeBook(card);
  card.remove();
}

const removeBook = (element) => {
  let cardContainerArray = Array.from(cardContainer.children);
  let index = cardContainerArray.indexOf(element) -1 ;
  let title = library.books[index].title;
  library.removeBook(title);
}

// ui
const showDialog = () => {
  dialog.showModal();
}

const closeDialog = () => {
  dialog.close();
}

const resetInput = () => {
  inputTitle.value = "";
  inputAuthor.value = "";
  inputPages.value = "";
}

const throwIntegerError = () => {
  error.textContent = "Only enter positive integers.";
}

const createCard = (book) => {
  const card = createCardElement();
  const titleDiv = createTitleElement(book);
  const authorDiv = createAuthorElement(book);
  const pagesDiv = createPagesElement(book);
  const readDiv = createReadElement(book);
  const removeButton = createRemoveButton();
  appendElementsToCard(titleDiv,authorDiv,pagesDiv,card,readDiv,removeButton);
  cardContainer.appendChild(card);
  listen();
}

const createCardElement = () => {
  const card = document.createElement("div");
  card.classList.add("card");
  return card;
}

const createTitleElement = (book) => {
  const titleDiv = document.createElement("p");
  titleDiv.textContent = `Title: ${book.title}`;
  return titleDiv;
}

const createAuthorElement = (book) => {
  const authorDiv = document.createElement("p");
  authorDiv.textContent = `Author: ${book.author}`;
  return authorDiv;
}

const createPagesElement = (book) => {
  const pagesDiv = document.createElement("p");
  pagesDiv.textContent = `Pages: ${book.pages}`;
  return pagesDiv;
}

function createRemoveButton() {
  const remBtn = document.createElement("button");
  remBtn.classList.add("remove-button");
  remBtn.textContent = "remove book";
  return remBtn;
}

const createReadElement = () => {
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

const appendElementsToCard = (titleDiv,authorDiv,pagesDiv,card,readDiv,removeButton) => {
  card.appendChild(titleDiv);
  card.appendChild(authorDiv);
  card.appendChild(pagesDiv);
  card.appendChild(readDiv);
  card.appendChild(removeButton);
}

const listen = () => {
  const readCheckbox = document.querySelectorAll(".read");
  readCheckbox.forEach((check) => {
    check.addEventListener("change", changeReadStatus);
  });

  const removeButtons = document.querySelectorAll(".remove-button");
  removeButtons.forEach((button) => {
    button.addEventListener("click", clickRemoveButton);
  });
}

// event listeners
addBookBtn.addEventListener("click", showDialog);
closeModalBtn.addEventListener("click", closeDialog);
insertBookBtn.addEventListener("click", createBook);

