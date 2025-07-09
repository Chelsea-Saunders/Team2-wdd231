import { setupHamburgerMenu, setupResumeModals, setupSkillDropdown, setupDynamicResumes, setupSkillFilter, fetchQuote } from "./index.js";
import { initModal, createNewAccount } from "./login-modal.js";
import { loadResume, addPrintButton } from "./resume.js";

document.addEventListener("DOMContentLoaded", () => {
    console.log("main.js is running");

    setupHamburgerMenu();
    setupResumeModals();
    initModal();
    createNewAccount();
    setupSkillDropdown();
    setupSkillFilter();
    fetchQuote();

    // making sure the function is needed in the html file:
    if (window.location.pathname === "/" || window.location.pathname.endsWith("index.html")) {
        setupDynamicResumes();
    }

    if (window.location.pathname.includes("resume")) {
        loadResume();
        addPrintButton();
    }
});