import React from 'react';
// ...existing code...
import '../styles.css';
// ...existing code...

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <div className="about-header">
          <h1>About BookHaven</h1>
          <p>Your premier destination for all things literary</p>
        </div>
        
        <div className="about-content">
          <div className="about-section">
            <h2>Our Story</h2>
            <p>Founded in 2025, BookHaven began with a simple mission: to create a welcoming space for book lovers to discover, explore, and purchase their favorite reads. What started as a small online bookstore has grown into a comprehensive platform serving readers across the country.</p>
            <p>Our team of passionate bibliophiles works tirelessly to curate an exceptional collection of books across all genres, ensuring there's something for every type of reader.</p>
          </div>
          
          <div className="about-section">
            <h2>Our Mission</h2>
            <p>At BookHaven, we believe in the transformative power of books. Our mission is to:</p>
            <ul>
              <li>Provide access to a diverse range of literature</li>
              <li>Foster a community of readers and book enthusiasts</li>
              <li>Support authors and publishers by promoting their work</li>
              <li>Make book buying convenient, affordable, and enjoyable</li>
            </ul>
          </div>
          
          <div className="about-section">
            <h2>What We Offer</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">📚</div>
                <h3>Extensive Collection</h3>
                <p>Over 1 million titles across all genres and formats</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🚚</div>
                <h3>Fast Shipping</h3>
                <p>Free shipping on orders over $25 with delivery in 2-3 business days</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">💰</div>
                <h3>Competitive Prices</h3>
                <p>Everyday low prices and regular promotions on bestsellers</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">👥</div>
                <h3>Community</h3>
                <p>Book clubs, author events, and reading recommendations</p>
              </div>
            </div>
          </div>
          
          <div className="about-section">
            <h2>Our Team</h2>
            <p>BookHaven is powered by a dedicated team of book lovers, tech enthusiasts, and customer service experts. We're united by our passion for literature and commitment to providing an exceptional experience for our customers.</p>
            <p>Meet some of our key team members:</p>
            <div className="team-grid">
              <div className="team-member">
                <div className="member-avatar">JD</div>
                <h3>Numan Khan</h3>
                <p>Founder & CEO</p>
              </div>
              <div className="team-member">
                <div className="member-avatar">JS</div>
                <h3>Labonno</h3>
                <p>Head of Curation</p>
              </div>
              <div className="team-member">
                <div className="member-avatar">MJ</div>
                <h3>Alvee</h3>
                <p>Customer Experience Lead</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
