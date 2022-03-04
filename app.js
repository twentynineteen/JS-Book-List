// book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI constructor
function UI() {}
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById("book-list");
  // create tr
  const row = document.createElement("tr");
  // insert cols
  row.innerHTML = `<td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">x</a></td>`;

  list.appendChild(row);
};

// Show alert
UI.prototype.showAlert = function (message, className) {
  // consturct elements
  const div = document.createElement("div");
  // add classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));

  // get parent
  const container = document.querySelector(".container");
  const form = document.querySelector("#book-form");
  // insert alert
  container.insertBefore(div, form);
  // disappear after 3 seconds
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
};

// delete book
UI.prototype.deleteBook = function (target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

// Clear fields
UI.prototype.clearFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

// Event listener for add book
document.getElementById("book-form").addEventListener("submit", function (e) {
  // get form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;
  // instantiate book class
  const book = new Book(title, author, isbn);

  // instantiate UI
  const ui = new UI();

  // Validate
  if (title === "" || author === "" || isbn === "") {
    // Alert error
    ui.showAlert("Please fill in all fields", "error");
  } else {
    // add book to list
    ui.addBookToList(book);

    // Show success
    ui.showAlert("Book Added!", "success");

    //clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

// Event Listener for delete
document.getElementById("book-list").addEventListener("click", function (e) {
  // Instantiate UI
  const ui = new UI();
  // delete book row
  ui.deleteBook(e.target);
  // show alert
  ui.showAlert("Book Removed!", "success");

  e.preventDefault();
});
