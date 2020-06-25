//book constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}
//UI Constructor

function UI() {

}

UI.prototype.addBookToList = function (book) {
    const list = document.getElementById('book-list');
    //create tr element
    const row = document.createElement('tr');
    //insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>

    `;
    list.appendChild(row);
};

UI.prototype.showAlert = function (message, className) {
    //create div
    const div = document.createElement('div');
    // add classname
    div.className = `alert ${className}`;
    //add text 
    div.appendChild(document.createTextNode(message));
    //get parent 
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    //insert alert
    container.insertBefore(div, form);
    //timeout after 3 secs
    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 3000);
};

UI.prototype.deleteBook = function (target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

//clear clearFields
UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';


}
//EventListeners for add book

document.getElementById('book-form').addEventListener('submit', function (event) {
    //get form values
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
    //instantiate book
    const book = new Book(title, author, isbn);

    //instantiate UI
    const ui = new UI();
    //validate
    if (title === '' || author === '' || isbn === '') {
        //console.log('nothing write down here');
        ui.showAlert('please fill in the fields', 'error');
    } else {
        //add book to list
        ui.addBookToList(book);
        //clear fields
        ui.clearFields();
        //show success
        ui.showAlert('Book successfully added', 'success');

    }



    event.preventDefault();
});

//event EventListeners for delete book
document.getElementById('book-list').addEventListener('click', function (event) {
    //instantiate UI
    const ui = new UI();
    ui.deleteBook(event.target);
    //show message
    ui.showAlert('Removed book', 'success');

    event.preventDefault();
});
