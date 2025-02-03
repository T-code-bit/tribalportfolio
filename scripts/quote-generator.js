// Inspirational Quote Generator
const inspirationalQuotes = [
    {
        quote: "Design is not just what it looks like and feels like. Design is how it works.",
        author: "Steve Jobs"
    },
    {
        quote: "Creativity is intelligence having fun.",
        author: "Albert Einstein"
    },
    {
        quote: "The best way to predict the future is to create it.",
        author: "Peter Drucker"
    },
    {
        quote: "Innovation distinguishes between a leader and a follower.",
        author: "Steve Jobs"
    },
    {
        quote: "Design is thinking made visual.",
        author: "Saul Bass"
    },
    {
        quote: "Simplicity is the ultimate sophistication.",
        author: "Leonardo da Vinci"
    },
    {
        quote: "Every great design begins with an even better story.",
        author: "Lorinda Mamo"
    }
];

function getRandomQuote() {
    const quoteElement = document.getElementById('dynamic-quote');
    if (quoteElement) {
        const randomQuote = inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)];
        quoteElement.innerHTML = `
            <blockquote>
                "${randomQuote.quote}"
                <footer>— ${randomQuote.author}</footer>
            </blockquote>
        `;
    }
}

// Initialize quote on page load
document.addEventListener('DOMContentLoaded', getRandomQuote);

// Change quote every 5 minutes
setInterval(getRandomQuote, 5 * 60 * 1000);
