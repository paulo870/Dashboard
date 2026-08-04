// =====================================
// POLIGLOTA PRESENTATION VIEWER
// =====================================


// GET BOOK ID

const params =
new URLSearchParams(
window.location.search
);


const BOOK_ID =
params.get("id");



if(!BOOK_ID){

    alert("No book selected.");

    window.location.href="index.html";

}




// =====================================
// SUPABASE STORAGE
// =====================================


const STORAGE_ROOT =
"https://YOUR_PROJECT.supabase.co/storage/v1/object/public/books/";



const BOOK_ROOT =
`${STORAGE_ROOT}${BOOK_ID}/`;





// =====================================
// BOOK PATHS
// =====================================


window.BOOK = {


id: BOOK_ID,


root: BOOK_ROOT,


images:
BOOK_ROOT + "images/",


audio:
BOOK_ROOT + "audio/",


video:
BOOK_ROOT + "video/",


js:
BOOK_ROOT + "js/"



};




console.log(
"Loading book:",
BOOK.id
);



console.log(
"Book path:",
BOOK.root
);






// =====================================
// PATH HELPER
// =====================================


window.bookFile=function(file){


return BOOK.root + file;


};






// =====================================
// LOAD BOOK SCRIPT
// =====================================


const bookScript =
document.createElement("script");



bookScript.src =
BOOK.js + "script.js";



bookScript.onload=function(){


console.log(
"Presentation Plus loaded:",
BOOK.id
);


};



bookScript.onerror=function(){


console.error(
"Could not load:",
bookScript.src
);


};




document.body.appendChild(
bookScript
);
