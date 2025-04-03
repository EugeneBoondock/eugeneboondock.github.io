#!/usr/bin/node

// An array of text strings
const texts = [
    "I speak Python fluently, but my snake charming skills need work.",
    "JavaScript is my cup of tea, it keeps me grounded even when my DOM's in disarray.",
    "Turning caffeine into code since 2021!"
];
// Initialize variables
let currentTextIndex = 0;
let currentText = texts[currentTextIndex];
let index = 0;
const speed = 50; //speed of typing
const pauseDuration = 3000; // 3 seconds

// Function for typing text
function typeWriter() {
    if (index < currentText.length) {
        document.getElementById("text").innerHTML += currentText.charAt(index);
        index++;
        setTimeout(typeWriter, speed);
    } else {
        setTimeout(resetText, pauseDuration);
    }
}

// Function to reset the text and continue typing
function resetText() {
    index = 0;
    currentTextIndex = (currentTextIndex + 1) % texts.length;
    currentText = texts[currentTextIndex];
    document.getElementById("text").innerHTML = "";
    setTimeout(typeWriter, speed);
}

// Anime.js animations
document.addEventListener('DOMContentLoaded', () => {
    // Function to wrap each letter in a span for animation
    function wrapLetters(selector) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';

            // Create spans for each letter
            for (let i = 0; i < text.length; i++) {
                const letterSpan = document.createElement('span');
                letterSpan.classList.add('letter');
                letterSpan.style.display = 'inline-block';
                letterSpan.style.opacity = '0';
                letterSpan.textContent = text[i] === ' ' ? '\u00A0' : text[i];
                element.appendChild(letterSpan);
            }
        });

        return elements;
    }

    // Apply to main headings - the h2 elements
    const mainHeadings = wrapLetters('section > h2');

    // Create the staggered letter animation for each heading
    mainHeadings.forEach(heading => {
        // Create intersection observer to trigger animation when visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const letters = heading.querySelectorAll('.letter');

                    anime.timeline({
                        targets: letters,
                        easing: 'easeOutExpo',
                    })
                    .add({
                        opacity: [0, 1],
                        translateY: ['1.2em', 0],
                        rotateZ: [45, 0],
                        duration: 750,
                        delay: anime.stagger(50, {start: 300}),
                    })
                    .add({
                        targets: heading,
                        duration: 1000,
                        color: ['#FFF', '#ff8c00', '#FFF'],
                        easing: 'easeInOutSine',
                        delay: 1000
                    });

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(heading);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;

                anime({
                    targets: document.scrollingElement,
                    scrollTop: targetPosition,
                    duration: 800,
                    easing: 'easeInOutQuad'
                });
            }
        });
    });

    // Header animation
    anime({
        targets: 'header',
        translateY: [-50, 0],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutExpo'
    });

    // Navigation menu animation
    anime({
        targets: 'nav ul li',
        translateY: [-20, 0],
        opacity: [0, 1],
        delay: anime.stagger(100, {start: 500}),
        easing: 'easeOutQuad'
    });

    // About section animations
    anime({
        targets: '.about-info',
        translateX: [-50, 0],
        opacity: [0, 1],
        duration: 1200,
        delay: 800,
        easing: 'easeOutQuad'
    });

    anime({
        targets: '.about-details',
        translateY: [20, 0],
        opacity: [0, 1],
        delay: anime.stagger(100, {start: 1000}),
        easing: 'easeOutQuad'
    });

    // Social media icons animation
    anime({
        targets: '#socials a',
        scale: [0, 1],
        opacity: [0, 1],
        delay: anime.stagger(150, {start: 1500}),
        easing: 'spring(1, 80, 10, 0)'
    });

    // Projects animation on scroll
    const projectCards = document.querySelectorAll('.project-card');

    // Add observer for animating elements when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    translateY: [50, 0],
                    opacity: [0, 1],
                    duration: 800,
                    easing: 'easeOutQuad'
                });
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    projectCards.forEach(card => {
        observer.observe(card);
    });

    // Project card hover animations
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            anime({
                targets: card,
                scale: 1.03,
                boxShadow: '0 8px 20px rgba(255, 140, 0, 0.3)',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });

        card.addEventListener('mouseleave', () => {
            anime({
                targets: card,
                scale: 1,
                boxShadow: '0 0 0 rgba(255, 140, 0, 0)',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });

    // Skills animation
    anime({
        targets: '#skill ul',
        scale: [0.9, 1],
        opacity: [0, 1],
        delay: anime.stagger(150),
        easing: 'easeOutElastic(1, .5)'
    });

    // Contact form animation
    anime({
        targets: '#contact form > *',
        translateY: [20, 0],
        opacity: [0, 1],
        delay: anime.stagger(100),
        easing: 'easeOutQuad'
    });

    // Section headings animation
    anime({
        targets: 'section h2',
        translateY: [-30, 0],
        opacity: [0, 1],
        delay: anime.stagger(300),
        easing: 'easeOutQuad'
    });

    // Highlight the new projects (3rd Island Tours and Crypto Wallet Tracker)
    const newProjects = document.querySelectorAll('.project-card:nth-last-child(-n+2)');

    setTimeout(() => {
        newProjects.forEach(project => {
            anime({
                targets: project,
                backgroundColor: [
                    'rgba(34, 34, 34, 1)',
                    'rgba(255, 140, 0, 0.2)',
                    'rgba(34, 34, 34, 1)'
                ],
                duration: 1500,
                easing: 'easeInOutQuad',
                loop: 2
            });
        });
    }, 2000);

    // Special animation for 3rd Island Tours logo
    const tourLogoImg = document.querySelector('.project-card:nth-last-child(2) .project-image');
    if (tourLogoImg) {
        // Initial setup for logo
        anime({
            targets: tourLogoImg,
            scale: [0, 1],
            rotate: ['20deg', '0deg'],
            opacity: [0, 1],
            duration: 1200,
            delay: 2500,
            easing: 'easeOutElastic(1, .5)'
        });

        // Continuous pulse effect
        setTimeout(() => {
            anime({
                targets: tourLogoImg,
                scale: [1, 1.05, 1],
                duration: 2000,
                loop: true,
                direction: 'alternate',
                easing: 'easeInOutSine'
            });
        }, 3700);
    }

}); // End of DOMContentLoaded

// Typing animation
typeWriter();

// Function to validate the name field
function validateName() {
    const name = document.getElementById('name').value;
    const error = document.getElementById('errorName');

    if (name.length === 0) {
        error.innerHTML = 'Please enter your Name';
        return false;
    }

    error.innerHTML = '';
    return true;
}

// Function to validate the email field
function validateEmail() {
    const email = document.getElementById('email').value;
    const error = document.getElementById('errorEmail');

    if (email.length === 0) {
        error.innerHTML = 'Please enter an email address';
        return false;
    }

    // Regular expression for email validation
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!email.match(emailPattern)) {
        error.innerHTML = 'Please enter a valid email address.';
        return false;
    }

    error.innerHTML = '';
    return true;
}

// Function to validate the message field
function validateMessage() {
    const message = document.getElementById('message').value;
    const error = document.getElementById('errorMessage');

    if (message.length === 0) {
        error.innerHTML = 'Please enter your message.';
        return false;
    }

    error.innerHTML = '';
    return true;
}

// Function to validate the form fields
function validateForm() {
    const isValidName = validateName();
    const isValidEmail = validateEmail();
    const isValidMessage = validateMessage();

    return isValidName && isValidEmail && isValidMessage;
}

// Add event listener to the form submission
const submitForm = document.getElementById('submitForm');

submitForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (validateForm()) {
        const form = document.getElementById('submitForm');
        const formData = new FormData(form);
        const xhr = new XMLHttpRequest();

        xhr.open('POST', form.action, true);
        xhr.setRequestHeader('Accept', 'application/json');

        xhr.onreadystatechange = function () {
            if (xhr.readyState !== XMLHttpRequest.DONE) return;
            if (xhr.status === 200) {
                form.reset();

                // Show success animation
                anime({
                    targets: '#contact form',
                    scale: [1, 1.02, 1],
                    duration: 800,
                    easing: 'easeInOutQuad',
                    complete: function() {
                        alert('Form submitted successfully!');
                    }
                });
            } else {
                alert('There was a problem submitting the form.');
            }
        };

        xhr.send(formData);
    }
});
