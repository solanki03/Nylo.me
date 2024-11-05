'use strict';



const $overlay = document.createElement('div');
$overlay.classList.add('fixed', 'inset-0', 'z-20', 'bg-black', 'bg-opacity-50');

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


export { DeleteConfirmModal };