
const params = new URLSearchParams(window.location.search);

const BOOK_ID = params.get("id");

if (!BOOK_ID) {

    alert("No book selected.");

    window.location.href = "index.html";

}

const STORAGE =
"https://BR-Intermediate.supabase.co/storage/v1/object/public/books/" +
BOOK_ID + "/";
