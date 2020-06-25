class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
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

    }
    showAlert(message, className) {
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

    }
    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }

    }
    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';

    }
}

// LocalStorage Class
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;

    }
    static displayBooks() {
        const books = Store.getBooks();
        books.forEach(function (book) {
            const ui = new UI();

            //add book to UI
            ui.addBookToList(book);
        });

    }
    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBook(isbn) {
        const books = Store.getBooks();
        books.forEach(function (book, index) {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

//Dom Load event 
document.addEventListener('DOMContentLoaded', Store.displayBooks);

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
        //add to LocalStorage
        Store.addBook(book);

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
    //remove from localStorage
    Store.removeBook(event.target.parentElement.previousElementSibling.textContent);

    //show message
    ui.showAlert('Removed book', 'success');

    event.preventDefault();
});