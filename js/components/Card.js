'use strict';

import { getRelativeTime } from "../utils";

// creates a HTML card element representing a note based on provided note data
export const Card = function (noteData) {

    const { id, title, text, postedOn, notebookId } = noteData;

    const $card = document.createElement('div');
    $card.classList.add('bg-[#EDE0DB]', 'dark:bg-[#181210]', 'p-4', 'border-2', 'border-[#85736B]', 'dark:border-[#52443D]', 'rounded-2xl', 'cursor-pointer', 'hover:bg-[#D7C2B9]', 'hover:dark:bg-[#2e2b2b]', 'hover:border-[#645c58]', 'hover-container', 'flex', 'flex-col');
    $card.setAttribute('data-note', id);

    $card.innerHTML = `
        <h3 class="text-[#2B160A] dark:text-[#D7C2B9] text-wrap mb-3">${title}</h3>
        <p class="mb-4 overflow-hidden line-clamp-4">${text}</p>

        <div class="flex items-center justify-between mt-auto text-sm">
            <p>${getRelativeTime(postedOn)}</p>
            <button class="hover:hover-container">
                <i class="ri-delete-bin-5-line rounded-full p-2 hover:bg-[#FFDBCA] hover:dark:bg-[#5C4032]"></i>
            </button>
        </div>
    `;

    return $card;
}