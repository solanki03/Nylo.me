'use strict';

// Function to toggle the theme and icons
const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    const newTheme = isDark ? 'dark' : 'light';

    // Store theme in local storage
    localStorage.setItem('theme', newTheme);

    // Toggle icons based on the new theme
    const moonIcon = document.querySelector('.ri-moon-line');
    const sunIcon = document.querySelector('.ri-sun-line');

    if (isDark) {
        moonIcon.classList.add('hidden');
        sunIcon.classList.remove('hidden');
    } else {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    }
};

// Initialize the theme based on stored preference or system setting
const storedTheme = localStorage.getItem('theme');
const systemThemeIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = storedTheme ?? (systemThemeIsDark ? 'dark' : 'light');

// Set initial theme and icon visibility
document.documentElement.classList.toggle('dark', initialTheme === 'dark');
window.addEventListener('DOMContentLoaded', () => {
    const $themeBtn = document.querySelector('[data-theme-btn]');
    const moonIcon = document.querySelector('.ri-moon-line');
    const sunIcon = document.querySelector('.ri-sun-line');

    if ($themeBtn) {
        $themeBtn.addEventListener('click', toggleTheme);

        // Set initial icon visibility based on initial theme
        if (initialTheme === 'dark') {
            moonIcon.classList.add('hidden');
            sunIcon.classList.remove('hidden');
        } else {
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        }
    }
});
