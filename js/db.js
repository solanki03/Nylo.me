"use strict";

import { generateID, findNotebook, findNotebookIndex } from "./utils";

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
            return notebook.notes;       /**Uncaught TypeError: Cannot read properties of undefined (reading 'notes')
            at Object.note (db.js:92:29)
            at renderExistedNote (app.js:111:33)
            at app.js:118:1 */
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
        }
    },

    delete: {
        // deletes a notebook from the database
        notebook(notebookId){
            readDB();

            const notebookIndex = findNotebookIndex(nylomeDB, notebookId);
            nylomeDB.notebooks.splice(notebookIndex, 1);

            writeDB();
        }
    }
}
