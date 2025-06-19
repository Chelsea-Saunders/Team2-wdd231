
// hasging function
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}
    
export function initModal() {
    const modalBox = document.querySelector("#login-modal");

    const focusableElements = modalBox.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length -1];

    const loginForm = modalBox.querySelector("form");
    const closeModalButton = document.querySelector(".close-button");
    const openModalButton = document.querySelector("#main-login");
    const loginMessage = document.querySelector("#login-message");

    // function that will add the class open to the modal
    function openModal() {
        modalBox.classList.remove("hidden");
        modalBox.classList.add("open");
        modalBox.setAttribute("aria-hidden", "false");

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

    //  add keydown event listener to trap the "tab" key
    modalBox.addEventListener("keydown", function (e) {
        if (e.key === "Tab") {
            if (e.shiftKey) { // shift + tab
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus(); // focus on last element
                }
            } else { // tab
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus(); // focus on first element
                }
            }
        }
    });

    // add event listener to the login button
    openModalButton.addEventListener("click", (event) => {
        event.preventDefault();
        openModal();
    });

    // add event listener to close button
    closeModalButton.addEventListener("click", closeModal);

    // add event listener to window for keyboard/keydown event
    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeModal();
        }
    });
    window.addEventListener("click", (event) => {
        if (event.target===modalBox) {
            closeModal();
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
        }, 3000);
        
        // show confirmation and reset
        registerForm.reset();
        closeRegistrationForm();
        // if (typeof openModal === "function") openModal();
        document.querySelector("#login-modal").classList.remove("hidden");
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
    window.addEventListener("click", (event) => {
        if (event.target === createAccountModal) {
            closeRegistrationForm();
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