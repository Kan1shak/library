myLibrary = [];
function Book(title, author, pages, read, color){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.color = color;
}
//Return the books info
Book.prototype.info = function(){
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}, ${this.color}`;
}
//Chnage the read status
Book.prototype.changeRead = function(){
    if(this.read){
        this.read = false;
    }else{
        this.read = true;
    }
}
// //Change the color of the div the book is stored in
// Book.prototype.changeColor = function(color){
//     this.color = color;
// }
//Create a new book and add it to the library
function addBookToLibrary(title, author, pages, read, color){
    const newBook = new Book(title, author, pages, read, color);
    myLibrary.push(newBook);
}

//add the book to the page once the form is submitted
function addBooksToPage(myLibrary){
    const container = document.querySelector('.container');
    for (let i = 0; i < myLibrary.length; ++i){
        let exists = document.getElementById(`book${i}`);
        if(exists === null){
            const div = document.createElement('div');
            div.setAttribute('id', `book${i}`);
            div.innerText = myLibrary[i].info();
            div.style.border = `1px solid ${ myLibrary[i].color}`;
            container.appendChild(div);
        }
    }
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, 'not read', 'white');
addBooksToPage(myLibrary);

document.getElementById('add-book').addEventListener('click', () => addBooksToPage(myLibrary));

const form = document.getElementById('book-form');
form.addEventListener("submit", (e)=>{
    //Preventing page refresh
    e.preventDefault();
    const inputs = [...document.querySelectorAll('input')];
    book_info = inputs.map((input)=>{
        if(input.getAttribute('type')!= 'checkbox'){
            return input.value
        }
        else {
            return input.checked
        }
    })
    addBookToLibrary(...book_info);
    addBooksToPage(myLibrary);



});