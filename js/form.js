
const phoneInput = document.querySelector("#phone"); // this is the phone input field
if (phoneInput) {
    phoneInput.addEventListener("input", formatPhoneNumber);
}
const steps = document.querySelectorAll(".step"); // this will target all the step elements in the form
const backButton = document.querySelectorAll(".back-button"); // this is the previous button element

// date fields
const today = new Date();
// formate date: MM/DD/YYYY
// const month = String(today.getMonth() + 1).padStart(2, "0");
// const day = String(today.getDate()).padStart(2, "0");
// const year = today.getFullYear();
// const todayDate = `${month}/${day}/${year}`; // format: "MM/DD/YYYY"
const todayString = today.toISOString().split("T")[0]; // this will format: "YYYY-MM-DD"
const sixtyYearsAgo = new Date(today.getFullYear() - 60, today.getMonth(), today.getDate());
const sixtyYearsAgoString = sixtyYearsAgo.toISOString().split("T")[0]; // this will format: "YYYY-MM-DD"

// automatically save anytime any input is changed
// document.addEventListener("input", () => {
//     saveFormData();
// });


let currentStep = 0; // this will keep track of which step the user is on in the form

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
});
// Education Experience Form Event LIstener
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
});

// Skills form event listener
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
});

// References form event Listener
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
});

// add additional language dropdown
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

        const formEntries = currentStepElement.querySelectorAll(".form-entry, .inside-form");
        let allFilled = true; // flag to check if all required fields are filled

        formEntries.forEach(entry => {
            // check if any input has a value 
            const inputs = entry.querySelectorAll("input, textarea, select");
            const hasAnyValue = Array.from(inputs).some(input => input.value.trim() !== "");

            if (!hasAnyValue) {
                // skip validation if form is empty
                return;
            }
        
            // validate required fields within this entry
            const requiredInputs = entry.querySelectorAll("input[required], textarea[required], select[required]");

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

        });  

        if (!allFilled) {
            const firstInvalid = currentStepElement.querySelector("input.error, select.error, textarea.error");
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
    });
});


document.querySelector("#multiStepForm").addEventListener("submit", function(event) {
    event.preventDefault(); // stopfrom reloading page

    saveFormData();

    const formData = JSON.parse(localStorage.getItem("formData")) ||{};
    let resumes = JSON.parse(localStorage.getItem("resumes"));
    if (!Array.isArray(resumes)) {
        resumes = [];
    }

    resumes.push(formData);
    localStorage.setItem("resumes", JSON.stringify(resumes));
    localStorage.removeItem("formData");
    this.reset(); // reset the form

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
    }, 3000);
});

// function to format phone number input
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
//attach it ot the input field
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

// save user input to local storage
function saveFormData() {
    // build resume object

    // read any previously saved data
    let formData = JSON.parse(localStorage.getItem("formData")) || {};

    // CONTACT INFO
    if (document.querySelector("#name")) {
        formData.contactInfo = {
            name: document.querySelector("#name").value.trim(),
            email: document.querySelector("#email").value.trim(),
            phone: document.querySelector("#phone").value.trim(),
            address: document.querySelector("#address").value.trim()
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
                company: company.value.trim(),
                startDate: start.value.trim(),
                endDate: end.value.trim(),
                jobDuties: [duties.value.trim()]
            });
        }
    });
    if (workExperience.length) {
        formData.workExperience = workExperience;
    }
    // if (document.querySelector(".work-entry")) {
    //     const workExperience = [];
    //     document.querySelectorAll(".work-entry").forEach(entry => {
    //         workExperience.push({
    //             company: entry.querySelector("input[name='past-employment']").value.trim(),
    //             startDate: entry.querySelector("input[name='start-dates']").value.trim(),
    //             endDate: entry.querySelector("input[name='end-dates']").value.trim(), 
    //             jobDuties: [entry.querySelector("input[name='duties']").value.trim()]
    //         });
    //     });
    //     formData.workExperience = workExperience;
    // }
    

    //EDUCATION EXPERIENCE (loop through multiple .education-entry divs)
    const educationExperience = [];
    document.querySelectorAll(".education-entry, .step3 .inside-form").forEach(entry => {
        const school = entry.querySelector("input[name='college']");
        const start = entry.querySelector("input[name='ed-dates']");
        const end = entry.querySelector("input[name='end-ed-dates']");
        const degree = entry.querySelector("input[name='education']");

        if (school && start && end && degree) {
            educationExperience.push({
                school: school.value.trim(),
                startDate: start.value.trim(),
                endDate: end.value.trim(),
                degree: degree.value.trim()
            });
        }
    });
    if (educationExperience.length) {
        formData.educationExperience = educationExperience;
    }
    // if (document.querySelector(".education-entry")) {
    //     const educationExperience =[];
    //     document.querySelectorAll(".education-entry").forEach(entry => {
    //         educationExperience.push({
    //             school: entry.querySelector("input[name='college']").value.trim(),
    //             startDate: entry.querySelector("input[name='ed-dates']").value.trim(),
    //             endDate: entry.querySelector("input[name='end-ed-dates']").value.trim(),
    //             degree: entry.querySelector("input[name='education']").value.trim()
    //         });
    //     });
    //     formData.educationExperience = educationExperience;
    // }

    // SKILLS (loop through multiple skill inputs if multiple are added)
    if (document.querySelector("input[name='skills']")){
        formData.skills = Array.from(document.querySelectorAll("input[name='skills']"))
        .map(input => input.value.trim())
        .filter(skill => skill !== ""); // filter out empty skill inputs
    }

    // LANGUAGES ( loop through multiple inputs if multiple are added)
    const allLanguages = document.querySelectorAll("select[name='languages']");
    const languages = [];

    allLanguages.forEach(select => {
        Array.from(select.selectedOptions).forEach(option => {
            const value = option.value.trim();
            if (value && !languages.includes(value)) {
                languages.push(value);
            }
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
                name: name.value.trim(),
                phone: formatPhoneNumberString(phone.value.trim()),
                email: email.value.trim()
            });
        }  
    });
    if (references.length) {
        formData.references = references;
    }
    // if (document.querySelector(".reference-entry")) {
    //     const references = [];
    //     document.querySelectorAll(".reference-entry").forEach(entry => {
    //         references.push({
    //             name: entry.querySelector("input[name='references']").value.trim(),
    //             phone: formatPhoneNumberString(entry.querySelector("input[name='reference-phone']").value.trim()),
    //             email: entry.querySelector("input[name='reference-email']").value.trim()
    //         });
    //     });
    //     formData.references = references;
    // }

    // PROFILE
    if (document.querySelector("#profile")) {
        formData.profile = document.querySelector("#profile").value.trim();
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