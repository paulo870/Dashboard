let selectedBook = null;

let currentFilter = "all";



// ELEMENTS

const booksContainer =
document.getElementById("booksContainer");


const recentBooks =
document.getElementById("recentBooks");


const searchInput =
document.getElementById("searchInput");


const modal =
document.getElementById("passwordModal");


const modalCover =
document.getElementById("modalCover");


const modalTitle =
document.getElementById("modalTitle");


const modalInfo =
document.getElementById("modalInfo");


const passwordInput =
document.getElementById("passwordInput");


const passwordError =
document.getElementById("passwordError");





// LOAD BOOKS

function loadBooks(){


    displayBooks(books);

    displayRecent();


}


loadBooks();






// DISPLAY BOOKS

function displayBooks(list){


    booksContainer.innerHTML="";


    list.forEach(book=>{


        const card =
        document.createElement("div");


        card.className="book-card";



        card.innerHTML = `


        <img
        class="book-cover"
        src="${book.cover}">



        <div class="book-details">


        <h3>
        ${book.title}
        </h3>


        <p>
        ${book.category}
        </p>



        <button class="open-btn">

        Open Book

        </button>



        </div>


        `;



        card
        .querySelector(".open-btn")
        .onclick = () => {


            openPassword(book);


        };



        booksContainer.appendChild(card);


    });


}







// SEARCH


searchInput.oninput=function(){


const value =
this.value.toLowerCase();



const filtered =
books.filter(book =>


book.title
.toLowerCase()
.includes(value)


);



displayBooks(filtered);



};









// PASSWORD MODAL


function openPassword(book){


selectedBook = book;


modalCover.src =
book.cover;


modalTitle.textContent =
book.title;


modalInfo.textContent =
book.category;



passwordInput.value="";


passwordError.textContent="";


modal.classList.add("show");


}







document
.getElementById("closeModal")
.onclick=function(){


modal.classList.remove("show");


};








document
.getElementById("openBook")
.onclick=function(){



if(passwordInput.value !== selectedBook.password){


passwordError.textContent =
"Incorrect password";


return;


}



saveRecent(selectedBook);



window.location.href =
"password.html?id=" + selectedBook.id;



};








// RECENT BOOKS


function saveRecent(book){


let recent =
JSON.parse(
localStorage.getItem("recent") || "[]"
);



recent =
recent.filter(
item=>item.id !== book.id
);



recent.unshift(book);



recent =
recent.slice(0,5);



localStorage.setItem(
"recent",
JSON.stringify(recent)
);


}







function displayRecent(){


let recent =
JSON.parse(
localStorage.getItem("recent") || "[]"
);



recentBooks.innerHTML="";



recent.forEach(book=>{


const img =
document.createElement("img");



img.src =
book.cover;


img.className =
"book-cover";



img.onclick =
()=>openPassword(book);



recentBooks.appendChild(img);



});


}
