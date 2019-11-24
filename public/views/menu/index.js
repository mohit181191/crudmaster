import Modal from "../modal/index.js";

export default class Menu extends Modal {
    constructor(list) {
        super(list);
        this.actionsList = list;
    }
    getMarkup() {
        let menuMarkup = "<ul class='menu'>";
        menuMarkup = this.actionsList.reduce((markup, item) => {
            markup += `<li class="menuItem" data-id="${item.id}">${item.name}</li>`;
            return markup;
        }, menuMarkup);
        menuMarkup += "</ul>";
        return menuMarkup;
    }

    showMenu() {
        this.show(this.getMarkup(), this.targetNode);
        this.initListeners();
        super.initListeners();
    }

    initListeners() {
        const menuNode = this.modalNode.getElementsByClassName("menu")[0];
        menuNode.addEventListener("click", event => {
            if (event.target.nodeName == "LI") {
                this.actionItemClick(event.target.dataset.id);
                event.stopPropagation();
            }
        });
    }
}
