// =====================================
// CURRENT BOOK
// =====================================


const BOOK =
window.BOOK.id;



// =====================================
// SUPABASE STORAGE
// =====================================


const STORAGE =
window.BOOK.root;



// =====================================
// MEDIA PATH HELPERS
// =====================================


function image(file){

    return `${STORAGE}images/${file}`;

}



function audio(file){

    return `${STORAGE}audio/${file}`;

}



function video(file){

    return `${STORAGE}video/${file}`;

}

const slideImage = document.getElementById("slide-image");
const slideContainer = document.querySelector(".slide-container");
const homeBtn = document.getElementById("home-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
document.addEventListener("DOMContentLoaded", () => {
    });
const studentDropdownLinks = document.querySelectorAll("#students-book-dropdown a");
const activityDropdownLinks = document.querySelectorAll("#activity-book-dropdown a");
const dropdownBtns = document.querySelectorAll(".dropdown-btn");

const audioBtn = document.getElementById("audio-btn");
const audioListContainer = document.getElementById("audio-list-container");
const audioPlayer = document.getElementById("slide-audio");
const audioSource = document.getElementById("audio-source");
const hideAudioBtn = document.getElementById("hide-audio-btn");

// Show audio player and hide button
function showAudioPlayer() {
    audioPlayer.style.display = "block";
    hideAudioBtn.style.display = "inline-block";
}

// Hide audio player when hide button is clicked
hideAudioBtn.addEventListener("click", () => {
    audioPlayer.style.display = "none";
    hideAudioBtn.style.display = "none";
});
let currentImages = [];
let currentIndex = 0;
let currentScale = 1;

// ==========================
// SAVE CURRENT PAGE STATE
// ==========================
function saveCurrentState(bookType, unit, pageNum) {
    localStorage.setItem("pptkb1State", JSON.stringify({ bookType, unit, pageNum }));
}
// ==========================
// DROPDOWN TOGGLE
// ==========================
dropdownBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const parentDropdown = btn.parentElement;
        document.querySelectorAll('.dropdown').forEach(d => {
            if(d !== parentDropdown) d.classList.remove('show');
        });
        parentDropdown.classList.toggle('show');
    });
});

window.addEventListener("click", () => {
    document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('show'));
});

// ==========================
// LOAD IMAGE FUNCTION
// ==========================
function autoFitImage() {
    const containerWidth = slideContainer.clientWidth;
    const containerHeight = slideContainer.clientHeight;
    const imgWidth = slideImage.naturalWidth;
    const imgHeight = slideImage.naturalHeight;

    const scaleX = containerWidth / imgWidth;
    const scaleY = containerHeight / imgHeight;

    currentScale = Math.min(scaleX, scaleY);

    slideImage.style.width = imgWidth * currentScale + "px";
    slideImage.style.height = imgHeight * currentScale + "px";
}

function loadImage(src) {
    slideImage.onload = function() {
        autoFitImage();
    };
    slideImage.src = src;
}

// ==========================
// HOME PAGE
// ==========================
function loadHome() {
    currentImages = [];
    currentIndex = 0;
    loadImage(image("homepage.jpeg"));
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
}

// ==========================
// STUDENT BOOK
// ==========================
function loadStudentUnit(unitNumber) {
    currentImages = [];
    currentIndex = 0;

    const folderName = "unit_" + unitNumber;
    const basePath =
image(`student-book-pages/${folderName}/`);

    let pageNumbers = [];
    switch(unitNumber) {
        case "1": pageNumbers = [6,7,8,9,10,11]; break;
        case "2": pageNumbers = [12,13,14,15,16,17]; break;
        case "3": pageNumbers = [18,19,20,21,22,23,24,25]; break;
        case "4": pageNumbers = [26,27,28,29,30,31]; break;
        case "5": pageNumbers = [32,33,34,35,36,37]; break;
        case "6": pageNumbers = [38,39,40,41,42,43,44,45]; break;
        case "7": pageNumbers = [46,47,48,49,50,51]; break;
        case "8": pageNumbers = [52,53,54,55,56,57]; break;
        case "9": pageNumbers = [58,59,60,61,62,63,64,65]; break;
        case "10": pageNumbers = [66,67,68,69,70,71]; break;
        case "11": pageNumbers = [72,73,74,75,76,77]; break;
        case "12": pageNumbers = [78,79,80,81,82,83,84,85]; break;
        default: pageNumbers = []; break;
    }

    pageNumbers.forEach(num => {
        currentImages.push(basePath + "page" + num + ".JPG");
    });

    loadImage(currentImages[currentIndex]);
    prevBtn.style.display = "block";
    nextBtn.style.display = "block";
}

// ==========================
// ACTIVITY BOOK
// ==========================
function loadActivityUnit(unitNumber) {
    currentImages = [];
    currentIndex = 0;

    const folderName = "unit_" + unitNumber;
    const basePath = `images/activity-book-pages/${folderName}/`;

    let pageNumbers = [];
    switch(unitNumber) {
        case "1": pageNumbers = [106,107]; break;
        case "2": pageNumbers = [108,109]; break;
        case "3": pageNumbers = [110,111]; break;
        case "4": pageNumbers = [112,113]; break;
        case "5": pageNumbers = [114,115]; break;
        case "6": pageNumbers = [116,117]; break;
        case "7": pageNumbers = [118,119]; break;
        case "8": pageNumbers = [120,121]; break;
        case "9": pageNumbers = [122,123]; break;
        case "10": pageNumbers = [124,125]; break;
        case "11": pageNumbers = [126,127]; break;
        case "12": pageNumbers = [128,129]; break;
        default: pageNumbers = []; break;
    }

    pageNumbers.forEach(num => {
        currentImages.push(basePath + "page" + num + ".JPG");
    });

    if (currentImages.length > 1) {
        prevBtn.style.display = "block";
        nextBtn.style.display = "block";
    } else {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
    }

    loadImage(currentImages[currentIndex]);
}

// ==========================
// DROPDOWN EVENTS
// ==========================
studentDropdownLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const unit = link.getAttribute("data-unit");
        loadStudentUnit(unit);
        // Save state
        saveCurrentState(
            "student",
            unit,
            parseInt(currentImages[currentIndex].match(/page(\d+)/)[1])
        );
    });
});

activityDropdownLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const unit = link.getAttribute("data-unit");
        loadActivityUnit(unit);
        // Save state
        saveCurrentState(
            "activity",
            unit,
            parseInt(currentImages[currentIndex].match(/page(\d+)/)[1])
        );
    });
});

// ==========================
// NAVIGATION
// ==========================
prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        loadImage(currentImages[currentIndex]);
         // Save state
        saveCurrentState(
            currentImages[currentIndex].includes("student-book-pages") ? "student" : "activity",
            currentImages[currentIndex].match(/unit_(\d+)/)[1],
            currentImages[currentIndex].match(/page(\d+)/)[1]
        );
    }
});

nextBtn.addEventListener("click", () => {
    if (currentIndex < currentImages.length - 1) {
        currentIndex++;
        loadImage(currentImages[currentIndex]);
         // Save state
        saveCurrentState(
            currentImages[currentIndex].includes("student-book-pages") ? "student" : "activity",
            currentImages[currentIndex].match(/unit_(\d+)/)[1],
            currentImages[currentIndex].match(/page(\d+)/)[1]
        );
    }
});


// ==========================
// CTRL + WHEEL ZOOM
// ==========================
slideContainer.addEventListener("wheel", function(e) {
    if (!e.ctrlKey) return;
    e.preventDefault();

    if (e.deltaY < 0) currentScale += 0.1;
    else currentScale -= 0.1;
    if (currentScale < 0.1) currentScale = 0.1;

    slideImage.style.width = slideImage.naturalWidth * currentScale + "px";
    slideImage.style.height = slideImage.naturalHeight * currentScale + "px";

    resizeEditCanvas();
    
    function resizeEditCanvas(){

    const rect = slideImage.getBoundingClientRect();

    editCanvas.width = rect.width;
    editCanvas.height = rect.height;

    editCanvas.style.left = slideImage.offsetLeft + "px";
    editCanvas.style.top = slideImage.offsetTop + "px";

}
}, { passive: false });


// ==========================
// HOME BUTTON
// ==========================
homeBtn.addEventListener("click", function(e) {
    e.preventDefault();
    loadHome();
});

window.addEventListener("load", () => {
    const navigationEntries = performance.getEntriesByType("navigation");
    const isReload = navigationEntries.length > 0 && navigationEntries[0].type === "reload";

    if (isReload) {
        // Page was refreshed → restore previous state if exists
        const savedState = localStorage.getItem("pptkb1State");
        if (savedState) {
            const { bookType, unit, pageNum } = JSON.parse(savedState);
            if (bookType === "student") {
                loadStudentUnit(unit);
                currentIndex = currentImages.findIndex(src => src.includes(`page${pageNum}.JPG`));
                if (currentIndex >= 0) loadImage(currentImages[currentIndex]);
            } else if (bookType === "activity") {
                loadActivityUnit(unit);
                currentIndex = currentImages.findIndex(src => src.includes(`page${pageNum}.JPG`));
                if (currentIndex >= 0) loadImage(currentImages[currentIndex]);
            }
        } else {
            loadHome(); // fallback if nothing saved
        }
    } else {
        // First time opening → always Home
        loadHome();
    }
});

// ==========================
// AUDIO FUNCTIONALITY FOR ALL UNITS
// ==========================

audioBtn.addEventListener("click", function(e) {
    e.preventDefault();
    e.stopPropagation();
  // TOGGLE: hide if already visible
    if (audioListContainer.style.display === "flex") {
        audioListContainer.style.display = "none";
        return;
    }
    // Clear previous buttons
    audioListContainer.innerHTML = "";
    audioListContainer.style.display = "flex";

    if (currentImages.length === 0) return;

    const pageSrc = currentImages[currentIndex];

    // Determine if Student or Activity Book
    let bookType;
    if (pageSrc.includes("student-book-pages")) bookType = "student";
    else if (pageSrc.includes("activity-book-pages")) bookType = "activity";
    else return;

    // Extract unit number
    const unitMatch = pageSrc.match(/unit_(\d+)/i);
    if (!unitMatch) return;
    const unit = parseInt(unitMatch[1]);

    // Extract page number
    const pageMatch = pageSrc.match(/page(\d+)/i);
    if (!pageMatch) return;
    const pageNum = parseInt(pageMatch[1]);

    // Define audio tracks for all units (Student Book)
    const studentBookAudioTracks = {
        1: {8:["page8_Track_1.1"],9:["page9_Track_1.2","page9_Track_1.3"],10:["page10_Track_1.4"],},
        2: {13:["page13_Track_2.1"],15:["page15_Track_2.2"],16:["page16_Track_2.3"],},
        3: {19:["page19_Track_3.1"],20:["page20_Track_3.2"],21:["page21_Track_3.3","page21_Track_3.4"], 22:["page22_Track_3.5"],},
        4: {27:["page27_Track_4.1"],28:["page28_Track_4.2"],29:["page29_Track_4.3"],30:["page30_Track_4.4"],},
        5: {34:["page34_Track_5.1"],35:["page35_Track_5.2","page35_Track_5.3"],36:["page36_Track_5.4","page36_Track_5.5","page36_Track_5.6"],},
        6: {38:["page38_Track_6.1"],39:["page39_Track_6.1"],41:["page41_Track_6.2","page41_Track_6.3"],42:["page42_Track_6.4"],43:["page43_Track_6.5"],},
        7: {47:["page47_Track_7.1"],49:["page49_Track_7.2","page49_Track_7.3"],50:["page50_Track_7.4"],},
        8: {54:["page54_Track_8.1"],55:["page55_Track_8.2"],56:["page56_Track_8.3"],},
        9: {59:["page59_Track_9.1"],60:["page60_Track_9.2"],61:["page61_Track_9.3"],62:["page62_Track_9.4"],},
        10: {67:["page67_Track_10.1"],68:["page68_Track_10.2"],69:["page69_Track_10.3"],70:["page70_Track_10.4"],},
        11: {72:["page72_Track_11.1"],73:["page73_Track_11.1"],75:["page75_Track_11.2"],76:["page76_Track_11.3","page76_Track_11.4"],},
        12: {79:["page79_Track_12.1"],81:["page81_Track_12.2"],82:["page82_Track_12.3","page82_Track_12.4","page82_Track_12.5"],83:["page83_Track_12.6"]},
    };

    // Define audio tracks for all units (Activity Book)
    const activityBookAudioTracks = {
       
    };

    // Pick the correct track list
    let tracks;
    if (bookType === "student") tracks = studentBookAudioTracks[unit] ? studentBookAudioTracks[unit][pageNum] || [] : [];
    else tracks = activityBookAudioTracks[unit] ? activityBookAudioTracks[unit][pageNum] || [] : [];

    if (tracks.length === 0) {
        ;
        return;
    }

    // Create buttons for each track
    tracks.forEach(track => {
        const btn = document.createElement("button");
        const trackNumber = track.split("_")[2]; // get number
        btn.textContent = `Audio ${trackNumber}`;

        btn.addEventListener("click", () => {
            const folder = bookType === "student" ? "student_book_audios" : "activity_book_audios";
            audioSource.src =
audio(`${folder}/unit_${unit}/${track}.mp3`);
            audioPlayer.load();
            showAudioPlayer(); // <-- use the new function
            audioPlayer.controls = true;
        });

        audioListContainer.appendChild(btn);
    });
});

// Hide audio list if click outside
window.addEventListener("click", () => {
    audioListContainer.style.display = "none";
});
// ==========================
// VIDEO FUNCTIONALITY FOR UNIT 1
// ==========================

const videoBtn = document.querySelector('a img[alt="Videos"]').parentElement;
const videoListContainer = document.createElement("div");
videoListContainer.id = "video-list-container";
document.body.appendChild(videoListContainer);

const videoPlayer = document.getElementById("slide-video");
const videoSource = document.getElementById("video-source");
const hideVideoBtn = document.getElementById("hide-video-btn");

// Show video player and hide button
function showVideoPlayer() {
    videoPlayer.style.display = "block";
    hideVideoBtn.style.display = "inline-block";
}

// Hide video player when hide button is clicked
hideVideoBtn.addEventListener("click", () => {
    videoPlayer.pause();
    videoPlayer.style.display = "none";
    hideVideoBtn.style.display = "none";
});

// Double-click to toggle fullscreen
videoPlayer.addEventListener("dblclick", () => {
    if (!document.fullscreenElement) {
        videoPlayer.requestFullscreen().catch(err => console.log(err));
    } else {
        document.exitFullscreen();
    }
});

// Define videos for Unit 1
const unitVideos = {
    3: {
        24: ["BR2e_Int_V1_1"],
        25: ["BR2e_Int_V1_2"]
    },
    6: {
        44: ["BR2e_Int_V2_1", "BR2e_Int_V2_2"],
        45: ["BR2e_Int_V2_3","BR2e_Int_V2_4","BR2e_Int_V2_5"]
    },
    9: {
        64: ["BR2e_Int_V3_1", "BR2e_Int_V3_2"],
        65: ["BR2e_Int_V3_3", "BR2e_Int_V3_4", "BR2e_Int_V3_5", "BR2e_Int_V3_6"]
    },
    12: {
        84: ["BR2e_Int_V4_1", "BR2e_Int_V4_2"],
        85: ["BR2e_Int_V4_2", "BR2e_Int_V4_3"]
    }
};



// Click event for video icon (Student Book only)
videoBtn.addEventListener("click", function(e) {
    e.preventDefault();
    e.stopPropagation();
   // TOGGLE: hide if already visible
    if (videoListContainer.style.display === "flex") {
        videoListContainer.style.display = "none";
        return;
    }

    // Clear previous buttons
    videoListContainer.innerHTML = "";
    videoListContainer.style.display = "flex";

    if (currentImages.length === 0) return;

    const pageSrc = currentImages[currentIndex];

    // ONLY show videos for Student Book pages
    if (!pageSrc.includes("student-book-pages")) return; // <- key change

    // Extract unit number
    const unitMatch = pageSrc.match(/unit_(\d+)/i);
    if (!unitMatch) return;
    const unit = parseInt(unitMatch[1]);

    // Extract page number
    const pageMatch = pageSrc.match(/page(\d+)/i);
    if (!pageMatch) return;
    const pageNum = parseInt(pageMatch[1]);

    // Get videos for this page
    const tracks = unitVideos[unit] ? unitVideos[unit][pageNum] || [] : [];

    if (tracks.length === 0) return; // <- do nothing if no videos

    tracks.forEach((track, index) => {
        const btn = document.createElement("button");
        btn.textContent = `Video ${index + 1}`;

        btn.addEventListener("click", () => {
            videoSource.src = video(`unit_${unit}/${track}.mp4`);
            videoPlayer.load();
            showVideoPlayer();
        });

        videoListContainer.appendChild(btn);
    });
});

// Hide video list if click outside
window.addEventListener("click", () => {
    videoListContainer.style.display = "none";
});


