import { API_KEY } from "./apikey.mjs";
console.log(API_KEY);
// Skills Section
const skills = [
  "JavaScript",
  "SQL",
  "React",
  "Figma",
  "User Research",
  "HTML/CSS",
  "Power BI",
  "Python"
];

export async function fetchQuote() {
  const quoteTextElement = document.querySelector(".quote-text");
  if (!quoteTextElement) return;
  try 
  {
      const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
      method: "GET",
      headers: {
      "X-Api-Key": API_KEY
  }
  });  

  if (!response.ok) 
  {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  const quote = data[0];

  quoteTextElement.textContent = `"${quote.quote}" — ${quote.author}`;
  } 
  catch (error) {
    quoteTextElement.textContent = "Failed to load quote.";
    console.error("Quote fetch failed:", error);
  }
}


export function setupHamburgerMenu() {
  const hamburger = document.querySelector(`.hamburger`);
  const navLinks = document.querySelector(`nav > ul`);
  console.log("settingup hamburger menu");
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      console.log("Toggling class to:", navLinks.classList.value);
      navLinks.classList.toggle('active');
    });
  }
}

// MAIN PAGE MODAL FOR RESUMES
export function setupResumeModals() {
  const resume1 = document.querySelector("#resume1");
  if (resume1) {
    resume1.addEventListener("click", () => {
      document.getElementById("modal1").classList.add("show");
    });
  }

  const resume2 = document.querySelector("#resume2");
  if (resume2) {
    resume2.addEventListener("click", () => {
      document.getElementById("modal2").classList.add("show");
    });
  }

  const resume3 = document.querySelector("#resume3");
  if (resume3) {
    resume3.addEventListener("click", () => {
      document.getElementById("modal3").classList.add("show");
    });
  }

  document.querySelectorAll(".modal").forEach(modal => {
    modal.addEventListener("click", e => {
      if (!e.target.closest(".modal-content")) {
        modal.classList.remove("show");
      }
    });
  });

  document.querySelectorAll(".close-button").forEach(button => {
    button.addEventListener("click", () => {
      const modal = button.closest(".modal");
      if (modal) {
        modal.classList.remove("show");
      }
    })
  })
}

export function setupDynamicResumes() {
  const resumes = JSON.parse(localStorage.getItem("resumes")) || [];
  const resumeList = document.querySelector(".resume-list");

  resumes.forEach((resume, index) => {
    const card = document.createElement("div");
    card.classList.add("resume-card");

    let workCompany = "No work experience";
    if (Array.isArray(resume.workExperience) && resume.workExperience.length > 0) {
      workCompany = resume.workExperience[0].company;
    }

    card.innerHTML = `
      <p class="name">${resume.contactInfo.name}</p>
      <p class="job">${workCompany}</p>
      <p class="location">${resume.contactInfo.address}</p>
    `;

    card.addEventListener("click", () => {
      window.open(`resume.html?resumeIndex=${index}`, "_blank");
    });
    resumeList.appendChild(card);
  });
}

// Skill dropdown
export function setupSkillDropdown() {
  const skillSelect = document.getElementById("skill-options");

  if (!skillSelect) {
    // make it ok if the dropdown is not on each page
    return;
  }

  skills.forEach(skill => {
    const option = document.createElement("option");
    option.value = skill.toLowerCase()
    option.textContent = skill;
    skillSelect.appendChild(option);
  });
}

export function setupSkillFilter() {
  const skillSelect = document.getElementById("skill-options");

  if (!skillSelect) return;

  skillSelect.addEventListener("change", (event) => {
    const selectedSkill = event.target.value.toLowerCase();

    document.querySelectorAll(".resume-card").forEach(card => {
      const skills = card.dataset.skills?.split(",") || [];

      const showCard = selectedSkill === "" || skills.includes(selectedSkill);
      card.style.display = showCard ? "block" : "none";
    });
  });
}
