// =====================================
// POLIGLOTA PRESENTATION VIEWER
// viewer.js
// =====================================


// GET BOOK ID

const params = new URLSearchParams(
    window.location.search
);


const BOOK_ID = params.get("id");


if (!BOOK_ID) {

    alert("No book selected.");

    window.location.href = "index.html";

}




// =====================================
// SUPABASE STORAGE
// =====================================


const STORAGE_ROOT =
"https://vjzcwbvyfnnwsuaxeauw.supabase.co/storage/v1/object/public/books/";



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
    BOOK_ROOT + "video/"


};



console.log("BOOK OPENED:");
console.log(window.BOOK);




// =====================================
// LOAD PRESENTATION SCRIPT FROM GITHUB
// =====================================


const script =
document.createElement("script");


// script.js stays inside your GitHub project
script.src =
"js/script.js";



script.onload = function(){


    console.log(
        "Presentation Plus loaded successfully"
    );


};



script.onerror = function(){


    console.error(
        "Could not load Presentation Plus script"
    );


};



document.body.appendChild(script);
