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
const navbar = document.querySelector("#navbar__list");

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

//checks if the section start is in the (offset*100)% top of the viewport
const isInViewport = (node, offset) => {
    const elementBoundings = node.getBoundingClientRect();
    // using -50 as offsetTop cause sometimes when scrollingTo clicking in navbar the node dont go at 0
    return (elementBoundings.top >= -50) && (elementBoundings.top <= window.innerHeight*offset);
}

//adds classes to current section and navbar element and removes the old ones
const setActiveSection = (node) => {
    sections.forEach(section => {
        section.classList.remove("active");
    });
    navbar.querySelectorAll("li").forEach((menuEntry) => {
        menuEntry.classList.remove("active");
    });
    const sectionId = node.id;
    document.querySelector(`[data-section='${sectionId}']`).classList.add("active");
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
    sections.forEach((section, idx) => {
        const li = document.createElement('li');
        li.setAttribute("data-section", section.id);
        li.textContent = section.getAttribute("data-nav");
        if (idx === 0) {
            li.classList.add("active");
        }
        fragment.appendChild(li);
    });
    navbar.appendChild(fragment);
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
navbar.addEventListener("click", scrollToSection);

// Set sections as active
window.addEventListener('scroll', checkActiveSection);
