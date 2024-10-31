'use strict';

import { addEventOnElements, getGreetingMsg } from "./utils.js";

// ----- Toggle Sidebar in small screen -----
const $sideBar = document.querySelector('[data-sidebar]');
const $sideBarTogglers = document.querySelectorAll('[data-sidebar-toggler]');
const $overlay = document.querySelector('[data-sidebar-overlay]');

addEventOnElements($sideBarTogglers, 'click', () => {
    $sideBar.classList.toggle('-translate-x-full'); 
    $overlay.classList.toggle('hidden');     
});


// ----- show greeting message on home screen -----
const $greetElement = document.querySelector('[data-greeting]');
const currentHour = new Date().getHours();
$greetElement.textContent = getGreetingMsg(currentHour);


// ----- Show current date on homescreen -----
const $currentDateElement = document.querySelector('[data-current-data]');
$currentDateElement.textContent = new Date().toDateString().replace(' ',', ');


// ----- Notebook create field ----- 
const $sidebarList = document.querySelector('[data-sidebar-list]');
const $addNotebookbtn = document.querySelector('[data-add-notebook]');

const showNootbookField = () =>{
    const $item = document.createElement('div');
    $item.classList.add('nav-item');

    $item.innerHTML = ``;
}

$addNotebookbtn.addEventListener('click', showNootbookField);