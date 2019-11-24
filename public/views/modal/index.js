export default class Modal {
    constructor() {}
    initListeners() {
        this.modalNode.addEventListener("click", event => {
            if (!event.target.closest(".modal-content")) {
                this.hide();
            }
        });
    }
    show(markup, targetNode) {
        const modalSection = document.createElement("section");
        modalSection.setAttribute("id", "modal");
        const modalContent = document.createElement("div");
        if (targetNode) {
            modalSection.classList.add("noBg");
            const bounds = targetNode.getBoundingClientRect();
            modalContent.setAttribute("style", `position:absolute; top:${bounds.top + bounds.height}px; left:${bounds.left - 50}px`);
            modalContent.setAttribute("class", "modal-content menu");
        } else {
            modalContent.setAttribute("class", "modal-content dialog");
        }

        modalSection.appendChild(modalContent);
        document.body.appendChild(modalSection);
        this.modalNode = modalSection;
        this.modalContent = modalContent;
        this.modalContent.innerHTML = markup;
        this.initListeners();
    }
    hide() {
        document.body.removeChild(this.modalNode);
    }
}
