'use strict';

import { SidebarItem } from "./components/SidebarItem.js";
import { activeNotebook } from "./utils.js";

const $sidebarListItem = document.querySelector('[data-sidebar-list]');
const $notePanelTitle = document.querySelector('[data-note-panel-title]');
const $notePanel = document.querySelector('[data-note-panel]');

// The client object manages interaction with the UI to create, read, update, and delete notebooks and notes. 
// It provides functions for performing these operations & updating the UI accordingly.

export const client = {
    notebook: {
        // creates a new notebook in the UI, based on the provided notebook data
        create(notebookData){
            const $item = SidebarItem(notebookData.id, notebookData.name);
            $sidebarListItem.appendChild($item);
            activeNotebook.call($item);
            $notePanelTitle.textContent = notebookData.name;
        },

        // reads and displays a list of notebooks in the UI
        read(notebookList){
            notebookList.forEach((notebookData, index) => {
                const $item = SidebarItem(notebookData.id, notebookData.name);

                if(index === 0){
                    activeNotebook.call($item);
                    $notePanelTitle.textContent = notebookData.name;
                }

                $sidebarListItem.appendChild($item);
            });
        },

        // updates the UI to reflect changes in a notebook
        update(notebookId, notebookData){
            const $oldNotebook = document.querySelector(`[data-notebook="${notebookId}"]`);
            const $newNotebook = SidebarItem(notebookData.id, notebookData.name);

            $notePanelTitle.textContent = notebookData.name;
            $sidebarListItem.replaceChild($newNotebook, $oldNotebook);
            activeNotebook.call($newNotebook);
        },

        // deletes a notebook from the UI
        delete(notebookId){
            const $deletedNotebook = document.querySelector(`[data-notebook="${notebookId}"]`);
            const $activateItem = $deletedNotebook.nextElementSibling ?? $deletedNotebook.previousElementSibling;

            if($activateItem){
                $activateItem.click();
            } else {
                $notePanelTitle.innerHTML = '';
                //$notePanel.innerHTML = '';
            }

            $deletedNotebook.remove();
        }
    },

    note: {
        // creates a new note card in the UI based on provided note data
        create(noteData) {

            // append card in notePanel
            const $card = Card();
        }
    }
}