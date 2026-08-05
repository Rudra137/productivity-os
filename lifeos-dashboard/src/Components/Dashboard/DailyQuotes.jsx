import { useEffect, useState } from "react";

function DailyQuote() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  const today = new Date().toLocaleDateString();

  const fallbackQuote = {
    text: "Small progress every day compounds into remarkable results.",
    author: "LifeOS"
  };

  useEffect(() => {
    const loadQuote = async () => {
      try {
        // Check localStorage first
        const savedQuote = localStorage.getItem("dailyQuote");
        const savedDate = localStorage.getItem("dailyQuoteDate");

        if (savedQuote && savedDate === today) {
          setQuote(JSON.parse(savedQuote));
          setLoading(false);
          return;
        }

        // Fetch a new quote
        const response = await fetch("https://zenquotes.io/api/random");

        if (!response.ok) {
          throw new Error("Failed to fetch quote");
        }

        const data = await response.json();

        const newQuote = {
          text: data[0].q,
          author: data[0].a
        };

        // Save for today
        localStorage.setItem(
          "dailyQuote",
          JSON.stringify(newQuote)
        );

        localStorage.setItem(
          "dailyQuoteDate",
          today
        );

        setQuote(newQuote);
      } catch (error) {
        console.error(error);

        setQuote(fallbackQuote);
      } finally {
        setLoading(false);
      }
    };

    loadQuote();
  }, [today]);

  if (loading) {
    return (
      <div
        style={{
        marginTop: "20px",
        fontSize: "16px",
        fontStyle: "italic"
        }}
      >
        💭 Loading today's inspiration...
      </div>
    );
  }

  return (
        <div
      style={{
        
        marginTop: "20px",
        fontSize: "16px",
        fontStyle: "italic"
      }}
    >
      "{quote.text}"
    </div>
  );
}

export default DailyQuote;