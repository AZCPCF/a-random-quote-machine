import { useEffect, useState } from "react";
import { TwitterIcon } from "./assets/twitterIcon";
import { QuoteIcon } from "./assets/quoteIcon";
function getRandomOKLCHColor() {
  const L = Math.random() * 100;
  const C = Math.random() * 0.5;
  const H = Math.random() * 360;

  return `oklch(${L.toFixed(2)}% ${C.toFixed(2)} ${H.toFixed(2)})`;
}

console.log(getRandomOKLCHColor());

const API_URL =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
const getRandomIndex = (quotes: { quote: string; author: string }[]) =>
  Math.floor(Math.random() * quotes.length);

function App() {
  const [quotes, setQuotes] = useState([{ quote: "", author: "" }]);
  const [quote, setQuote] = useState({ quote: "", author: "" });
  const [color, setColor] = useState(getRandomOKLCHColor());
  const fetchQuotes = async () => {
    const req = await fetch(API_URL);
    const res = await req.json();
    setQuotes(res.quotes);
    return res.quotes;
  };
  const getFirstQuote = async () => {
    const quotes = await fetchQuotes();
    setQuote(quotes[getRandomIndex(quotes)]);
    document.documentElement.style.setProperty(
      "--color",
      getRandomOKLCHColor()
    );
  };
  useEffect(() => {
    getFirstQuote();
  }, []);
  const getNewQuote = () => {
    setQuote(quotes[getRandomIndex(quotes)]);
    document.documentElement.style.setProperty(
      "--color",
      getRandomOKLCHColor()
    );
  };
  return (
    <main>
      <section id="quote-box">
        <div id="quote-text">
          <QuoteIcon />
          <h1 id="text">{quote.quote}</h1>
        </div>
        <div id="quote-author">
          <h6 id="author">- {quote.author}</h6>
        </div>
        <div id="quote-buttons">
          <a href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="${quote.quote}" ${quote.author}`} id="tweet-quote">
            <TwitterIcon />
          </a>
          <button id="new-quote" onClick={getNewQuote}>
            New Qoute
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;
