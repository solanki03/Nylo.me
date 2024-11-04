'use strict';

import { SidebarItem } from "./components/SidebarItem.js";
import { activeNotebook } from "./utils.js";

const $sidebarListItem = document.querySelector('[data-sidebar-list]');
const $notePanelTitle = document.querySelector('[data-note-panel-title]');

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
        }
    }
}