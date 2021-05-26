const translate = document.querySelectorAll(".translate");
const big_title = document.querySelector(".big-title");
const header = document.querySelector("header");
const shadow = document.querySelector(".shadow");
const content = document.querySelector(".content");
const section = document.querySelector("section");
const image_container = document.querySelector(".imgContainer");
const opacity = document.querySelectorAll(".opacity");
const border = document.querySelector(".border");

let header_height = header.offsetHeight;
let section_height = section.offsetHeight;

window.addEventListener('scroll', () => {
    let scroll = window.pageYOffset;
    let sectionY = section.getBoundingClientRect();

    translate.forEach(element => {
        let speed = element.dataset.speed;
        element.style.transform = `translateY(${scroll * speed}px)`;
    });

    opacity.forEach(element => {
        element.style.opacity = scroll / (sectionY.top + section_height);
    })

    big_title.style.opacity = - scroll / (header_height / 2) + 1;
    shadow.style.height = `${scroll * 0.5 + 300}px`;

    content.style.transform = `translateY(${scroll / (section_height + sectionY.top) * 50 - 50}px)`;
    image_container.style.transform = `translateY(${scroll / (section_height + sectionY.top) * -50 + 50}px)`;

    border.style.width = `${scroll / (sectionY.top + section_height) *30}%`;
})


// DRAG & DROP

const draggableElement = document.querySelector("#myDraggableElement");

draggableElement.addEventListener("dragstart", e => {
    console.log(e);
    e.dataTransfer.setData("text/plain", draggableElement.id);
});

for (const dropZone of document.querySelectorAll(".drop-zone")) {
    // When draggable element is over a drop zone
    dropZone.addEventListener("dragover", e => {
        e.preventDefault();
        dropZone.classList.add("drop-zone--over");
    });

    // When draggable element no longer over drop zone
    dropZone.addEventListener("dragleave", e => {
        dropZone.classList.remove("drop-zone--over");
    });

    // When draggable element is dropped onto drop zone
    dropZone.addEventListener("drop", e => {
        e.preventDefault();

        const droppedElementId = e.dataTransfer.getData("text/plain");
        const droppedElement = document.getElementById(droppedElementId);

        dropZone.appendChild(droppedElement);
        dropZone.classList.remove("drop-zone--over");
    })
}