import React, { useState } from 'react';
// ...existing code...
import '../styles.css';
// ...existing code...

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to a backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    // Reset submission status after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you! Send us a message and we'll respond as soon as possible.</p>
        </div>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card">
              <h2>Get in Touch</h2>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <div>
                  <h3>Address</h3>
                  <p>123 Book Street<br />Literary City, LC 12345</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <div>
                  <h3>Phone</h3>
                  <p>(123) 456-7890</p>
                  <p>Mon-Fri: 9am-5pm EST</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <div>
                  <h3>Email</h3>
                  <p>info@bookhaven.com</p>
                  <p>support@bookhaven.com</p>
                </div>
              </div>
            </div>
            
            <div className="info-card">
              <h2>Frequently Asked Questions</h2>
              <div className="faq-item">
                <h3>How long does shipping take?</h3>
                <p>Standard shipping takes 2-3 business days. Expedited shipping options are available at checkout.</p>
              </div>
              <div className="faq-item">
                <h3>What is your return policy?</h3>
                <p>We offer a 30-day return policy for books in original condition. Please see our Returns page for details.</p>
              </div>
              <div className="faq-item">
                <h3>Do you offer international shipping?</h3>
                <p>Yes, we ship to over 50 countries. Shipping costs and delivery times vary by destination.</p>
              </div>
            </div>
          </div>
          
          <div className="contact-form">
            <h2>Send us a Message</h2>
            {isSubmitted ? (
              <div className="form-success">
                <h3>Thank you for your message!</h3>
                <p>We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Send Message</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

