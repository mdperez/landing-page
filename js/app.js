/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const buildNav = () => {
    let fragment = document.createDocumentFragment();
    document.querySelectorAll("section").forEach(section => {
        console.log(section);
        const li = document.createElement('li');
        li.setAttribute("data-section", section.id);
        li.textContent = section.getAttribute("data-nav");
        fragment.appendChild(li);
    });
    document.querySelector("#navbar__list").appendChild(fragment);
};

// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNav();
// Scroll to section on link click

// Set sections as active


