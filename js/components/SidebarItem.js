'use strict';

import { activeNotebook, makeElementEditable } from "../utils";
import { db } from "../db";
import { client } from "../client";
import { DeleteConfirmModal } from "./Modal";

const $notePanelTitle = document.querySelector('[data-note-panel-title]');

// It creates a navigation item representing a notebook. This item displays the notebook's name, 
// allows editing and deletion of the notebook, and handles click events to display its associated notes.
export const SidebarItem = function (id, name) {
    const $sidebarItem = document.createElement('div');
    $sidebarItem.classList.add('flex', 'items-center', 'justify-between', 'h-[44px]', 'p-3', 'rounded-3xl',  'hover:bg-[#FFDBCA]', 'hover:dark:bg-[#5C4032]', 'hover-container');
    $sidebarItem.setAttribute('data-notebook', id);

    $sidebarItem.innerHTML = `
    <p class="text-sm" data-notebook-field>${name}</p>
    <div>
        <button class="ri-edit-line mr-5" data-edit-btn></button>
        <button class="ri-delete-bin-6-line" data-delete-btn></button>
    </div>
    `;

    // handles the click event on the sidebar items. 
    // updates the note panel's title, retrieves the associated notes, and marks the item as active. 
    $sidebarItem.addEventListener('click', function () {
        $notePanelTitle.textContent = name;
        activeNotebook.call(this);

        const noteList = db.get.note(this.dataset.notebook);
        client.note.read(noteList);
    });

    // notebook edit functionality
    const $itemEditBtn = $sidebarItem.querySelector('[data-edit-btn]');
    const $itemField = $sidebarItem.querySelector('[data-notebook-field]'); 

    $itemEditBtn.addEventListener('click', makeElementEditable.bind(null, $itemField));

    $itemField.addEventListener('keydown', function(event){
        if(event.key === 'Enter'){
            this.removeAttribute('contenteditable');
            this.blur(); 

            // update edited data in database
            const updatedNotebookData = db.update.notebook(id, this.textContent);

            // render updated notebook
            client.notebook.update(id, updatedNotebookData);

        }
    });

    // notebook delete functionality
    const $itemDeleteBtn = $sidebarItem.querySelector('[data-delete-btn]');
    $itemDeleteBtn.addEventListener('click', function (){

        const modal = DeleteConfirmModal(name);
        modal.open();
        modal.onSubmit(function (isConfirm) {
            if (isConfirm){
                db.delete.notebook(id);
                client.notebook.delete(id);
            }
            modal.close();
        });
    });

    return $sidebarItem;
}