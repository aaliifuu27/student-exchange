'use strict';
/*------------------------------------------------

1. Header
2. Cases
3. Pagepiling
4. Swiper
5. Validate

------------------------------------------------*/

/* 1. Header */
document.addEventListener('DOMContentLoaded', function () {
    const burger = document.querySelector('.header__burger');
    const menu = document.querySelector('.header__menu');
    const menuExit = document.querySelector('.header__menu-exit');
    const main = document.querySelector('.main');
    const header = document.querySelector('.header');

    burger.addEventListener('click', function () {
        menu.classList.add('active');
    });

    menuExit.addEventListener('click', function () {
        menu.classList.remove('active');
    });

    if (header.classList.contains("header-js")) {
        window.addEventListener('scroll', () => {
            let y = window.scrollY;
            let headerHeight = header.offsetHeight;

            if (y > headerHeight) {
                main.style.paddingTop = headerHeight + 'px';
                header.classList.add('is-fixed');
                header.style.top = -headerHeight + "px";
                header.style.transform = "translateY(100%)";
            } else if (y === 0) {
                header.classList.remove('is-fixed');
                main.style.paddingTop = 0;
                header.style.top = 0;
                header.style.transform = "translateY(0%)";
            }
        });
    }

});

/* 2. Cases */
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.js-cases-row')) {
        const row = document.querySelector('.js-cases-row');
        const casesCard = [...row.querySelectorAll('.js-cases-card')];

        // function cloneNodes() {
        //     casesCard.forEach((card) => {
        //         const clone = card.cloneNode(true)

        //         clone.dataset.clone = true

        //         row.appendChild(clone)
        //     })
        // }
        // cloneNodes()

        // casesCard.forEach((card) => {
        //     row.appendChild(card)
        // })

        // cloneNodes()
    }
});

/* 3. Pagepiling */
document.addEventListener('DOMContentLoaded', function (e) {
    e.preventDefault();
    function isTablet() {
        return window.matchMedia('(max-width: 1000px)').matches
    }

    let isInited = window.matchMedia('(max-width: 1000px)').matches
    const sections = [...document.querySelectorAll('.js-section')]

    function onScroll() {
        const isPageEnd = window.scrollY + window.innerHeight >= document.scrollingElement.scrollHeight;

        sections.forEach((section) => {
            const { top, bottom } = section.getBoundingClientRect()
            const inViewport = top <= 0 && bottom >= 0
            const id = section.getAttribute('id');

            if (inViewport && !isPageEnd) {
                document.querySelector(`[data-menuanchor="${id}"]`).classList.add('active')
            } else {
                document.querySelector(`[data-menuanchor="${id}"]`).classList.remove('active')
            }
        })

        if (isPageEnd) {
            const id = sections[sections.length - 1].getAttribute('id')
            document.querySelector(`[data-menuanchor="${id}"]`).classList.add('active')
        }
    }

    function scrollToSection() {
        const items = document.querySelectorAll('.header__menu-item');

        [...items].forEach(item => {
            const anchor = item.dataset.menuanchor;
            const section = document.getElementById(anchor);

            item.addEventListener('click', function (event) {

                
                if (anchor == "course") {
                    filterShow(listCategory);
                }
    
                deferImgs(anchor);
                event.preventDefault();

                const { top } = section.getBoundingClientRect()

                window.scrollTo({
                    top: window.scrollY + top,
                    behavior: "smooth"
                });

                if (isTablet()) {
                    document.querySelector('.header__menu').classList.remove('active');
                }
            })
        })
    }

    const anchors = ['home', 'general-info', 'course', 'schedule', 'tuitionfees', 'study-in-itb'];
    const labels = ['home', 'General Information', 'List of Course', 'Schedule', 'Tuition Fees', 'Study In ITB'];

    function changeTheme(index) {
        const black = "#000";
        const white = "#fff";
        const grey = "#d1d1d1";
        const blue = "#105bab";
        let lineNavigationBgColor = white;
        let sectionBgColor = grey;
        let bodyColor = lineNavigationBgColor;
        let menuHeaderColor = lineNavigationBgColor;
        if (index) {
            sectionBgColor = white;
            lineNavigationBgColor = black;
            bodyColor = lineNavigationBgColor;
            menuHeaderColor = blue;
        }
        changeBgColorLineNavigationTheme(lineNavigationBgColor);
        changeBgSectionTheme(sectionBgColor);
        changeBodyColor(bodyColor);
        changeMenuHeaderColor(menuHeaderColor);
    }

    function changeBgColorLineNavigationTheme(color) {
        [...document.querySelectorAll('.nav-widget__line-black')].forEach(element => {
            element.style.backgroundColor = color;
        });
    }

    function changeBgSectionTheme(color) {
        [...document.querySelectorAll('.section')].forEach(element => {
            element.style.backgroundColor = color;
        });
    }

    function changeBodyColor(color) {
        document.body.style.color = color;
    }

    function changeMenuHeaderColor(color) {
        [...document.querySelectorAll('.header__social-link')].forEach(element => {
            element.style.color = color;
        });
        document.querySelector('.header__burger span').style.setProperty("--background", color);
    }

    function initPaging() {
        if (isTablet() && isInited) {
            filterShow(listCategory);
            deferImgs();
            isInited = false

            if ($.fn.pagepiling.destroy) {
                $.fn.pagepiling.destroy('all');
            }

            document.querySelector('body').style.overflow = 'auto';
            document.querySelector('html').style.overflow = 'auto';
            [...document.querySelectorAll('.header__menu-item')].forEach(element => {
                if (element.classList.contains('active')) {
                    element.classList.remove('active')
                }
                if (document.getElementById('pagepiling')) {
                    scrollToSection();
                }
            });
            if (document.getElementById('pagepiling')) {
                window.addEventListener('scroll', onScroll)
            }
        } else if (!isTablet() && !isInited && document.getElementById('pagepiling')) {
            isInited = true

            if (document.getElementById('pagepiling')) {
                window.removeEventListener('scroll', onScroll)
            }

            function setLabel(index) {
                const label = labels[index];

                if (label == "List of Course") {
                    filterShow(listCategory);
                }
    
                deferImgs(anchors[index]);

                [...document.querySelectorAll('.js-page-label')].forEach(element => {
                    element.textContent = label
                });
            }

            function setPageNumber(index) {
                changeTheme(index);
                [...document.querySelectorAll('.js-page-number')].forEach(element => {
                    element.textContent = `${index + 1}/${labels.length}`
                });
            }

            function setActiveMenu(index) {
                const anchor = anchors[index];
                const header = document.querySelector('.header__menu')

                header.classList.remove('active')
                document.querySelector(`[data-menuanchor="${anchor}"]`).classList.add('active')
            }

            function progressBar(index) {
                const progressBar = document.querySelector('.blue-line-js');

                progressBar.style.height = 100 / 9 * index + '%';
            }

            function animationActiveSection(index, nextIndex) {
                const anchor = anchors[index];
                const nextAnchor = anchors[nextIndex];
                const nextActiveSection = document.querySelector(`.section-${nextAnchor}`);
                const activeSection = document.querySelector(`.section-${anchor}`);

                if (nextActiveSection.classList.contains('active')) {
                    nextActiveSection.querySelector('.section-main').style.opacity = "1";
                    activeSection.querySelector('.section-main').style.opacity = "0";
                }
            }

            let timeout = null;

            $('#pagepiling').pagepiling({
                anchors: anchors,
                verticalCentered: false,
                scrollingSpeed: 150,
                easing: 'swing',
                menu: '#myMenu',

                onLeave: function (index, nextIndex, direction) {
                    setPageNumber(nextIndex - 1)
                    setLabel(nextIndex - 1)
                    progressBar(nextIndex)
                    clearTimeout(timeout);
                    timeout = setTimeout(animationActiveSection, 700, index - 1, nextIndex - 1)
                },

                afterRender: function () {
                    setPageNumber(0)
                    setLabel(0)
                    setActiveMenu(0)
                    progressBar(1)
                    clearTimeout(timeout);
                    timeout = setTimeout(animationActiveSection, 700, 1, 0)
                }
            });
        }
    }

    initPaging();

    function disabledPreloader() {
        document.getElementById('preloader').style.display = 'none';
    }

    

    setTimeout(disabledPreloader, 1200);

    window.addEventListener('resize', initPaging);

    $("a.fancybox").fancybox({
        type: 'iframe',
        allowfullscreen: 'true'
    });
});

/* 4. Swiper */
let swiper = new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

});


let swiper2 = new Swiper('.swiper-container2', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesPerView: 3,
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next2',
        prevEl: '.swiper-button-prev2',
    },
    breakpoints: {
        // when window width is >= 320px
        280: {
            slidesPerView: 1,
            slidesPerGroup: 1,
        },
        700: {
            slidesPerView: 2,
            slidesPerGroup: 2,
        },
        // when window width is >= 480px
        1200: {
            slidesPerView: 3,
        },
        2200: {
            slidesPerView: 4,
        },
        // when window width is >= 640px
    }
});

/* 5. Validate */
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.js-form')) {
        new JustValidate('.js-form', {
            rules: {
                checkbox: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                name: {
                    required: true,
                    minLength: 2
                },
                messages: {
                    name: {
                        minLength: 'My custom message about only minLength rule'
                    },
                    email: 'My custom message about error (one error message for all rules)'
                },
            },
        })
    }
})