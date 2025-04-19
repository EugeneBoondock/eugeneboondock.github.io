import React from 'react';

function Contact() {
  return (
    <section id="contact">
      <h2>Contact Me</h2>
      <form id="submitForm" action="https://formspree.io/f/xrgwdrlv" method="POST">
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" id="name" placeholder="Your Name" required />
        <p id="errorName" style={{ color: 'red' }}></p>

        <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="email" placeholder="Your Email" required />
        <p id="errorEmail" style={{ color: 'red' }}></p>

        <label htmlFor="message">Message:</label>
        <textarea name="message" rows="4" id="message" placeholder="Say Something" required></textarea>
        <p id="errorMessage" style={{ color: 'red' }}></p>

        <button type="submit">Submit</button>
        <p id="errorSubmit" style={{ color: 'red' }}></p>
      </form>
    </section>
  );
}

export default Contact;
