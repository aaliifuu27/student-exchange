const courseList = document.getElementById("course_list");
const fullSemesterSwitch = document.getElementById("fs-switch");
const shortTermSwitch = document.getElementById("st-switch");
let listCategory = "SHORT TERM";
let courseView = [];
const filterShow = (category) => {
    resetCourseList();
    const filterView = courses.filter((item) => item.category.toUpperCase() === category.toUpperCase());
    if (courseView != filterView) {
        courseView = courses.filter((item) => item.category.toUpperCase() === category.toUpperCase());
        setList(courseView);
        
        // document.getElementById('cases_swipe_right').addEventListener("click", function (event) {
        //     const courseList = document.getElementById('cases_container');
        //     courseList.scrollLeft += 500;
        // });

        // document.getElementById('cases_swipe_left').addEventListener("click", function (event) {
        //     const courseList = document.getElementById('cases_container');
        //     courseList.scrollLeft -= 500;
        // });
    }

    document.removeEventListener('modal', modalListener());
    document.addEventListener('modal', modalListener());
};
const resetCourseList = () => courseList.innerHTML = "";
const setList = (list) => {
    if (list.length > 0) {
        list.forEach((item, index) => {
            courseList.insertAdjacentHTML('beforeend', `
                <div class="cases__card popup js-cases-card" data-var="course-${index}" data-category="${item.category}">
                    <div class="cases__text" data-var="course-${index}">
                        <div class="cases__card-title" data-var="course-${index}">${item.title}</div>
                        <div class="cases__card-desc" data-var="course-${index}">${item.desc}</div>
                    </div>
                    <img class="cases__card-img" data-var="course-${index}" src="img/cases/img1.jpg" loading="lazy" data-defer-src="${item.cover
                || "img/cases/img1.jpg"}" data-defer-content="course" alt="${item.title}">
                </div>
            `);
        });
    }
}
document.addEventListener('DOMContentLoaded', () => {
    fullSemesterSwitch.addEventListener('click', (e) => {
        const element = e.target;
        element.classList.remove("deactive");
        shortTermSwitch.classList.add("deactive");
        listCategory = "FULL SEMESTER";
        filterShow(listCategory);
    });
    shortTermSwitch.addEventListener('click', (e) => {
        const element = e.target;
        element.classList.remove("deactive");
        fullSemesterSwitch.classList.add("deactive");
        listCategory = "SHORT TERM";
        filterShow(listCategory);
    });
})