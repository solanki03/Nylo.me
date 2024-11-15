"use strict";

import { generateID, findNotebook, findNotebookIndex, findNote, findNoteIndex } from "./utils";

// database object
let nylomeDB = {};

// It initializes a local database. If the data exists in local storage, it is loaded.
// Otherwise, a new empty database structure is created and stored.

const initDB = function () {
    const db = localStorage.getItem("nylomeDB");

    if (db) {
        nylomeDB = JSON.parse(db);
    } else {
        // Initialize as an object with an empty notebooks array
        nylomeDB = { notebooks: [] };
        localStorage.setItem("nylomeDB", JSON.stringify(nylomeDB));
    }
};


initDB();

// reads and loads the localStorage data into the global variable 'nylomeDB'
const readDB = function(){
    nylomeDB = JSON.parse(localStorage.getItem('nylomeDB'));
}

// writes the current state of the global variable 'nylomeDB' to localStorage
const writeDB = function(){
    localStorage.setItem('nylomeDB', JSON.stringify(nylomeDB));
}

//Function for performing CRUD are -> get(retrieving), post(adding), update(updating) & delete(deleting).
// Database state is managed using global variables and localStorage.

export const db = {
    post: {
        // adds a new notebook to the database. takes name and returns object.
        notebook(name){
            readDB();
            
            const notebookData = {
                id: generateID(),
                name,
                notes: []
            }

            nylomeDB.notebooks.push(notebookData);  
            
            writeDB();

            return notebookData;
        },

        // adds a new note to a specified notebook in the database
        note(notebookId, object){
            readDB();

            const notebook = findNotebook(nylomeDB, notebookId);
            
            const noteData = {
                id: generateID(),
                notebookId,
                ...object,
                postedOn: new Date().getTime()
            }

            notebook.notes.unshift(noteData);

            writeDB();

            return noteData;
        }
    },

    get: {
        // retrieves all notebooks from the database
        notebook(){
            readDB();

            return nylomeDB.notebooks;
        },

        // retrieves all notes within a specified notebook
        note(notebookId) {
            readDB();

            const notebook = findNotebook(nylomeDB, notebookId);

            // Return an empty array if no notebook is found
            return notebook ? notebook.notes : [];       
        }
    },

    update: {
        // updates the name of a notebook in the database
        notebook(notebookId, name){
            readDB();

            const notebook = findNotebook(nylomeDB, notebookId);
            notebook.name = name;

            writeDB();
            return notebook;
        },

        // updates the content of a note in the database
        note(noteId, object) {
            readDB();

            const oldNote = findNote(nylomeDB, noteId);
            const newNote = Object.assign(oldNote, object);

            writeDB();

            return newNote;
        }
    },

    delete: {
        // deletes a notebook from the database
        notebook(notebookId){
            readDB();

            const notebookIndex = findNotebookIndex(nylomeDB, notebookId);
            nylomeDB.notebooks.splice(notebookIndex, 1);

            writeDB();
        },

        // deletes a note from a specified notebook in the database.
        note(notebookId, noteId){
            readDB();

            const notebook = findNotebook(nylomeDB, notebookId);
            const noteIndex = findNoteIndex(notebook, noteId);

            notebook.notes.splice(noteIndex, 1);

            writeDB();

            return notebook.notes;
        }
    }
}
