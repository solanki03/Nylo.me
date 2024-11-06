'use strict';


const $overlay = document.createElement('div');
$overlay.classList.add('fixed', 'inset-0', 'z-20', 'bg-black', 'bg-opacity-50');

// Creates and manages a modal for adding or editing notes.
// The modal allows users to input a note's title and text, and provides functionality to submit and save the note.
const NoteModal = function (title = 'Untitled', text = 'Add your note...', time = '') {

    const $modal = document.createElement('div');
    $modal.classList.add('fixed', 'top-1/2', 'left-1/2', '-translate-x-1/2', '-translate-y-1/2', 'w-96', 'max-w-[560px]', 'p-6', 'rounded-2xl', 'bg-[#FFDBCA]', 'shadow-[#85736B]', 'dark:bg-[#3A3330]', 'dark:shadow-[#110d0b]', 'shadow-md', 'z-50', 'modal-motion');

    $modal.innerHTML = `
        <button class="absolute top-4 right-4" data-close-btn>
            <i class="ri-close-line"></i>
        </button>

        <input type="text" placeholder="Untitled" value="${title}" data-note-field 
            class="pe-10 pl-2 py-1 max-h-12 mb-4 bg-transparent rounded-md focus:outline-none focus:ring-[#A08D84] focus:ring-2" />
        <textarea placeholder="Take a note..." data-note-field 
            class="bg-transparent min-h-60 max-h-[600px] w-full overflow-y-auto p-2 rounded-md focus:outline-none focus:ring-[#A08D84] focus:ring-2">${text}</textarea>

        <div class="flex items-center justify-between mt-2">
            <p>${time}</p>
            <button data-submit-btn 
                class="dark:text-[#FFB690] font-medium px-6 py-2 rounded-3xl cursor-pointer hover:bg-[#e78355] hover:text-[#FBEEE9] hover:shadow-[#85736B] hover:dark:bg-[#FFB690] hover:dark:text-[#181210] hover:dark:shadow-[#201A18] hover:shadow-md hover:transition-opacity disabled:cursor-not-allowed disabled:opacity-50">
                Save
            </button>
        </div>
    `;

    const $submitBtn = $modal.querySelector('[data-submit-btn]');
    $submitBtn.disabled = true;

    const [$titleField, $textField] = $modal.querySelectorAll('[data-note-field]');

    const enableSubmit = function () {
        $submitBtn.disabled = !$titleField.value && !$textField.value;
    }

    $textField.addEventListener('keyup', enableSubmit);
    $titleField.addEventListener('keyup', enableSubmit);

    // open a new modal by appending it to the document body and setting focus on the title field
    const open = function () {
        document.body.appendChild($modal);
        document.body.appendChild($overlay);
        $titleField.focus();
    }

    // close the note modal by removing it from the document body 
    const close = function () {
        document.body.removeChild($modal);
        document.body.removeChild($overlay);
    }

    // attach click event the closeBtn, when click call the close modal function
    const $closeBtn = $modal.querySelector('[data-close-btn]');
    $closeBtn.addEventListener('click', close);

    // handles the submission of a note within the modal
    const onSubmit = function (callback) {

        $submitBtn.addEventListener('click', function () {
            const noteData = {
                title: $titleField.value,
                text: $textField.value
            }

            callback(noteData);
        });
    }

    return { open, close, onSubmit };
}


// creates and manages modal for confirming the deletion of an item. 
const DeleteConfirmModal = function (title){
    const $modal = document.createElement('div');
    $modal.classList.add('fixed', 'top-1/2', 'left-1/2', '-translate-x-1/2', '-translate-y-1/2', 'w-96', 'max-w-[560px]', 'p-6', 'rounded-2xl', 'bg-[#FFDBCA]','dark:bg-[#3A3330]', 'shadow-[#85736B]', 'dark:shadow-[#110d0b]', 'shadow-md', 'z-50', 'modal-motion');

    $modal.innerHTML = `
        <h3>Are you sure you want to delete <strong>"${title}"</strong>?</h3>
        <div class="flex items-center justify-end mt-2">
            <button  
                class="dark:text-[#FFB690] font-medium px-5 py-2 mr-1 rounded-3xl cursor-pointer hover:bg-[#FFB690] hover:dark:bg-[#52443D] hover:shadow-[#85736B] hover:dark:shadow-[#201A18] hover:shadow-md hover:transition-opacity" 
                data-action-btn="false"
            >
                Cancel
            </button>
            <button 
                class="bg-[#FFB690] text-[#181210] font-medium px-5 py-2 rounded-3xl cursor-pointer hover:shadow-[#85736B] hover:dark:shadow-[#201A18] hover:shadow-md hover:transition-opacity" 
                data-action-btn="true" 
            >
                Delete
            </button>
        </div>
    `;
    
    // opens the delete confirmation modal by appending it to the document body
    const open = function () {
        document.body.appendChild($modal);
        document.body.appendChild($overlay);
    }

    //closes the delte confirmation modal by removing it from the document body
    const close = function (){
        document.body.removeChild($modal);
        document.body.removeChild($overlay);
    }

    const $actionBtns = $modal.querySelectorAll('[data-action-btn]');

    // handles the submission of the delete confirmation
    const onSubmit = function (callback) {
        $actionBtns.forEach($btn => $btn.addEventListener('click', 
            function () {
                const isConfirm = this.dataset.actionBtn === 'true' ? true : false;

                callback(isConfirm);
            }
        ));
    }
    
    return { open, close, onSubmit };
}


export { DeleteConfirmModal, NoteModal };