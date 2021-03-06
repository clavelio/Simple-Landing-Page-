//* Manipulating the DOM exercise.
//* Exercise programmatically builds navigation,
//* scrolls to anchors from navigation,
//* and highlights section in viewport upon scrolling.


// *** A dynamic Navbar 

//  Using DocumentFragment interface because is a lightweight version of the Document, if we make changes to the document fragment it doesnt affect the Document, doesn`t change performance.


document.addEventListener('DOMContentLoaded', function () {

    const t0 = performance.now()
    const ulList = document.querySelector('.nav-list');
    const sections = document.querySelectorAll('section')

    // create Li Element with a in document Fragment , ready fragment with all li added to ul list once 
    function createLiElement() {
        const fragment = document.createDocumentFragment();
        sections.forEach((section) => {
            const navListElement = document.createElement('li');
            navListElement.classList.add('nav-list__item');
            const idSection = section.id;
            const linkElement = document.createElement('a');
            linkElement.href = `#${idSection}`;
            linkElement.textContent = idSection;
            linkElement.classList.add('nav-list__link');
            navListElement.appendChild(linkElement)
            fragment.appendChild(navListElement)
        })
        ulList.appendChild(fragment)

    }

    createLiElement()

    // Hamburger menu 

    const menuBtn = document.querySelector('.menu-btn');

    function hamburgerMenu() {
        menuBtn.classList.toggle('close');
        ulList.classList.toggle('show');
    }

    menuBtn.addEventListener('click', hamburgerMenu)


    //  Button scroll to top the page 

    function createBtn() {
        const btnScroll = document.createElement('button');
        btnScroll.textContent = 'TOP';
        btnScroll.classList.add('btn-scroll');
        document.body.appendChild(btnScroll);
    }

    createBtn();

    const btnScrollTop = document.querySelector('.btn-scroll')

    //user scrolls down 100px from the top of the document, show the button TOP
    window.addEventListener('scroll', function () {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            btnScrollTop.style.display = "block";
        } else
            btnScrollTop.style.display = "none";
    });

    //user clicks on the button, scroll to the top of the document

    function topPage() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    btnScrollTop.addEventListener('click', topPage);


    // Highlighting current section in navbar

    function ActiveNavBar(id) {
        const navLinks = document.querySelectorAll('a')
        navLinks.forEach((link) => {
            const linkAttribut = link.getAttribute("href").substring(1);
            if (linkAttribut === id) {
                link.classList.add('activeBackground');
            } else {
                link.classList.remove('activeBackground');
            }

            if (linkAttribut === null) {
                return;
            };
            // **When scroll it will be on header it delete the class which is responsibile for Highlighting elements in navbar 
            window.addEventListener('scroll', function () {
                const header = document.querySelector('.header');
                if (header.getBoundingClientRect().top + 200 < window.innerHeight && header.getBoundingClientRect().bottom + 200 > window.innerHeight) {
                    link.classList.remove('activeBackground');
                }

            })

        });
    };

    function activeSection() {
        sections.forEach((section) => {
            window.addEventListener('scroll', function () {
                if (section.getBoundingClientRect().top + 200 < window.innerHeight && section.getBoundingClientRect().bottom + 200 > window.innerHeight) {
                    section.classList.add('activeSection');
                    ActiveNavBar(section.id);
                } else {
                    section.classList.remove('activeSection');
                };

            });
        });
    };

    activeSection();


    //Add Smooth scroll function to the anchor elements.

    const navLinks = document.querySelectorAll('a')

    function smoothScroll() {
        navLinks.forEach((link) => {
            link.addEventListener('click', function (e) {
                const LinkAttribut = link.getAttribute("href").substring(1);
                e.preventDefault();
                //prevent the default action of a click, allow to change the behaviour, in this case it will allow to scroll
                const sections = document.querySelectorAll('section');
                sections.forEach((section) => {
                    const sectionId = section.id;
                    if (LinkAttribut === sectionId) {
                        section.scrollIntoView({
                            behavior: 'smooth'
                        })
                    }
                })
            })
        })
    }
    smoothScroll()

    const t1 = performance.now();
    console.log("This code took " + (t1 - t0).toFixed() + " miliseconds");

})