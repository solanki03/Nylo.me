'use strict';

const addEventOnElements = ($elements, eventType, callback) =>{
    $elements.forEach($element => {
        $element.addEventListener(eventType, callback);
    });
}

// ----- displays a greeting message based on the current hour of the day -----
const getGreetingMsg = (currentHour) =>{
    const greeting = 
    currentHour < 5 ? 'Night' :
    currentHour < 12 ? 'Morning' :
    currentHour < 15 ? 'Noon' :
    currentHour < 17 ? 'Afternoon' :
    currentHour < 20 ? 'Evening' :
    'Night';
    
    return `Good ${greeting}`;
}

export {
    addEventOnElements,
    getGreetingMsg
}