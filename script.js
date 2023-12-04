const cardContainer = document.querySelector(".card-container");
const myLibrary = []

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;
}

Book.prototype.isRead = function() {
    this.read = !this.read;
}

function addBookToLibrary(book) {
    myLibrary.push(book)
}

function insertBook(book) {
    const card = createCard();

    let pTitle = document.createElement("p");
    let pAuthor = document.createElement("p");
    let pPages = document.createElement("p");
    pTitle.textContent = `Title: ${book.title}`;
    pAuthor.textContent = `Author: ${book.author}`;
    pPages.textContent = `Pages: ${book.pages.toString()}`;

    let dRead = createReadContainer();
 
    let check = createCheckbox();
    check.addEventListener("change", () => {
        const index = Array.from(cardContainer.children).indexOf(card) - 1; // the "add book" button is in a card and has index 0
        const bookToUpdate = myLibrary[index];
        bookToUpdate.isRead();
        changeStyleIfRead(check);
      });
    dRead.appendChild(check);

    let remBtn = createRemoveButton();

    card.appendChild(pTitle);
    card.appendChild(pAuthor);
    card.appendChild(pPages);
    card.appendChild(dRead);
    card.appendChild(remBtn);
    cardContainer.appendChild(card);   
}

function createCard() {
    const card = document.createElement("div");
    card.classList.add("card");
    return card;
}

function createReadContainer() {
    let dRead = document.createElement("div");
    dRead.classList.add("read-container");
    let lRead = document.createElement("label");
    lRead.textContent = "Read?";
    lRead.setAttribute("for", "read");
    dRead.appendChild(lRead);
    return dRead;
}

function createCheckbox() {
    let check = document.createElement("input");
    check.setAttribute("type","checkbox");
    check.setAttribute("id","read");
    return check;
}

function createRemoveButton() {
    let remBtn = document.createElement("button");
    remBtn.classList.add("remove-button");
    remBtn.textContent = "remove book";
    return remBtn;
}

// modal
const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");

showButton.addEventListener("click", () => {
    dialog.showModal();
});

closeButton.addEventListener("click", () => {
    dialog.close();
});

const addBtn = document.getElementById("add");
addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let title = document.getElementById("title");
    let author = document.getElementById("author");
    let pages = document.getElementById("pages");
    if (pages.value%1 != 0) {
        throwIntegerError();
    } else if (title.value && author.value && pages.value) {
        dialog.close();
        const book = new Book(title.value,author.value,pages.value)
        addBookToLibrary(book);
        insertBook(book);
        resetInput(title,author,pages);
    }
});

function resetInput(title,author,pages) {
    title.value = "";
    author.value = "";
    pages.value = "";
}

function throwIntegerError() {
    pages.value = "";
    pages.setAttribute("placeholder", "only enter integers");
}

const removeButtons = document.querySelectorAll(".remove-button");
cardContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-button")) {
      const card = e.target.closest(".card");
      if (card) {
        card.remove();
        removeBook(card);
      }
    }
});

function removeBook(card) {
    let indexToRemove = myLibrary.findIndex((book) => 
    book.name === card.children[0].textContent.slice(7) && 
    book.author === card.children[1].textContent.slice(8) && 
    book.pages === card.children[2].textContent.slice(7));

    myLibrary.splice(indexToRemove,1)
}


function changeStyleIfRead(c) {
    c.parentElement.parentElement.classList.toggle("is-read");
}