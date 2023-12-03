const cardContainer = document.querySelector(".card-container");

const myLibrary = []

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
}

function addBookToLibrary(book) {
    myLibrary.push(book)
}

function insertBook(book) {
    const card = document.createElement("div");
    card.classList.add("card");
    let pTitle = document.createElement("p");
    let pAuthor = document.createElement("p");
    let pPages = document.createElement("p");
    pTitle.textContent = `Title: ${book.title}`;
    pAuthor.textContent = `Author: ${book.author}`;
    pPages.textContent = `Pages: ${book.pages.toString()}`;
    let remBtn = document.createElement("button");
    remBtn.classList.add("remove-button");
    remBtn.textContent = "remove book";
    card.appendChild(pTitle);
    card.appendChild(pAuthor);
    card.appendChild(pPages);
    card.appendChild(remBtn);
    cardContainer.appendChild(card);   
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
    } else if (title.value != false && author.value != false && pages.value != false) {
        dialog.close();
        const book = new Book(title.value,author.value,pages.value)
        addBookToLibrary(book);
        insertBook(book);
        resetInput(title,author,pages);
    }
});

function resetInput(t,a,p) {
    t.value = "";
    a.value = "";
    p.value = "";
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
    let indexToRemove = myLibrary.findIndex((book) => book.name === card.children[0].textContent.slice(7) && book.author === card.children[1].textContent.slice(8) && book.pages === card.children[2].textContent.slice(7));
    myLibrary.splice(indexToRemove,1)
}

Book.prototype.read = function () {
    
}

