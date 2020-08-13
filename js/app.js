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
const html = document.querySelector("html");
const sections = document.querySelectorAll("section");
const navbar = document.querySelector("#navbar__list");
const header = document.querySelector(".page__header");
const topButton = document.querySelector(".button__top");

let timer;

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

// Reset the timeout to check the time without scroll
const hideMenu = (e) => {
    clearTimeout(timer);
    header.classList.remove("hidden");
    timer = setTimeout(() => {
        header.classList.add("hidden");
    }, 3000);
}

// Goes back to the top of the page
const goTop = () => {
    window.scrollTo(0, 0);
}

// Check if the scroll amount is enough to show the go to top button
const checkButton = () => {
    if (html.scrollTop > window.innerHeight) {
        topButton.classList.add("show");
    } else {
        topButton.classList.remove("show");
    }
}

// Collapse or uncollapse section
const toggleCollapse = (event) => {
    event.currentTarget.parentNode.classList.toggle("collapse");     
};

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

// Hide menu after 3 seconds without scroll
window.addEventListener('scroll', hideMenu);

// Go back to top when clicking on the side button
topButton.addEventListener("click", goTop);

// Controls show/hide the go to top button
window.addEventListener('scroll', checkButton);

// Collapse sections clicking on the header
document.querySelectorAll(".landing__container h2").forEach((sectionHeader) => {
    sectionHeader.addEventListener("click", toggleCollapse);
});