import fs from "fs";
import path from "path";


const booksFolder = "./books";

const outputFile = "./books/library.json";


let books = [];



const folders = fs.readdirSync(booksFolder);



folders.forEach(folder => {


    const fullPath =
        path.join(
            booksFolder,
            folder
        );


    if (
        fs.statSync(fullPath).isDirectory()
    ) {


        const cover =
            path.join(
                booksFolder,
                folder,
                "images",
                "homepage.jpeg"
            );


        const bookIndex =
            path.join(
                booksFolder,
                folder,
                "index.html"
            );



        // Only add valid books

        if (
            fs.existsSync(cover)
            &&
            fs.existsSync(bookIndex)
        ) {


            books.push({

                title: folder,

                folder: folder,

                cover:
                `books/${folder}/images/homepage.jpeg`,

                path:
                `books/${folder}/index.html`,

                password:
                "1234"

            });


        }


    }


});



fs.writeFileSync(

    outputFile,

    JSON.stringify(
        books,
        null,
        4
    )

);



console.log(
    `Library created: ${books.length} books`
);
