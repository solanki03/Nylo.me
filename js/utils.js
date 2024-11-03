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
        $lastActiveItem.style.backgroundColor = ''; 
    }

    // Check if dark mode is active
    const isDarkMode = document.documentElement.classList.contains('dark');

    // Apply the appropriate background class
    if (isDarkMode) {
        this.classList.add('dark:bg-[#5C4032]');
        this.style.backgroundColor = '#5C4032'; 
    } else {
        this.classList.add('bg-[#FFDBCA]');
        this.style.backgroundColor = '#FFDBCA'; 
    }

    // Update the last active item reference
    $lastActiveItem = this;
};

// to edit the name of the notebook
const makeElementEditable = function ($element) {
    $element.setAttribute('contenteditable', true);
    $element.setAttribute('aria-live', 'polite');
    $element.focus();
};

// generates a unique ID based on the current timestamp
const  generateID = function (){
    return new Date().getTime().toString();
}

export {
    addEventOnElements,
    getGreetingMsg,
    activeNotebook,
    makeElementEditable,
    generateID
};
