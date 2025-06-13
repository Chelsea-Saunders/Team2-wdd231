const quoteTextElement = document.querySelector(".quote-text");
import { API_KEY } from "./apikey.js";
console.log(API_KEY);
console.log("quoteTextElement", quoteTextElement);

async function fetchQuote() {
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
  } catch (error) {
    quoteTextElement.textContent = "Failed to load quote.";
    console.error("Quote fetch failed:", error);
  }
}


export function setupHamburgerMenu() {
  const hamburger = document.querySelector(`.hamburger`);
  const navLinks = document.querySelector(`nav ul`);

  console.log("settingup hamburger menu");
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
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
}

if (quoteTextElement) {
  fetchQuote();
}