'use strict';

const addEventOnElements = ($elements, eventType, callback) => {
    if (NodeList.prototype.isPrototypeOf($elements) || Array.isArray($elements)) {
        // If $elements is a NodeList or an Array, iterate over it
        $elements.forEach($element => {
            $element.addEventListener(eventType, callback);
        });
    } else if ($elements instanceof Element) {
        // If $elements is a single element, add the event listener directly
        $elements.addEventListener(eventType, callback);
    } else {
        console.error("Invalid argument passed to addEventOnElements");
    }
};

// ----- displays a greeting message based on the current hour of the day -----
const getGreetingMsg = function (currentHour) {
    const greeting =
        currentHour < 5 ? 'Night' :
            currentHour < 12 ? 'Morning' :
                currentHour < 15 ? 'Noon' :
                    currentHour < 17 ? 'Afternoon' :
                        currentHour < 20 ? 'Evening' :
                            'Night';

    return `Good ${greeting}`;
}

let $lastActiveItem;

const activeNotebook = function () {
    // Deactivate the previously active item, if it exists
    if ($lastActiveItem) {
        $lastActiveItem.classList.remove('bg-[#FFDBCA]', 'dark:bg-[#5C4032]', 'active');
    }

    // Check if dark mode is active
    const isDarkMode = document.documentElement.classList.contains('dark');
    //console.log(isDarkMode);

    this.classList.add(isDarkMode ? ('bg-[#5C4032]', 'active') : ('bg-[#FFDBCA]', 'active'));

    // Update the last active item reference
    $lastActiveItem = this;
    //console.log(this);
    
};

// to edit the name of the notebook
const makeElementEditable = function ($element) {
    $element.setAttribute('contenteditable', true);
    $element.setAttribute('aria-live', 'polite');
    $element.focus();
};

// generates a unique ID based on the current timestamp
const generateID = function (){
    return new Date().getTime().toString();
};

// finds a notebook in database by its ID
const findNotebook = function (db, notebookId){
    return db.notebooks.find(notebook => notebook.id === notebookId);
};

// finds the index of a notebook in an array of notebooks based on it's ID
const findNotebookIndex = function (db, notebookId){
    return db.notebooks.findIndex(item => item.id === notebookId);
};

// converts a timestamp in milliseconds to a human-readable relative time string
// e.g., "Just now", "5 min ago", "3 hours ago", "2 days ago"
const getRelativeTime = function (milliseconds) {
    const currentTime = new Date().getTime();

    const minute = Math.floor((currentTime - milliseconds) / 1000 / 60);
    const hour = Math.floor(minute / 60);
    const day = Math.floor(hour / 24);

    return minute < 1
    ? 'Just now'
    : minute < 60
    ? `${minute} min ago`
    : hour < 24
    ? `${hour} hour ago`
    : `${day} day ago`;
}

// finds a specific note by its ID within a database of notebooks and their notes.
const findNote = (db, noteId) => {
    let note;
    for (const notebook of db.notebooks) {
        note = notebook.notes.find(note => note.id === noteId);
        if (note) break;
    }
    return note;
}

export {
    addEventOnElements,
    getGreetingMsg,
    activeNotebook,
    makeElementEditable,
    generateID,
    findNotebook,
    findNotebookIndex,
    getRelativeTime,
    findNote
};
