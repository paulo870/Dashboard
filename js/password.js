
const params =
new URLSearchParams(window.location.search);


const bookID =
params.get("id");



const book =
books.find(
item=>item.id === bookID
);



if(!book){


alert("Book not found");


window.location.href="index.html";


}






document
.getElementById("bookCover")
.src =
book.cover;



document
.getElementById("bookTitle")
.textContent =
book.title;







document
.getElementById("openButton")
.onclick=function(){



const input =
document.getElementById("bookPassword");



const error =
document.getElementById("errorMessage");




if(input.value !== book.password){


error.textContent =
"Incorrect password";


return;


}



window.location.href =
"viewer.html?id=" + book.id;



};
