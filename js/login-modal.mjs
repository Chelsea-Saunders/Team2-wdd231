
// hasging function
async function hashPassword(password) {
    const encoder = new TextEncoder(); //converts a string in to a Uint8Array) for URF-8 encoding
    const data = encoder.encode(password); // encodes the password string into a Uint8Array called data
    const hashBuffer = await crypto.subtle.digest("SHA-256", data); // uses Web Crypto API to asynchronously compute the SHA-256 hash of the data
    return Array.from(new Uint8Array(hashBuffer)) // converts the ArrayBuffer to a Uint8Array so it can be iterated over and then wraps it with Array.from() to turn it into a regular array of bytes
        .map(b => b.toString(16).padStart(2, "0")) // maps over each byte 'b':b.toString(16) converts the byte to a hexadecimal string, .padStart(2, "0") ensures each hex value has 2 characters ('a' becomes '0a')
        .join(""); // joins the array of hexadecimal strings into a long string and this will be the final SHA-256 hash in hex format.
}
    
export function initModal() {
    const modalBox = document.querySelector("#login-modal");
    if (!modalBox) {
        console.warn("No login-modal found, skipping modal setup.");
        return;
    }

    let firstFocusable;
    let lastFocusable; 

    const loginForm = modalBox.querySelector("form");
    const closeModalButton = document.querySelector(".close-button");
    const openModalButton = document.querySelector("#main-login");
    const loginMessage = document.querySelector("#login-message");

    // function that will add the class open to the modal
    function openModal() {
        modalBox.classList.remove("hidden");
        modalBox.classList.add("open");
        modalBox.setAttribute("aria-hidden", "false");

        const focusableElements = modalBox.querySelectorAll(
            'a[href], button:not([disabled]), textarea, input, select'
        );

        firstFocusable = focusableElements[0];
        lastFocusable = focusableElements[focusableElements.length -1];

        // set focus after opening modal
        document.querySelector("#login-email").focus();
    }
    // function to remove the open class from modal
    function closeModal() {
        // openModalButton.focus();
        modalBox.classList.remove("open");
        modalBox.classList.add("hidden");
        modalBox.setAttribute("aria-hidden", "true");
    }

    openModalButton.addEventListener("click", (event) => {
        event.preventDefault();
        openModal();
    });

    closeModalButton.addEventListener("click", () => {
        closeModal();
    });

    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            if (modalBox.classList.contains("open")) {
                closeModal();
            }
        }
    });

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault(); 
        console.log("Login form was submitted");

        const email = loginForm.querySelector("#login-email").value.trim();
        const password = loginForm.querySelector("#login-password").value.trim();

        const hashedPassword = await hashPassword(password);

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const matchingUsers = users.find(user => user.email === email && user.password === hashedPassword);

        if (matchingUsers) {
            localStorage.setItem("loggedInUser", JSON.stringify(matchingUsers));
            loginMessage.textContent = "Login successful!";
            loginMessage.classList.remove("error");
            loginMessage.classList.add("success");

            setTimeout(() => {
                closeModal();
                loginForm.reset();
                loginMessage.textContent = "";
                loginMessage.classList.remove("success");
            }, 2000);
        } else {
                loginMessage.textContent = "There is no account associated with that email or password.";
                loginMessage.classList.remove("success");
                loginMessage.classList.add("error");
        }
    });
}

export function createNewAccount() {
    const registerForm = document.querySelector(".registration-form form");
    if (!registerForm) {
        console.warn("No register form found: skipping createNewAccount setup.");
        return;
    }
    const createAccountModal = document.querySelector("#register-modal");
    const openAcctBtn = document.querySelector("#open-create-account");
    const closeAcctBtn = document.querySelector(".x-button");

    // input elements
    const nameInput = document.querySelector("#reg-name");
    const emailInput = document.querySelector("#reg-email");
    const passwordInput = document.querySelector("#reg-password");
    const checkPassword = document.querySelector("#re-ent-pwd");

    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        clearErrors();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const chkPwd = checkPassword.value.trim();

        let hasError = false;

        if (!name) {
            document.querySelector("#name-error").textContent = "Name is required";
            nameInput.classList.add("error");
            hasError = true;
        }
        if (!email) {
            document.querySelector("#email-error").textContent = "Email is required";
            emailInput.classList.add("error");
            hasError = true;
        }
        if (!password) {
            document.querySelector("#password-error").textContent = "Password is required";;
            passwordInput.classList.add("error");
            hasError = true;
        }

        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/; // at least 8 characters, one letter and one number
        if (password && !passwordPattern.test(password)) {
            document.querySelector("#password-error").textContent = 
                "Try a stronger password.";
            passwordInput.classList.add("error");
            hasError = true;
        }

        if (password !== chkPwd) {
            document.querySelector("#re-password-error").textContent = 
                "Passwords do not match";
                checkPassword.classList.add("error");
                hasError = true;
        }
        if (hasError) return;

        // if required is entered, submit
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const userExists = users.find(user => user.email === email);
        if (userExists) {
            document.querySelector("#email-error").textContent = 
                "An account with this email already exists";
            emailInput.classList.add("error");
            return;
        }
        // hashing function 
        const hashedPassword = await hashPassword(password);
        const newUser = {
            name, 
            email,
            password: hashedPassword
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        // account created message
        const acctCreatedMsg = document.querySelector("#reg-message");
        acctCreatedMsg.textContent = "Account created successfully!";
        acctCreatedMsg.classList.add("success");

        setTimeout(() => {
            acctCreatedMsg.textContent = "";
            acctCreatedMsg.classList.remove("success");
        
            // show confirmation and reset
            registerForm.reset();
            closeRegistrationForm();
            // if (typeof openModal === "function") openModal();
            document.querySelector("#login-modal").classList.remove("hidden");
        }, 3000);
    });

    // function to open registration form
    function openRegistrationForm() {
        // hide login modal when opening registration form
        document.querySelector("#login-modal").classList.add("hidden");
        
        createAccountModal.classList.remove("hidden");
        createAccountModal.classList.add("open");
        createAccountModal.setAttribute("aria-hidden", "false");
    }
    // function to remove the open class from registration form
    function closeRegistrationForm() {
        createAccountModal.classList.remove("open");
        createAccountModal.classList.add("hidden");
        createAccountModal.setAttribute("aria-hidden", "true");

        // show modal again
        document.querySelector("#login-modal").classList.remove("hidden");
    }

    // add event listerner to submit button
    openAcctBtn.addEventListener("click", (event) => {
        event.preventDefault();
        openRegistrationForm();
    });
    // event listener for close button
    closeAcctBtn.addEventListener("click", closeRegistrationForm);
    
    // add event listener to window for keyboard/keydown event
    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            if (createAccountModal.classList.contains("open")) {
                closeRegistrationForm();
            }
        }
    });

    // clear errors
    function clearErrors() {
        document.querySelectorAll(".error-message").forEach (span => {
            span.textContent = "";
        });
        document.querySelectorAll("input").forEach(input => {
            input.classList.remove("error");
        });
    }
}  

// live validation for correct password 
const regPasswordInput = document.querySelector("#reg-password");
if (regPasswordInput) {
    regPasswordInput.addEventListener("input", function () {
        const password = this.value;

        // regex rules
    const hasLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*()_\-+={}[\]:;"'<>,.?\\|/~]/.test(password);
    
    // toggle classes
    document.querySelector("#length").className = hasLength ? "valid" : "invalid";
    document.querySelector("#uppercase").className = hasUpperCase ? "valid" : "invalid";
    document.querySelector("#lowercase").className = hasLowerCase ? "valid" : "invalid";
    document.querySelector("#number").className = hasNumber ? "valid" : "invalid";
    document.querySelector("#symbol").className = hasSymbol ? "valid" : "invalid";
    });
}
initModal();