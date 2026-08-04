// =====================================
// POLIGLOTA PRESENTATION VIEWER
// viewer.js
// =====================================


const params = new URLSearchParams(
    window.location.search
);


const BOOK_ID = params.get("id");


if (!BOOK_ID) {

    alert("No book selected.");

    window.location.href = "index.html";

}



// CHANGE THIS TO YOUR REAL SUPABASE URL

const STORAGE_ROOT =
"https://YOUR_REAL_PROJECT.supabase.co/storage/v1/object/public/books/";



const BOOK_ROOT =
`${STORAGE_ROOT}${BOOK_ID}/`;



window.BOOK = {

    id: BOOK_ID,

    root: BOOK_ROOT,

    images: BOOK_ROOT + "images/",

    audio: BOOK_ROOT + "audio/",

    video: BOOK_ROOT + "video/"

};



console.log(window.BOOK);



// LOAD BOOK PRESENTATION SCRIPT

const script =
document.createElement("script");


script.src =
BOOK_ROOT + "js/script.js";



script.onload = function(){

    console.log(
        "Presentation Plus loaded:",
        BOOK_ID
    );

};



script.onerror = function(){

    console.error(
        "FAILED TO LOAD:",
        script.src
    );

};



document.head.appendChild(script);
