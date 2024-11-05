'use strict';

const addEventOnElements = ($elements, eventType, callback) => {
    $elements.forEach($element => {
        $element.addEventListener(eventType, callback);
    });
}

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
        $lastActiveItem.classList.remove('bg-[#FFDBCA]', 'dark:bg-[#5C4032]');
    }

    // Check if dark mode is active
    const isDarkMode = document.documentElement.classList.contains('dark');
    //console.log(isDarkMode);

    this.classList.add(isDarkMode ? 'bg-[#5C4032]' : 'bg-[#FFDBCA]');

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


export {
    addEventOnElements,
    getGreetingMsg,
    activeNotebook,
    makeElementEditable,
    generateID,
    findNotebook,
    findNotebookIndex
};
