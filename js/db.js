"use strict";

import { generateID, findNotebook } from "./utils";

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
        }
    },

    get: {
        // retrieves all notebooks from the database
        notebook(){
            readDB();

            return nylomeDB.notebooks;
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
    }
}
