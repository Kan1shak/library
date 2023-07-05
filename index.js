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
            <p><span class="book-label">Read:</span> ${this.readStatus()}</p>`;
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
        this.node.style.backgroundColor = 'gray';
        this.read = false;
    }else{
        this.read = true;
        this.node.style.backgroundColor = 'green';
    }

    this.node.firstChild.querySelector('p:last-child').innerHTML = `<span class="book-label">Read: ${this.readStatus()}`;
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
    //creating the label to select read status
    const label = document.createElement('label');
    label.innerHTML = ' read?';
    div.append(label);
    //creating the checkbox for the label
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.addEventListener('change', () => newBook.changeRead());
    div.appendChild(checkbox);
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