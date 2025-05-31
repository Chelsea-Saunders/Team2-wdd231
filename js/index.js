const quoteTextElement = document.querySelector(".quote-text");

async function fetchQuote() {
    try 
    {
        const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
        method: "GET",
        headers: {
        "X-Api-Key": "AFNWi98lMT0sEK0Mt/YtYw==5L3iTaRKERtDIExX"
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
fetchQuote();

const hamburger = document.querySelector(`.hamburger`);
const navLinks = document.querySelector(`nav ul`);

hamburger.addEventListener('click', () => {
navLinks.classList.toggle('active');
});
