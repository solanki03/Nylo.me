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
/*
const activeNotebook = function (item) {
    // Deactivate the previously active item, if it exists
    $lastActiveItem?.classList.remove('bg-[#FFDBCA]','dark:bg-[#5C4032]');

    // Activate the current item
    this.classList.add('bg-[#FFDBCA]','dark:bg-[#5C4032]');     // this: $item

    // Update the last active item reference
    $lastActiveItem = this;     // this: $item
}
*/

const activeNotebook = function () {
    // Deactivate the previously active item, if it exists
    if ($lastActiveItem) {
        $lastActiveItem.classList.remove('bg-[#FFDBCA]', 'dark:bg-[#5C4032]');
        $lastActiveItem.style.backgroundColor = ''; // Reset inline style
    }

    // Check if dark mode is active
    const isDarkMode = document.documentElement.classList.contains('dark');

    // Apply the appropriate background class
    if (isDarkMode) {
        this.classList.add('dark:bg-[#5C4032]');
        this.style.backgroundColor = '#5C4032'; // Apply inline style for dark mode
    } else {
        this.classList.add('bg-[#FFDBCA]');
        this.style.backgroundColor = '#FFDBCA'; // Apply inline style for light mode
    }

    // Update the last active item reference
    $lastActiveItem = this;
};


const makeElementEditable = function ($element) {
    $element.setAttribute('contenteditable', true);
    $element.focus();
};

export {
    addEventOnElements,
    getGreetingMsg,
    activeNotebook,
    makeElementEditable
};
