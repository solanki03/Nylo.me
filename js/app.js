'use strict';

import { addEventOnElements } from "./utils.js";

// ----- Toggle Sidebar in small screen -----

const $sideBar = document.querySelector('[data-sidebar]');
const $sideBarTogglers = document.querySelectorAll('[data-sidebar-toggler]');
const $overlay = document.querySelector('[data-sidebar-overlay]');

addEventOnElements($sideBarTogglers, 'click', () => {
    $sideBar.classList.toggle('-translate-x-full'); 
    $overlay.classList.toggle('hidden');     
});