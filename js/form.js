
const form = document.querySelector("#multiStepForm"); // this is the form element
const phoneInput = document.querySelector("#phone"); // this is the phone input field
const steps = document.querySelectorAll(".step"); // this will target all the step elements in the form
const nextButton = document.querySelectorAll(".next-button"); // this is the next button element
const backButton = document.querySelectorAll(".back-button"); // this is the previous button element


let currentStep = 0; // this will keep track of which step the user is on in the form

// controle when to view each step
function showWhichStep(index) {
    steps.forEach((step, i) => {
        step.classList.toggle("active", i === index);
    });
}

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

// this function will show and hide steps in the form
function showStep(index) {
    steps.forEach((step, i) => {
        step.style.display = (i === index) ? "block" : "none";
    });
}

// this function will handle the next button
nextButton.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (currentStep < steps.length - 1) {
            currentStep++;
            showStep(currentStep);
        }
    });
});
// this funtion will handle the back button
backButton.forEach(btn => {
    btn.addEventListener("click", () => {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    });
});
showStep(currentStep); // show the first step initially