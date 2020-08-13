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
const sections = document.querySelectorAll("section");

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

//check if the section start is in the (offset*100)% top of the viewport
const isInViewport = (node, offset) => {
    const elementBoundings = node.getBoundingClientRect();
    return (elementBoundings.top >= 0) && (elementBoundings.top <= window.innerHeight*offset);
}

const setActiveSection = (node) => {
    sections.forEach(section => {
        section.classList.remove("active");
    });
    node.classList.add("active");
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const buildNav = () => {
    let fragment = document.createDocumentFragment();
    sections.forEach(section => {
        const li = document.createElement('li');
        li.setAttribute("data-section", section.id);
        li.textContent = section.getAttribute("data-nav");
        fragment.appendChild(li);
    });
    document.querySelector("#navbar__list").appendChild(fragment);
};

// Add class 'active' to section when near top of viewport
const checkActiveSection = (event) => {
    sections.forEach((section, idx) => {
        if (isInViewport(section, 0.5)) {
            setActiveSection(section);
        };
    });
}

// Scroll to anchor ID using scrollTO event
const scrollToSection = (event) => {
    const target = event.target;
    if (target.tagName !== "UL") {
        const section = target.getAttribute("data-section");
        window.scrollTo(0, document.querySelector(`#${section}`).offsetTop);
    };
}


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNav();
// Scroll to section on link click
document.querySelector("#navbar__list").addEventListener("click", scrollToSection);

// Set sections as active
window.addEventListener('scroll', checkActiveSection);
