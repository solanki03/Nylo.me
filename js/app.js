'use strict';

import { addEventOnElements, getGreetingMsg, activeNotebook, makeElementEditable } from "./utils.js";
import { db } from "./db.js";
import { client } from "./client.js";
import { NoteModal } from "./components/Modal.js";

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
    // Create a new note item 
    const $item = document.createElement('div');
    $item.classList.add('flex', 'items-center', 'justify-between', 'h-[44px]', 'p-3', 'rounded-3xl',  'hover:bg-[#FFDBCA]', 'hover:dark:bg-[#5C4032]', 'hover-container', 'active');
    
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

const createNoteBook = function(event) {
    if (event.key === 'Enter') {
        // Create and store a new notebook
        const notebookData = db.post.notebook(this.textContent || 'Untitled'); // 'this' refers to $itemField

        // Remove the temporary input element
        this.parentElement.remove();

        // Render the new item in the sidebar
        client.notebook.create(notebookData);
    }
};

// Renders the existing notebook list by retrieving data from the database and passing it to the client
const renderExistedNotebook = function (){
    const  notebookList = db.get.notebook();
    client.notebook.read(notebookList);
    
}

renderExistedNotebook();


// ----- Create a new Note -----  
const $noteCreateBtn = document.querySelector('[data-note-create-btn]');

addEventOnElements($noteCreateBtn, 'click', function () {
    // create and open a new modal
    const modal = NoteModal();
    modal.open();

    // handle the submission of the new note to the database and client
    modal.onSubmit(noteObj => {
        const activeNotebookId = document.querySelector('[data-notebook].active').dataset.notebook;
        
        const noteData = db.post.note(activeNotebookId, noteObj);
        client.note.create(noteData);

        modal.close();
    })
});


// Renders existing notes in the active notebook. Retrieves note data from the database based on
// the database based on the active notebook's ID and uses the client to display the notes. 
const renderExistedNote = function () {
    const activeNotebookId = document.querySelector('[data-notebook].active')?.dataset.notebook;

    if (activeNotebookId) {
        const noteList = db.get.note(activeNotebookId);

        if (noteList) { // Only proceed if noteList exists
            client.note.read(noteList);
        } else {
            console.log("No notes found in the active notebook.");
        }
    } else {
        console.log("No active notebook found.");
    }
};

renderExistedNote();
