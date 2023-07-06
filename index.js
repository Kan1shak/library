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
        this.node.style.color = `${randomAccentColor(...this.color)}`;
        this.node.style.backgroundColor = `${colorToString  (...this.color)}`;
        this.read = false;
    }else{
        this.read = true;
        this.node.style.backgroundColor = 'rgb(196, 255, 196)';
        this.node.style.color = 'var(--text-color-dark)';
    }

    this.node.firstChild.querySelector('p:last-child').innerHTML = `<span class="book-label">Status: </span>${this.readStatus()}`;
}
//Delete a book
Book.prototype.deleteBook = function (){
    const index = myLibrary.indexOf(this);
    this.node.remove();
    myLibrary.splice(index,1)    
}
//Create a new book and add it to the library
function addBookToLibrary(title, author, pages, read){
    //Making object from given arguements
    const container = document.querySelector('.container');
    const color = randomColor();
    const accentColor = randomAccentColor(...color);
    const colorString = colorToString(...color);
    const newBook = new Book(title, author, pages, read, color);
    const bookId = `book${myLibrary.length}`;
    myLibrary.push(newBook);
    //creating the container div for the book
    const div = document.createElement('div');
    div.setAttribute('id', bookId);
    //styling the container div with random color
    div.style.borderColor = `${accentColor}`;
    div.style.backgroundColor = `${colorString}`;
    div.style.color = `${accentColor}`;
    div.addEventListener('mouseover', () => {
        if (newBook.read) {
            div.style.borderLeft = `0px solid var(--accent-color)`;
            div.style.boxShadow = `0px 0px 0px 5px var(--accent-color)`;
        } else {
            div.style.borderLeft = `0px solid ${accentColor}`;
            div.style.boxShadow = `0px 0px 0px 5px ${accentColor}`;
        }
    });
    div.addEventListener('mouseout', () => {
        if (newBook.read) {
            div.style.borderLeft = `10px solid var(--accent-color)`;
            div.style.boxShadow = `20px 17px 48px -27px var(--accent-color)`;
        } else {
            div.style.borderLeft = `10px solid ${accentColor}`;
            div.style.boxShadow = `20px 17px 48px -27px ${accentColor}`; 
        }
    });
    //creating the div that contains the details about the book
    const infoDiv = document.createElement('div');
    infoDiv.innerHTML = newBook.info();
    div.appendChild(infoDiv);
    //creating the checkbox and label for read status
    const div2 = document.createElement('div');
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.addEventListener('change', () => {
        newBook.changeRead()
        if (newBook.read) {
            div.style.boxShadow = `0px 0px 0px 5px var(--accent-color)`;
        }
        else {
            div.style.boxShadow = `0px 0px 0px 5px ${accentColor}`;
        }
    });
    div2.appendChild(checkbox);
    const label = document.createElement('label');
    label.innerHTML = 'Read';
    div2.appendChild(label);
    div.appendChild(div2);
    //appending the div to the container
    container.appendChild(div);
    newBook.node = div;
    const delBtn = document.createElement('button');
    //If the book is read
    if (newBook.read) {
        checkbox.setAttribute('checked', 'true');
        div.style.color = 'var(--text-color-dark)';
        div.style.backgroundColor = 'rgb(196, 255, 196)';
        div.style.borderLeft = `10px solid var(--accent-color)`;
        div.style.boxShadow = `20px 17px 48px -27px var(--accent-color)`;
    }
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


function randomColor() {
    let h = Math.floor(Math.random() * 360);
    const s = 100;
    const l = 88;
    const sign = Math.floor(Math.random() * 2);
    if (h > 75 && h < 150) {
        if (sign == 0) {
            h = h - 75;
        }
        else {
            h = h + 75;
        }
    }
    return [h,s,l];
}

function colorToString(h,s,l) {
    return `hsl(${h}, ${s}%, ${l}%)`;}


function randomAccentColor(h,s,l) {
    h = h + 10;
    s = s - 58;
    l = l - 45;
    if (h > 360) {
        h = h - 360;
    }
    return `hsl(${h}, ${s}%, ${l}%)`;
}