'use strict';

import { SidebarItem } from "./components/SidebarItem.js";
import { activeNotebook } from "./utils.js";
import { Card } from "./components/Card.js";

const $sidebarListItem = document.querySelector('[data-sidebar-list]');
const $notePanelTitle = document.querySelector('[data-note-panel-title]');
const $notePanel = document.querySelector('[data-note-panel]');
const $noteCreateBtn = document.querySelector('[data-note-create-btn]');

const emptyNotesTemplate = `
        <div class="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center select-none">
            <i class="ri-sticky-note-line text-6xl opacity-25"></i>
            <h3 class="opacity-25 text-xl font-semibold">No notes</h3>
        </div>
`;


// enables or disables "New note" button based on whether there are any notebooks
const disableNoteCreateBtn = function (isThereAnyNotebooks) {
    $noteCreateBtn.disabled = !isThereAnyNotebooks;
}


// The client object manages interaction with the UI to create, read, update, and delete notebooks and notes. 
// It provides functions for performing these operations & updating the UI accordingly.
export const client = {
    notebook: {
        // creates a new notebook in the UI, based on the provided notebook data
        create(notebookData) {
            const $item = SidebarItem(notebookData.id, notebookData.name);
            $sidebarListItem.appendChild($item);
            activeNotebook.call($item);
            $notePanelTitle.textContent = notebookData.name;
            $notePanel.innerHTML = emptyNotesTemplate;
            disableNoteCreateBtn(true);
        },

        // reads and displays a list of notebooks in the UI
        read(notebookList) {
            disableNoteCreateBtn(notebookList.length);
            notebookList.forEach((notebookData, index) => {
                const $item = SidebarItem(notebookData.id, notebookData.name);

                if (index === 0) {
                    activeNotebook.call($item);
                    $notePanelTitle.textContent = notebookData.name;
                }

                $sidebarListItem.appendChild($item);
            });
        },

        // updates the UI to reflect changes in a notebook
        update(notebookId, notebookData) {
            const $oldNotebook = document.querySelector(`[data-notebook="${notebookId}"]`);
            const $newNotebook = SidebarItem(notebookData.id, notebookData.name);

            $notePanelTitle.textContent = notebookData.name;
            $sidebarListItem.replaceChild($newNotebook, $oldNotebook);
            activeNotebook.call($newNotebook);
        },

        // deletes a notebook from the UI
        delete(notebookId) {
            const $deletedNotebook = document.querySelector(`[data-notebook="${notebookId}"]`);
            const $activateItem = $deletedNotebook.nextElementSibling ?? $deletedNotebook.previousElementSibling;

            if ($activateItem) {
                $activateItem.click();
            } else {
                $notePanelTitle.innerHTML = '';
                $notePanel.innerHTML = '';
                disableNoteCreateBtn(false);
            }

            $deletedNotebook.remove();
        }
    },

    note: {
        // creates a new note card in the UI based on provided note data
        create(noteData) {
            // clear 'emptyNotesTemplate' from notePanel if  there is no note exists
            if(!$notePanel.querySelector('[data-note]')){
                $notePanel.innerHTML = '';
            }

            // append card in notePanel
            const $card = Card(noteData);
            $notePanel.prepend($card);
        },

        // reads and displays a list of notes in the UI
        read(noteList) {
            if (noteList.length) {
                $notePanel.innerHTML = '';

                noteList.forEach(noteData => {
                    const $card = Card(noteData);
                    $notePanel.appendChild($card);
                });
            } else {
                $notePanel.innerHTML = emptyNotesTemplate;
            }

        },

        // updates a note card in the UI based on provided note data.
        update(noteId, noteData) {
            const $oldCard = document.querySelector(`[data-note="${noteId}"]`);
            const $newCard = Card(noteData);
            $notePanel.replaceChild($newCard, $oldCard);
        },

        // Delete a note card from the UI
        delete(noteId, isNoteExists) {
            document.querySelector(`[data-note="${noteId}"]`).remove();
            if(!isNoteExists) {
                $notePanel.innerHTML = emptyNotesTemplate;
            }
        }
    }
}