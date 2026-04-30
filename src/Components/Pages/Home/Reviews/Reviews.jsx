import React from "react";
import "./Reviews.css";

const testimonials = [
  {
    name: "Hassan",
    handle: "@hassan",
    text: "I'm at a loss for words. This is amazing. I love it.",
    color: "linear-gradient(45deg, #56ab2f, #a8e063)",
  },
  {
    name: "Khadija",
    handle: "@khadija",
    text: "I've never seen anything like this before. It's amazing. I love it.",
    color: "linear-gradient(45deg, #ff512f, #f09819)",
  },
  {
    name: "Bilal",
    handle: "@bilal",
    text: "I don't know what to say. I'm speechless. This is incredible.",
    color: "linear-gradient(45deg, #8e2de2, #4a00e0)",
  },
  {
    name: "Samira",
    handle: "@samira",
    text: "I'm at a loss for words. This is amazing. I love it.",
    color: "linear-gradient(45deg, #fc00ff, #00dbde)",
  },
  {
    name: "Jane",
    handle: "@jane",
    text: "I'm at a loss for words. This is amazing. I love it.",
    color: "linear-gradient(45deg, #ff0084, #ff6348)",
  },
  {
    name: "Ali",
    handle: "@ali",
    text: "Their attention to detail and creativity blew me away. Fantastic work!",
    color: "linear-gradient(45deg, #11998e, #38ef7d)",
  },
  {
    name: "Layla",
    handle: "@layla",
    text: "I'm absolutely thrilled with my new website. Their team is top-notch!",
    color: "linear-gradient(45deg, #f12711, #f5af19)",
  },
  {
    name: "Omar",
    handle: "@omar",
    text: "Professional, efficient, and incredibly talented. Highly recommended!",
    color: "linear-gradient(45deg, #02aab0, #00cdac)",
  },
  {
    name: "Zainab",
    handle: "@zainab",
    text: "I’m speechless! The final result went beyond all my expectations.",
    color: "linear-gradient(45deg, #8E54E9, #4776E6)",
  },
  {
    name: "Fatima",
    handle: "@fatima",
    text: "They transformed my vision into a reality so perfectly. I love it!",
    color: "linear-gradient(45deg, #ffafbd, #ffc3a0)",
  },
  {
    name: "Yusuf",
    handle: "@yusuf",
    text: "Truly an outstanding experience. The website they built is stunning!",
    color: "linear-gradient(45deg, #00b09b, #96c93d)",
  },
  {
    name: "Nadia",
    handle: "@nadia",
    text: "Their creativity and dedication made all the difference. Amazing job!",
    color: "linear-gradient(45deg, #ee9ca7, #ffdde1)",
  },
  {
    name: "Farhan",
    handle: "@farhan",
    text: "I’ve never encountered such a smooth collaboration before. Thank you!",
    color: "linear-gradient(45deg, #f79d00, #64f38c)",
  },
  {
    name: "Rania",
    handle: "@rania",
    text: "They delivered on time and beyond expectations. The site is beautiful!",
    color: "linear-gradient(45deg, #00b09b, #96c93d)",
  },
  {
    name: "Ismail",
    handle: "@ismail",
    text: "Perfect execution from start to finish. I couldn't be happier!",
    color: "linear-gradient(45deg, #ED213A, #93291E)",
  },
];

const Card = ({ item }) => (
  <div className="card">
    <p className="card-quote">“</p>
    <p className="text">{item.text}</p>
    <div
      style={{
        display: "flex",
        gap: "10px",
        alignItems: "center",
        marginTop: "1rem",
      }}
    >
      <div className="avatar" style={{ background: item.color }} />
      <div>
        <h4>{item.name}</h4>
        <p className="handle">{item.handle}</p>
      </div>
    </div>
  </div>
);

const doubled = [...testimonials, ...testimonials];

const InfiniteCards = () => {
  return (
    <section className="reviews-section">
      <div className="reviews-header">
        <div className="reviews-stars">
          {[...Array(5)].map((_, i) => (
            <span key={i}>⭐</span>
          ))}
        </div>
        <h2>What Our Clients Say</h2>
        <p>Trusted by businesses across the UK</p>
      </div>

      <div className="slider-container">
        <div className="fade-left" />
        <div className="fade-right" />

        <div className="scroll-wrapper scroll-left">
          <div className="scrolling-cards">
            {doubled.map((item, i) => (
              <Card key={i} item={item} />
            ))}
          </div>
        </div>

        <div className="scroll-wrapper scroll-right">
          <div className="scrolling-cards">
            {doubled.map((item, i) => (
              <Card key={i} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfiniteCards;
