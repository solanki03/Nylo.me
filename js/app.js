'use strict';

import { addEventOnElements, getGreetingMsg, activeNotebook, makeElementEditable } from "./utils.js";

// ----- Toggle Sidebar in small screen -----
const $sideBar = document.querySelector('[data-sidebar]');
const $sideBarTogglers = document.querySelectorAll('[data-sidebar-toggler]');
const $overlay = document.querySelector('[data-sidebar-overlay]');

addEventOnElements($sideBarTogglers, 'click', () => {
    $sideBar.classList.toggle('-translate-x-full'); 
    $overlay.classList.toggle('hidden');     
});


// ----- show greeting message on home screen -----
const $greetElement = document.querySelector('[data-greeting]');
const currentHour = new Date().getHours();
$greetElement.textContent = getGreetingMsg(currentHour);


// ----- Show current date on homescreen -----
const $currentDateElement = document.querySelector('[data-current-data]');
$currentDateElement.textContent = new Date().toDateString().replace(' ',', ');


// ----- Notebook create field -----
const $sidebarList = document.querySelector('[data-sidebar-list]');
const $addNotebookbtn = document.querySelector('[data-add-notebook]');

const showNotebookField = () => {
    // Create a new note item   'bg-[#FFF8F6]', 'dark:bg-[#201A18]'
    const $item = document.createElement('div');
    $item.classList.add('flex', 'items-center', 'justify-between', 'p-3', 'rounded-3xl',  'hover:bg-[#FFDBCA]', 'hover:dark:bg-[#5C4032]', 'hover-container');
    
    // Add content to the new note item
    $item.innerHTML = `
        <p class="text-sm" data-notebook-field></p>
    `;

    // Append the new item to the sidebar list
    $sidebarList.appendChild($item);

    const $itemField = $item.querySelector('[data-notebook-field]');

    // Activate the newly created notebook and deactivate the previous one
    activeNotebook.call($item);

    // make notebook field editable and focus
    makeElementEditable($itemField);

    // when user pree "Enter" then create a notebook
    $itemField.addEventListener('keydown', createNoteBook);
}

// Attach event listener to the "add" button
$addNotebookbtn.addEventListener('click', showNotebookField);
