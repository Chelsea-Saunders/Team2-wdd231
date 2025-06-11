import { setupHamburgerMenu } from "./index.js";

// const form = document.querySelector("#multiStepForm"); // this is the form element
const phoneInput = document.querySelector("#phone"); // this is the phone input field
const steps = document.querySelectorAll(".step"); // this will target all the step elements in the form
const backButton = document.querySelectorAll(".back-button"); // this is the previous button element


let currentStep = 0; // this will keep track of which step the user is on in the form

// function to format phone number input
function formatPhoneNumber(event) {
    //only get numbers
    const input = event.target.value;
    const numbers = input.replace(/\D/g, ""); // removes anything that isn't a digit

    // format as 123-456-7890
    let formatted = "";

    if (numbers.length > 0) {
        formatted += numbers.substring(0, 3);
    }
    if (numbers.length >= 4) {
        formatted += "-" + numbers.substring(3, 6);
    }
    if (numbers.length >= 7) {
        formatted += "-" + numbers.substring(6, 10);
    }

    // set the formatted value back to the input
    event.target.value = formatted;
}

// event listener for phone input to only allow numbers
phoneInput.addEventListener("input", formatPhoneNumber);

// this function will show and hide steps in the form and fade in...more smooth and less dramatic
function showStep(index) {
    steps.forEach((step, i) => {
        // step.classList.toggle("active", i === index);
        if (i === index) {
            step.classList.add("active");
            step.style.opacity = "1";
            step.style.pointerEvents = "auto";
        } else {
            step.classList.remove("active");
            step.style.opacity = "0";
            step.style.pointerEvents = "none";
        }
    });
}

// save user input to local storage
function saveFormData() {
    const formData = {}; 
    steps.forEach((step) => {
        const inputs = step.querySelectorAll("input, textarea, select");
        inputs.forEach((input) => {
            if (input.name) {
                formData[input.name] = input.value;
            }
        });
    });
    localStorage.setItem("formData", JSON.stringify(formData));
}
// function for normal form entries
function newFormEntry(container, field) {
    const newEntry = document.createElement("div");
    newEntry.classList.add("form-entry"); // add a class for styling

    field.forEach(function(field) {
        const group = document.createElement("div");
        group.classList.add("form-group");

        const label = document.createElement("label");
        label.textContent = field.label;

        const input = document.createElement("input");
        input.type = field.type;
        input.name = field.name;
        input.placeholder = field.placeholder;

        group.appendChild(label);
        group.appendChild(input);
        newEntry.appendChild(group);
    });

    //append the new entry before the bottom buttons
    const bottomButtons = container.querySelector(".bottom-buttons");
    container.insertBefore(newEntry, bottomButtons);
}

// clear data from from function
function clearFormData() {
    localStorage.removeItem("formData");

    steps.forEach(step => {
        const inputs = step.querySelectorAll("input, textarea, select");
        inputs.forEach(input => {
            input.value = "";
        });
    });
        currentStep = 0;
        showStep(currentStep);
}

function clearCurrentPage() {
    const currentStepElement = steps[currentStep];

    // clear all inputs
    const inputs = currentStepElement.querySelectorAll("input, textarea, select");
    inputs.forEach(input => input.value = "");

    // wrap each added entry in field so it can be removed
    const extraFields = currentStepElement.querySelectorAll(".form-entry");
    extraFields.forEach(entry => entry.remove());

    saveFormData(); // update localStorage with cleared values
}
//reload saved input fields
function loadFormData() {
    const savedData = JSON.parse(localStorage.getItem("formData"));
    if (!savedData) return;

    steps.forEach((step) => {
        const inputs = step.querySelectorAll("input, textarea, select");
        inputs.forEach((input) => {
            if(input.name && savedData[input.name]) {
                input.value = savedData[input.name];
            }
        });
    });
}
loadFormData(); // call this to reload input into form when page loads
// this funtion will handle the back button
backButton.forEach(btn => {
    btn.addEventListener("click", () => {
        saveFormData(); // save progress to local storage before going back
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    });
});
showStep(currentStep); // show the first step initially
// Employment History Form event listener
document.querySelector("#add-work-experience").addEventListener("click", function() {
    // find the specific container related to the clicked button
    const insideForm = this.closest(".inside-form");

    // fields to add for new entry
    const fields = [
        { label: "Place of Previous Employment:", type: "text", name: "past-employment", placeholder: "Company Name" }, 
        { label: "Date of Employment:", type: "text", name: "dates", placeholder: "MM/DD/YYY" },
        { label: "Job Duties:", type: "text", name: "duties", placeholder: "List Duties Performed" }
    ];
    // call the function with the specific container and fields
    newFormEntry(insideForm, fields);
});
// Education Experience Form Event LIstener
document.querySelector("#add-education").addEventListener("click", function() {
    // find the specific container related to the clicked button
    const insideForm = this.closest(".inside-form");

    // fields to add for new entry
    const fields = [
        { label: "School Name", type: "text", name: "college", placeholder: "School Name" },
        { label: "ed-dates", type: "text", name: "ed-dates", placeholder: "MM/DD/YYYY" }, 
        { label: "education", type: "text", name: "education", placeholder: "Degree of Certification" }
    ];
    // call the function with the specific container and fields
    newFormEntry(insideForm, fields);
});

// Skills form event listener
document.querySelector("#add-skills").addEventListener("click", function() {
    // find specific container
    const insideForm = this.closest(".inside-form");
    // fields to add for new entry
    const fields = [
        { label: "Enter Your Skills:", type: "text", name: "skills", placeholder: "Enter Skill" }
    ];
    // call the function with the specific container and fields
    newFormEntry(insideForm, fields);
});

// References form event Listener
document.querySelector("#add-reference").addEventListener("click", function() {
    // find the specific container
    const insideForm = this.closest(".inside-form");

    // fields to add for new entry
    const fields = [
        { label: "Reference Name:", type: "text", name: "references", placeholder: "First and Last Name" }, 
        { label: "Reference Phone Number:", type: "tel", name: "reference-phone", placeholder: "123-456-7890" }, 
        { label: "Reference Email:", type: "email", name: "reference-email", placeholder: "email@email.com" }
    ];

    // call teh function with the specific container and fields
    newFormEntry(insideForm, fields);
});

// Profile form event listener
document.querySelector("#add-profile").addEventListener("click", function() {
    // find the specific container related to the clicked button
    const insideForm = this.closest(".inside-form");

    // fields to add for new entry
    const fields = [
        { label: "Personal Profile:", type: "text", name: "profile", placeholder: "Type a little about you" }
    ];
    // call the function with the specific container and fields
    newFormEntry(insideForm, fields);
});

// add additional language dropdown
document.querySelector("#add-language").addEventListener("click", function() {
    const insideForm = this.closest(".inside-form");

    // create new label and dropdown
    const label = document.createElement("label");
    label.textContent = "Languages Spoken:";

    const select = document.createElement("select");
    select.name = "languages";
    select.required = false; // make it optional

    // add language options
    select.innerHTML = `
        <option value="">--Please Choose a Language--</option>
        <option value="arabic">Arabic</option>
        <option value="bengail">Bengail</option>
        <option value="chinese">Chinese(Mandarin)</option>
        <option value="dutch">Dutch</option>
        <option value="english">English</option>
        <option value="french">French</option>
        <option value="German">Gernam</option>
        <option value="hindi">Hindi</option>
        <option value="indonesian">Indonesian</option>
        <option value="italian">Italian</option>
        <option value="japanese">Japanese</option>
        <option value="javanese">Javanese</option>
        <option value="korean">Korean</option>
        <option value="malay">Malay</option>
        <option value="marathi">Marathi</option>
        <option value="persian">Persian(Farsi)</option>
        <option value="portuguese">Portuguese</option>
        <option value="punjabi">Punjabi</option>
        <option value="russian">Russian</option>
        <option value="spanish">Spanish</option>
        <option value="swahili">Swahili</option>
        <option value="tamil">Tamil</option>
        <option value="telugu">Telugu</option>
        <option value="turkish">Turkish</option>
        <option value="urdu">Urdu</option>
        <option value="vietnamese">Vietnamese</option>
        `;

        // create spacing
        const br = document.createElement("br");
        const br2 = document.createElement("br");

        // insert before buttons
        const bottomButtons = insideForm.querySelector(".bottom-buttons");
        insideForm.insertBefore(label, bottomButtons);
        insideForm.insertBefore(br, bottomButtons);
        insideForm.insertBefore(select, bottomButtons);
        insideForm.insertBefore(br2, bottomButtons);
});

// event listener to clear the entire form
document.querySelector("#clear-button").addEventListener("click", clearFormData);

// event listener to clear the individual page
document.querySelectorAll(".clear-page").forEach (button => {
    button.addEventListener("click", clearCurrentPage);
});

// make sure all required fields are filled before next step
document.querySelectorAll(".next-button").forEach(function(button) {
    button.addEventListener("click", function() {
        const currentStepElement = this.closest(".step");
        const requiredInputs = currentStepElement.querySelectorAll("input[required], select[required], textarea[required]");
        
        let allFilled = true;

        requiredInputs.forEach((requiredInput) => {
            const fieldName = requiredInput.previousElementSibling?.textContent?.replace(":", "") || "This field";

            // remove any existing error message
            let existingMessage = requiredInput.nextElementSibling;
            if (existingMessage && existingMessage.classList.contains("error-message")) {
                existingMessage.remove();
            }

            if (!requiredInput.value.trim()) {
                allFilled = false;
                requiredInput.classList.add("error"); // add error class for styling 

                // create error message
                const message = document.createElement("div");
                message.className = "error-message";
                message.textContent = `Required: ${fieldName}`;
                requiredInput.after(message);

                requestAnimationFrame(() => {
                    message.classList.add("show");
                });
            } else {
                requiredInput.classList.remove("error"); // remove error class if filled 
            }
        });

        saveFormData();

        if (!allFilled) {
            const firstInvalid = currentStepElement.querySelector("input.error", "select.error", "textarea.error");
            if (firstInvalid) {
                firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
                firstInvalid.focus();
            }
            return; // this will stop everything here if not valid.
        }
        // all required fields are fille...go to next step
        saveFormData(); // save data to local storage
        currentStep++; // move to the next step
        showStep(currentStep); // show the next step
    });
});

document.querySelector("#multiStepForm").addEventListener("submit", function(event) {
    event.preventDefault(); // stopfrom reloading page

    saveFormData(); // save data to this point

    // show data is saved
    alert("Resume Submitted! Thank You!");

    // clear local storage
    localStorage.removeItem("formData");

    // reset form
    this.reset();
});

setupHamburgerMenu();