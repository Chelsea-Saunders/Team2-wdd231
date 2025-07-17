
const phoneInput = document.querySelector("#phone"); // this is the phone input field
if (phoneInput) {
    phoneInput.addEventListener("input", formatPhoneNumber);
}
const steps = document.querySelectorAll(".step"); // this will target all the step elements in the form
const backButton = document.querySelectorAll(".back-button"); // this is the previous button element

// date fields
const today = new Date();
const todayString = today.toISOString().split("T")[0]; // this will format: "YYYY-MM-DD"
const sixtyYearsAgo = new Date(today.getFullYear() - 60, today.getMonth(), today.getDate());
const sixtyYearsAgoString = sixtyYearsAgo.toISOString().split("T")[0]; // this will format: "YYYY-MM-DD"

let currentStep = 0; // this will keep track of which step the user is on in the form

// function to capitalize the first letter in a word of a whole string
function capitalizeFirstWord(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// function to capitalize the first letter of each word
function capitalizeEachWord(string) {
    return string.replace(/\b\w/g, character => character.toUpperCase());
}


// Employment History Form event listener
document.querySelector("#add-work-experience").addEventListener("click", function() {
    console.log(document.querySelector("#add-work-experience"));
    // find the specific container related to the clicked button
    const insideForm = this.closest(".inside-form");

    // fields to add for new entry
    const fields = [
        { type: "paragraph", text: "Adding New Employment Section" },
        { label: "Place of Previous Employment:", type: "text", name: "past-employment", placeholder: "Company Name", required: true}, 
        { 
            label: "Start Date of Employment:", 
            type: "date", 
            required: true,
            min: sixtyYearsAgoString, // set minimum date to 60 years ago
            max: todayString, // set maximum date to today
            // value: todayString, // set default value to today
            name: "start-dates", 
            placeholder: "MM/DD/YYYY"
        },
        { 
            label: "End Date of Employment:", 
            type: "date", 
            required: true,
            min: sixtyYearsAgoString, // set minimum date to 60 years ago
            max: todayString, // set maximum date to today
            // value: todayString, // set default value to today
            name: "end-dates", 
            placeholder: "MM/DD/YYY" 
             
        },
        { label: "Job Duties:", type: "text", name: "duties", placeholder: "List Duties Performed", required: true }
    ];
    // call the function with the specific container and fields
    newFormEntry(insideForm, fields, "work-entry");
    saveFormData(); // save data to local storage

    // scroll to top of new form entry
    const newEntryTop = insideForm.querySelector(".work-entry");
    const newEntry = newEntryTop[newEntryTop.length - 1]; // get the last added entry
    if (newEntry) {
        newEntry.scrollIntoView({ behavior: "smooth", block: "start" });
        const firstInput = newEntry.querySelector("input, textarea, select");
        if (firstInput) {
            firstInput.focus();
        }
    }
});

// EDUCATION EXPERIENCE Form Event LIstener
document.querySelector("#add-education").addEventListener("click", function() {
    // find the specific container related to the clicked button
    const insideForm = this.closest(".inside-form");

    // fields to add for new entry
    const fields = [
        { type: "paragraph", text: "Adding New Education Section" },
        { label: "Name of Institution", type: "text", name: "college", placeholder: "School Name", required: true },
        { 
            label: "Start Date of Education", 
            type: "date", 
            required: true,
            min: sixtyYearsAgoString, // set minimum date to 60 years ago
            max: todayString, // set maximum date to today
            // value: todayString, // set default value to today
            name: "ed-dates", 
            placeholder: "MM/DD/YYYY"
        }, 
        { 
            label: "End Date of Education", 
            type: "date", 
            required: true,
            min: sixtyYearsAgoString, // set minimum date to 60 years ago
            max: todayString, // set maximum date to today
            // value: todayString, // set default value to today
            name: "end-ed-dates", 
            placeholder: "MM/DD/YYYY" 
        },
        { label: "Degree or Certification", type: "text", name: "education", placeholder: "Degree of Certification", required: true }
    ];
    // call the function with the specific container and fields
    newFormEntry(insideForm, fields, "education-entry");
    saveFormData(); // save data to local storage

    // scroll to top of new form entry
    const newEntryTop = insideForm.querySelector(".education-entry");
    const newEntry = newEntryTop[newEntryTop.length - 1]; // get the last added entry
    if (newEntry) {
        newEntry.scrollIntoView({ behavior: "smooth", block: "start" });
        const firstInput = newEntry.querySelector("input, textarea, select");
        if (firstInput) {
            firstInput.focus();
        }
    }
});

// SKILLS FORM event listener
document.querySelector("#add-skills").addEventListener("click", function() {
    // find specific container
    const insideForm = this.closest(".inside-form");
    // fields to add for new entry
    const fields = [
        { type: "paragraph", text: "Adding New Skill Section" },
        { label: "Skill:", type: "text", name: "skills", placeholder: "e.g., JavaScript, Project Manager", required: true }
    ];
    // call the function with the specific container and fields
    newFormEntry(insideForm, fields, "skill-entry");
    saveFormData(); // save data to local storage

    // scroll to top of new form entry
    const newEntryTop = insideForm.querySelector(".skill-entry");
    const newEntry = newEntryTop[newEntryTop.length - 1]; // get the last added entry
    if (newEntry) {
        newEntry.scrollIntoView({ behavior: "smooth", block: "start" });
        const firstInput = newEntry.querySelector("input, textarea, select");
        if (firstInput) {
            firstInput.focus();
        }
    }
});

// REFERENCES form event Listener
document.querySelector("#add-reference").addEventListener("click", function() {
    // find the specific container
    const insideForm = this.closest(".inside-form");

    // fields to add for new entry
    const fields = [
        { type: "paragraph", text: "Adding New Reference Section" },
        { label: "Reference Name:", type: "text", name: "references", placeholder: "First and Last Name", required: true }, 
        { label: "Phone Number:", type: "tel", name: "reference-phone", placeholder: "123-456-7890", required: true }, 
        { label: "Email:", type: "email", name: "reference-email", placeholder: "email@email.com", required: true }
    ];

    // call teh function with the specific container and fields
    newFormEntry(insideForm, fields, "reference-entry");
    insideForm.querySelectorAll("input[name='reference-phone']").forEach(input => {
        // only attach event listeners to new inputs
        if (!input.dataset.listenerAdded) { // prevent double-binding
            input.addEventListener("input", formatPhoneNumber);
        input.dataset.listenerAdded = "true"; // mark this input as now having a listener}
        }
    });
    saveFormData();

    // scroll to top of new form entry
    const newEntryTop = insideForm.querySelector(".reference-entry");
    const newEntry = newEntryTop[newEntryTop.length - 1]; // get the last added entry
    if (newEntry) {
        newEntry.scrollIntoView({ behavior: "smooth", block: "start" });
        const firstInput = newEntry.querySelector("input, textarea, select");
        if (firstInput) {
            firstInput.focus();
        }
    }
});

// ADD LANGUAGE dropdown event listener
document.querySelector("#add-language").addEventListener("click", function() {
    const insideForm = this.closest(".inside-form");

    // create new label and dropdown
    const label = document.createElement("label");
    label.textContent = "Add a Language:";

    const select = document.createElement("select");
    select.name = "languages";
    select.required = false; // make it optional

    // add language options
    select.innerHTML = `
        <option value="">Please Choose a Language</option>
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

        // insert before buttons
        const bottomButtons = insideForm.querySelector(".bottom-buttons");
        insideForm.insertBefore(label, bottomButtons);
        insideForm.insertBefore(select, bottomButtons);
});

// event listener to CLEAR THE ENTIRE FORM
document.querySelector("#clear-button").addEventListener("click", clearFormData);

// event listener to CLEAR THE CURRENT PAGE
document.querySelectorAll(".clear-page").forEach (button => {
    button.addEventListener("click", clearCurrentPage);
});

// VALIDATE EMAIL regex function
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // regex to validate email format
    return emailRegex.test(email); 
}

// NEXT BUTTON event listener
document.querySelectorAll(".next-button").forEach(function(button) {
    button.addEventListener("click", function() {
        const currentStepElement = this.closest(".step");
        
            // validate required fields within this entry
            const requiredInputs = currentStepElement.querySelectorAll("input[required], textarea[required], select[required]");
            let allFilled = true;

            requiredInputs.forEach((requiredInput) => {
                const fieldName = requiredInput.previousElementSibling?.textContent?.replace(":", "") || "This field";
                // remove any existing error message
                const existingMessage = requiredInput.nextElementSibling;

                if (existingMessage && existingMessage.classList.contains("error-message")) {
                    existingMessage.remove();
                }

                const isDate = requiredInput.type === "date";
                const emailInput = requiredInput.type === "email";
                const value = requiredInput.value.trim();

                if (!value) {
                    allFilled = false;
                    requiredInput.classList.add("error-placeholder");
                    if (!requiredInput.dataset.originalPlaceholder) {
                        requiredInput.dataset.originalPlaceholder = requiredInput.placeholder;
                    }
                    requiredInput.placeholder = `Required: ${fieldName}`;
                    return;
                }

                // validate email if it exists
                if (emailInput && !validateEmail(value)) {
                    allFilled = false;
                    requiredInput.classList.add("error-placeholder");
                    if (!requiredInput.dataset.originalPlaceholder) {
                        requiredInput.dataset.originalPlaceholder = requiredInput.placeholder;
                    }
                    requiredInput.value = "";
                    requiredInput.placeholder = `Enter a valid email address.`;
                    return
                }

                // check date range 
                if (isDate) {
                    const inputDate = new Date(value);
                    if (inputDate < sixtyYearsAgo || inputDate > today) {
                        allFilled = false;

                        requiredInput.dataset.originalValue = requiredInput.value;
                        requiredInput.value = "";
                        requiredInput.placeholder = `${fieldName} must be between ${sixtyYearsAgoString} and ${todayString}.`;
                        requiredInput.classList.add("error-placeholder");
                        return;
                    }
                }

                requiredInput.classList.remove("error-placeholder");
                if (requiredInput.dataset.originalPlaceholder) {
                    requiredInput.placeholder = requiredInput.dataset.originalPlaceholder;
                }
                // if input is valid
                requiredInput.addEventListener("focus", () => {
                    if (requiredInput.dataset.originalValue != undefined) {
                        requiredInput.value = requiredInput.dataset.originalValue;
                        delete requiredInput.dataset.originalValue;
                        requiredInput.classList.remove("error-placeholder");
                    }
                });
            });

        if (!allFilled) {
            const firstInvalid = currentStepElement.querySelector("input.error-placeholder, select.error-placeholder, textarea.error-placeholder");
            if (firstInvalid) {
                firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
                firstInvalid.focus();
            }
            return; // this will stop everything here if not valid.
        }

        // all required fields are filled...go to next step
        saveFormData();
        currentStep++;
        showStep(currentStep);
        window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to the top of the next step in the modal
    });
});

// SUBMIT BUTTON event listener
document.querySelector("#multiStepForm").addEventListener("submit", function(event) {
    event.preventDefault(); // stopfrom reloading page

    // save final form data to  "formData" key
    saveFormData();

    // get saved formData from local storage
    const formData = JSON.parse(localStorage.getItem("formData")) ||{};
    const emailInput = document.querySelectorAll("#multiStepForm input[type='email']");
    let allValid = true;

    // validate email if it exists
    emailInput.forEach(input => {
        const value = input.value.trim();
        if (!validateEmail(value)) {
            allValid = false;
            input.classList.add("error-placeholder");
            if (!input.dataset.originalPlaceholder) {
                input.dataset.originalPlaceholder = input.placeholder;
            }
            input.value = "";
            input.placeholder = `Enter a valid email address.`;
        }
    });
    const profileInput = document.querySelector("#profile");
    if (!profileInput.value.trim()) {
        const errorSpan = document.querySelector("#profile-error");
        profileInput.classList.add("error-placeholder");
        profileInput.value = ""; // clear input

        // set placeholder in red
        profileInput.placeholder = "REQUIRED: Type a brief profile about yourself.";

        if (errorSpan) {
            errorSpan.textContent = "";
        }

        profileInput.scrollIntoView({ behavior: "smooth", block: "center" });
        profileInput.focus();
        return; // stop submission if profile is empty
    }
    // if (!allValid) {
    //     const firstInvalid = document.querySelector("input.error-placeholder");
    //     if (firstInvalid) {
    //         firstInvalid.scrollIntoView({behavior: "smooth", block: "center"});
    //         firstInvalid.focus();
    //     }
    //     return; // stop submission if not valid
    //     }
    
    //     const profileInput = document.querySelector("#profile");
    //     if (!profileInput.value.trim()) {
    //         const errorSpan = document.querySelector("#profile-error");
    //         if (errorSpan) {
    //             errorSpan.textContent = "You must write something about yourself.";
    //         }

    //         profileInput.classList.add("error-placeholder");
    //         profileInput.focus();
    //         return; // stop submission if profile is empty
    //     }

    // add to the "resumes" array
    let resumes = JSON.parse(localStorage.getItem("resumes"));
    if (!Array.isArray(resumes)) {
        resumes = [];
    }
    resumes.push(formData);
    localStorage.setItem("resumes", JSON.stringify(resumes));

    // clear draft verson
    localStorage.removeItem("formData");

    // show submission message
    const messageDiv = document.querySelector(".submission-message");
    messageDiv.textContent = "Resume submitted successfully!";
    messageDiv.classList.add("success");
    messageDiv.classList.remove("hidden"); // remove the hidden class so message is visible

    // disable buttons while waiting
    document.querySelectorAll("button").forEach(button => button.disabled = true);

    // wait 3 seconds then redirect
    setTimeout(function() {
        window.location.href = "index.html"; 
    }, 2000);
});

// function to FORMAT PHONE NUMBER input
function formatPhoneNumberString(input) {
    //only get numbers
    // const input = event.target.value;
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
    // event.target.value = formatted;
    return formatted;
}
// input event handler (for live formatting)
function formatPhoneNumber(event) {
    event.target.value = formatPhoneNumberString(event.target.value);
}
//attach it to the input field
document.querySelectorAll("input[name='reference-phone']").forEach(input => {
    input.addEventListener("input", formatPhoneNumber);
});

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
    saveFormData();
}

// SAVE TO LOCAL STORAGE
function saveFormData() {
    // build resume object

    // read any previously saved data
    const formData = JSON.parse(localStorage.getItem("formData")) || {};

    // CONTACT INFO
    if (document.querySelector("#name")) {
        formData.contactInfo = {
            name: capitalizeEachWord(document.querySelector("#name").value.trim()),
            email: document.querySelector("#email").value.trim(),
            phone: document.querySelector("#phone").value.trim(),
            address: capitalizeEachWord(document.querySelector("#address").value.trim())
        };
    }

    //WORK EXPERIENCE (loop through multiple .work-entry divs)
    const workExperience = [];
    document.querySelectorAll(".work-entry, .step2 .inside-form").forEach(entry => {
        const company = entry.querySelector("input[name='past-employment']");
        const start = entry.querySelector("input[name='start-dates']");
        const end = entry.querySelector("input[name='end-dates']");
        const duties = entry.querySelector("input[name='duties']");

        if (company && start && end && duties) {
            workExperience.push({
                company: capitalizeEachWord(company.value.trim()),
                startDate: start.value.trim(),
                endDate: end.value.trim(),
                jobDuties: [capitalizeEachWord(duties.value.trim())]
            });
        }
    });
    if (workExperience.length) {
        formData.workExperience = workExperience;
    }

    //EDUCATION EXPERIENCE (loop through multiple .education-entry divs)
    const educationExperience = [];
    document.querySelectorAll(".education-entry, .step3 .inside-form").forEach(entry => {
        const school = entry.querySelector("input[name='college']");
        const start = entry.querySelector("input[name='ed-dates']");
        const end = entry.querySelector("input[name='end-ed-dates']");
        const degree = entry.querySelector("input[name='education']");

        if (school && start && end && degree) {
            educationExperience.push({
                school: capitalizeEachWord(school.value.trim()),
                startDate: start.value.trim(),
                endDate: end.value.trim(),
                degree: capitalizeEachWord(degree.value.trim())
            });
        }
    });
    if (educationExperience.length) {
        formData.educationExperience = educationExperience;
    }

    // SKILLS (loop through multiple skill inputs if multiple are added)
    if (document.querySelector("input[name='skills']")){
        formData.skills = Array.from(document.querySelectorAll("input[name='skills']"))
        .map(input => capitalizeEachWord(input.value.trim()))
        .filter(skill => skill !== ""); // filter out empty skill inputs
    }

    // LANGUAGES ( loop through multiple inputs if multiple are added)
    const allLanguages = document.querySelectorAll("select[name='languages']");
    const languages = [];

    allLanguages.forEach(select => {
        Array.from(select.selectedOptions).forEach(option => {
            const value = option.value.trim();
            if (value) {
                const capitalizedValue = capitalizeEachWord(value);
                if (!languages.includes(capitalizeEachWord)) {
                    languages.push(capitalizedValue);
                }
            }
            // if (value && !languages.includes(value)) {
            //     languages.push(value);
            // }
        });
    });
    if (languages.length) {
        formData.languages = languages;
    }

    // REFERENCES ( loop through multiple .reference-entry divs)
    const references = [];
    document.querySelectorAll(".reference-entry, .step6 .inside-form").forEach(entry => {
        const name = entry.querySelector("input[name='references']");
        const phone = entry.querySelector("input[name='reference-phone']");
        const email = entry.querySelector("input[name='reference-email']");

        if (name && phone && email) {
            references.push({
                name: capitalizeEachWord(name.value.trim()),
                phone: formatPhoneNumberString(phone.value.trim()),
                email: email.value.trim()
            });
        }  
    });
    if (references.length) {
        formData.references = references;
    }

    // PROFILE
    if (document.querySelector("#profile")) {
        formData.profile = capitalizeFirstWord(document.querySelector("#profile").value.trim());
    }

    // // GET ITEMS FROM LOCAL STORAGE
    localStorage.setItem("formData", JSON.stringify(formData));
}



// function to add new form when the add button is clicked
function newFormEntry(container, field, sectionClass = "") {
    const newEntry = document.createElement("div");
    newEntry.classList.add("form-entry"); // add a class for styling
    if (sectionClass) {
        newEntry.classList.add(sectionClass); // add section-specific class if provided
    }

    field.forEach(function(field) {
        if (field.type === "paragraph") {
            const paragraph = document.createElement("p");
            paragraph.textContent = field.text;
            newEntry.appendChild(paragraph);
        } else {
            const group = document.createElement("div");
            group.classList.add("form-group");

            const label = document.createElement("label");
            label.textContent = field.label;

            const input = document.createElement("input");
            input.type = field.type;
            input.name = field.name;
            input.placeholder = field.placeholder || "";
            input.required = field.required || false; // set required attribute if specified

            if (field.min) input.min = field.min;
            if (field.max) input.max = field.max;
            if (field.value) input.value = field.value; // set default value if specified

            if (field.required) {
                input.required = true; // make the input required if specified
            }

            group.appendChild(label);
            group.appendChild(input);
            newEntry.appendChild(group);
            }
    });

    //append the new entry before the bottom buttons
    const bottomButtons = container.querySelector(".bottom-buttons");
    container.insertBefore(newEntry, bottomButtons);
}

// CLEAR DATA FORM from function
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

// CLEAR CURRENT PAGE function
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
//RELOAD FORM DATA from local storage
function loadFormData() {
    const savedData = JSON.parse(localStorage.getItem("formData"));
    if (!savedData) return;

    steps.forEach((step) => {
        const inputs = step.querySelectorAll("input, textarea, select");
        
        inputs.forEach((input) => {
            // if (input.name && savedData[input.name]) {
            //     input.value = savedData[input.name];
            // }
            if (input.name && savedData[input.name]) {
                if(input.name === "references" && Array.isArray(savedData.references)) {
                    input.value = savedData.references[0]?.name || "";;
                } else if (input.name === "reference-phone" && Array.isArray(savedData.references)) {
                    input.value = savedData.references[0]?.phone || "";
                } else if (input.name === "reference-email" && Array.isArray(savedData.references)) {
                    input.value = savedData.references[0]?.email || "";
                } else {
                    input.value = savedData[input.name] || "";
                }
            }
        });
    });
}

// CALL LOAD FORM DATA from local storage when page loads
loadFormData(); // call this to reload input into form when page loads

// BACK BUTTON EVENT LISTENER
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