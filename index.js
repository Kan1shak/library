myLibrary = [];
//Constructor function for Books
function Book(title, author, pages, read, color,node){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.color = color;
    this.node = node;
}
//Return the books info in html format
Book.prototype.info = function(){
    return `<p><span class="book-label">Name:</span>${this.title} </p>
            <p><span class="book-label">Author:</span> ${this.author}</p>
            <p><span class="book-label">Pages:</span> ${this.pages}</p>
            <p><span class="book-label">Status:</span> ${this.readStatus()}</p>`;
}
//Get read status as plain text instead of true and false
Book.prototype.readStatus = function (){
    if(this.read){
        return "Completed"
    } else {
        return "In Progress"
    }
}
//Change the read status, also update the node with new status
Book.prototype.changeRead = function(){
    if(this.read){
        this.node.style.color = 'var(--text-color)';
        this.node.style.backgroundColor = 'var(--main-color)';
        this.read = false;
    }else{
        this.read = true;
        this.node.style.backgroundColor = 'rgb(196, 255, 196)';
        this.node.style.color = 'var(--text-color-dark)';
    }

    this.node.firstChild.querySelector('p:last-child').innerHTML = `<span class="book-label">Status: ${this.readStatus()}`;
}
//Delete a book
Book.prototype.deleteBook = function (){
    const index = myLibrary.indexOf(this);
    this.node.remove();
    myLibrary.splice(index,1)    
}
//Create a new book and add it to the library
function addBookToLibrary(title, author, pages, read, color){
    //Making object from given arguements
    const container = document.querySelector('.container');
    const newBook = new Book(title, author, pages, read, color);
    const bookId = `book${myLibrary.length}`;
    myLibrary.push(newBook);
    //creating the container div for the book
    const div = document.createElement('div');
    div.setAttribute('id', bookId);
    div.style.borderColor = `${color}`;
    //creating the div that contains the details about the book
    const infoDiv = document.createElement('div');
    infoDiv.innerHTML = newBook.info();
    div.appendChild(infoDiv);
    //creating the checkbox for the label
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.addEventListener('change', () => newBook.changeRead());
    div.appendChild(checkbox);
    //creating the label to select read status
    const label = document.createElement('label');
    label.innerHTML = 'Read';
    div.append(label);
    //appending the div to the container
    container.appendChild(div);
    newBook.node = div;
    const delBtn = document.createElement('button');
    //creating the delete buttonZ
    delBtn.innerText = 'Delete'
    delBtn.addEventListener('click', () => newBook.deleteBook());
    div.appendChild(delBtn)  
}

//Event listener to get the form data for book details
const form = document.getElementById('book-form');
form.addEventListener("submit", (e)=>{
    //Preventing page refresh
    e.preventDefault();
    book_info = [...document.querySelectorAll('input')].map((input)=>{
        if(input.getAttribute('type') != 'checkbox'){
            return input.value
        }
        //we need input.checked as input.value on checkboxes always returns 'on'
        else {
            return input.checked
        }
    })
    addBookToLibrary(...book_info);
});

const addBtn = document.getElementById('add-book');
addBtn.addEventListener('click', ()=>{
    document.getElementById('form-container').classList.toggle('active');
    document.querySelector('.overlay').classList.toggle('active');
});

document.body.addEventListener('click', (e)=>{
    if(e.target.classList.contains('overlay')){
        document.getElementById('form-container').classList.remove('active');
        document.querySelector('.overlay').classList.remove('active');
    }
});

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false, '');
addBookToLibrary('The Lord of the Rings', 'J.R.R. Tolkien', 1178, false, '');
addBookToLibrary('The Silmarillion', 'J.R.R. Tolkien', 365, false, '');
addBookToLibrary('The Children of Hurin', 'J.R.R. Tolkien', 313, false, '');
addBookToLibrary('The Fall of Gondolin', 'J.R.R. Tolkien', 304, false, '');
