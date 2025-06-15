import { setupHamburgerMenu, setupResumeModals, setupSkillDropdown } from "./index.js";
import { initModal, createNewAccount } from "./login-modal.js"


console.log("main.js is running");

document.addEventListener("DOMContentLoaded", () => {
    console.log("main.js is running");

    setupHamburgerMenu();
    setupResumeModals();
    initModal();
    createNewAccount();
    setupSkillDropdown();
});