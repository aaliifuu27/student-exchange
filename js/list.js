const packageList = document.getElementById("package_list");
const fullSemesterSwitch = document.getElementById("fs-switch");
const shortTermSwitch = document.getElementById("st-switch");
let listCategory = "SHORT TERM";
let packageView = [];
const filterShow = (category) => {
    resetpackageList();
    const filterView = packages.filter((item) => item.category.toUpperCase() === category.toUpperCase());
    if (packageView != filterView) {
        packageView = packages.filter((item) => item.category.toUpperCase() === category.toUpperCase());
        setList(packageView);
    }

    document.removeEventListener('modal', modalListener());
    document.addEventListener('modal', modalListener());
    deferImgs('package');
    initSwiper();
};
const resetpackageList = () => packageList.innerHTML = "";
const setList = (list) => {
    if (list.length > 0) {
        list.forEach((item, index) => {
            packageList.insertAdjacentHTML('beforeend', `<div class="swiper-slide blog__swiper-slide">
                <!-- blog post card-->
                <div class="blog__swiper-card"><a class="blog__swiper-link popup" data-var="package-${index}" data-category="${item.category}">
                    <div class="blog__swiper-img-wrapper" data-var="package-${index}"><img class="blog__swiper-img" src="img/cases/img1.jpg" loading="lazy" data-defer-src="${item.cover
                || "img/cases/img1.jpg"}" data-defer-content="package" data-var="package-${index}"alt="${item.title || ""}"></div>
                    <div class="blog__swiper-card-date" data-var="package-${index}">${item.title || ""}</div>
                </a>
                <div class="blog__swiper-card-desc popup" data-var="package-${index}">${item.desc || ""}</div>
                </div>
            </div>`);
            // packageList.insertAdjacentHTML('beforeend', `
            //     <div class="cases__card popup js-cases-card" data-var="package-${index}" data-category="${item.category}">
            //         <div class="cases__text" data-var="package-${index}">
            //             <div class="cases__card-title" data-var="package-${index}">${item.title}</div>
            //             <div class="cases__card-desc" data-var="package-${index}">${item.desc}</div>
            //         </div>
            //         <img class="cases__card-img" data-var="package-${index}" src="img/cases/img1.jpg" loading="lazy" data-defer-src="${item.cover
            //     || "img/cases/img1.jpg"}" data-defer-content="package" alt="${item.title}">
            //     </div>
            // `);
        });
    }
}


function initSwiper() {

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
}
document.addEventListener('DOMContentLoaded', () => {
    fullSemesterSwitch.addEventListener('click', (e) => {
        const element = e.target;
        shortTermSwitch.classList.remove("switch-on");
        element.classList.add("switch-on");
        listCategory = "FULL SEMESTER";
        filterShow(listCategory);
    });
    shortTermSwitch.addEventListener('click', (e) => {
        const element = e.target;
        fullSemesterSwitch.classList.remove("switch-on");
        element.classList.add("switch-on");
        listCategory = "SHORT TERM";
        filterShow(listCategory);
    });
})