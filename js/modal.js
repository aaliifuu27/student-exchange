const modal = document.querySelector(".modal");
const closeModalBtn = document.querySelector(".btn-close");

// close modal function
const closeModal = function () {
    modal.classList.add("hidden");
};

// close the modal when the close button is clicked
closeModalBtn.addEventListener("click", closeModal);

// close modal when the Esc key is pressed
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
    }
});

// open modal function
const openModal = function (e) {
    const item = e.target;
    const data = item.getAttribute('data-var');
    const type = data.split("-")[0];
    const object = data.split("-")[1];
    const property = eval(object);
    const content = contentModal(type, property);
    const modalContent = document.getElementById("content-popup");
    modalContent.innerHTML = "";
    modalContent.innerHTML = content;
    modal.classList.remove("hidden");
    deferImgs('modal');
    deferPdf();
};

const contentModal = function (type, property) {
    const modalTitle = document.getElementById("modal-title");
    let content = "";
    switch (type) {
        case "flat":
            modalTitle.innerText = property.title || "";
            content = `
            <div class="flat__popup-content">
                ${property.content || ""}
            </div>
            `;
            break;
        case "course":
            property = courseView[property];
            modalTitle.innerText = property.title || "STUDENT EXCHANGE PROGRAM";
            const contents = property.contents;
            const silabus = property.silabus;
            const firstContent = contents[0];
            content = `
            <div class="course_modal_popup-image-wrapper">
                <img class="course_modal_popup-image" src="img/about/img.jpg" loading="lazy" data-defer-src="${property.banner || "img/about/img.jpg"}" data-defer-content="modal" />
            </div>
            <div class="first-content">
                <div class="first-content-title modal-content-title">
                    ${firstContent.title || ""}
                </div>
                <div class="first-content-desc modal-content-desc">
                    ${firstContent.desc || ""}
                </div>
                </div>
            </div>
            <div class="course_modal_popup-content">
                <div class="course_modal_popup-content-left">
                    <div class="pdf">
                        <div class="pdf-image">
                            <img src="img/cases/img1.jpg" loading="lazy" data-defer-src="${property.downloadCover || "img/cases/img1.jpg"}" data-defer-content="modal" alt="img">
                        </div>
                        <div class="pdf-download">
                            <div class="pdf-desc">
                                More information course package
                            </div>
                            <a class="pdf-button layout-radius btn-radius btn-radius-sm" data-defer-href="${property.pdf || "data/sample.pdf"}" href="data/sample.pdf" download>
                                Download
                            </a>
                        </div>
                    </div>
                </div>
                <div class="course_modal_popup-content-right">
            `;                        
                        
            if (contents.length > 1) {
                contents.forEach((item, index) => {
                    if (index > 0) {
                        content += `<div class="modal-content-title">${item.title}</div>`;
                        content += `<div class="modal-content-desc">${item.desc}</div>`;
                    }
                });
            }
            content += `<div class="content-silabus">`;
            if (silabus.length > 0) {
                silabus.forEach((item) => {
                    content += `<div class="silabus-item">${item}</div>`;
                });
            }
            content +=`</div></div></div>`;
            break;
    }
    return content
}

function modalListener () {
    const openModalBtn = document.querySelectorAll(".popup");
    openModalBtn.forEach(element => {
        element.addEventListener("click", function (e) {
            openModal(e)
        });
    });
}