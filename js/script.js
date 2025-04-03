#!/usr/bin/node

// Typing text array
const texts = [
    "I speak Python fluently, but my snake charming skills need work.",
    "JavaScript is my cup of tea, it keeps me grounded even when my DOM's in disarray.",
    "Turning caffeine into code since 2021!"
];

let currentTextIndex = 0;
let currentText = texts[currentTextIndex];
let index = 0;
const speed = 50;
const pauseDuration = 3000;

// Enhanced typing animation with Anime.js
function typeWriter() {
    const textElement = document.getElementById("text");
    if (index < currentText.length) {
        textElement.innerHTML += currentText.charAt(index);
        index++;
        setTimeout(typeWriter, speed);
    } else {
        anime({
            targets: textElement,
            opacity: [1, 0],
            duration: 500,
            easing: 'easeOutQuad',
            complete: () => {
                setTimeout(resetText, pauseDuration);
            }
        });
    }
}

function resetText() {
    index = 0;
    currentTextIndex = (currentTextIndex + 1) % texts.length;
    currentText = texts[currentTextIndex];
    const textElement = document.getElementById("text");
    textElement.innerHTML = "";
    anime({
        targets: textElement,
        opacity: [0, 1],
        duration: 500,
        easing: 'easeInQuad',
        complete: typeWriter
    });
}

// Main animations
document.addEventListener('DOMContentLoaded', () => {
    // Letter wrapping function
    function wrapLetters(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            for (let i = 0; i < text.length; i++) {
                const span = document.createElement('span');
                span.classList.add('letter');
                span.style.display = 'inline-block';
                span.textContent = text[i] === ' ' ? '\u00A0' : text[i];
                element.appendChild(span);
            }
        });
        return elements;
    }

    // Header entrance with particle effect
    anime({
        targets: 'header',
        translateY: [-100, 0],
        opacity: [0, 1],
        duration: 1500,
        easing: 'easeOutElastic(1, .5)',
        begin: () => {
            anime({
                targets: 'header h1',
                scale: [0.5, 1],
                rotate: ['-10deg', '0deg'],
                duration: 1000,
                easing: 'spring(1, 80, 10, 0)'
            });
        }
    });

    // Navigation with dynamic hover effects
    const navItems = document.querySelectorAll('nav ul li');
    anime({
        targets: navItems,
        translateX: [-50, 0],
        opacity: [0, 1],
        delay: anime.stagger(100, {start: 300}),
        easing: 'easeOutBack'
    });

    navItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            anime({
                targets: item,
                scale: 1.1,
                color: '#ff4500',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        item.addEventListener('mouseleave', () => {
            anime({
                targets: item,
                scale: 1,
                color: '#ff8c00',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });

    // Theme toggle animation
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        anime({
            targets: '.toggle-thumb',
            translateX: document.body.classList.contains('light-theme') ? 26 : 0,
            duration: 400,
            easing: 'spring(1, 80, 10, 0)'
        });
    });

    // About section with layered animations
    anime.timeline({
        easing: 'easeOutExpo'
    })
    .add({
        targets: '.about-info h2',
        scale: [0, 1],
        rotate: ['-15deg', '0deg'],
        opacity: [0, 1],
        duration: 1200
    })
    .add({
        targets: '.about-info p',
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 1000
    }, '-=800')
    .add({
        targets: '.about-details',
        translateX: [-30, 0],
        opacity: [0, 1],
        delay: anime.stagger(150),
        duration: 800
    });

    // Video dance animation
    anime({
        targets: '#dance',
        scale: [0.8, 1],
        rotate: ['5deg', '0deg'],
        duration: 1500,
        easing: 'easeOutElastic(1, .8)',
        loop: true,
        direction: 'alternate'
    });

    // Social icons with bounce effect
    anime({
        targets: '#socials a',
        scale: [0, 1],
        rotate: ['-360deg', '0deg'],
        delay: anime.stagger(100, {start: 1000}),
        duration: 800,
        easing: 'spring(1, 80, 10, 0)'
    });

    // Skills section with dynamic effects
    const skillLists = document.querySelectorAll('#skill ul');
    anime({
        targets: skillLists,
        scale: [0, 1],
        rotate: ['-10deg', '0deg'],
        opacity: [0, 1],
        delay: anime.stagger(200),
        duration: 1000,
        easing: 'easeOutElastic(1, .6)'
    });

    const descriptionItems = document.querySelectorAll('#descriptions > div');
    anime({
        targets: descriptionItems,
        translateY: [50, 0],
        opacity: [0, 1],
        delay: anime.stagger(200, {start: 500}),
        duration: 800,
        easing: 'easeOutBack'
    });

    // Projects section with card flip effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: card,
                        rotateY: [-90, 0],
                        opacity: [0, 1],
                        duration: 1000,
                        easing: 'easeOutExpo'
                    });
                    observer.unobserve(card);
                }
            });
        }, { threshold: 0.2 });
        observer.observe(card);

        card.addEventListener('mouseenter', () => {
            anime({
                targets: card,
                scale: 1.05,
                boxShadow: '0 15px 30px rgba(255, 140, 0, 0.4)',
                borderColor: '#ff4500',
                duration: 400,
                easing: 'spring(1, 80, 10, 0)'
            });
        });

        card.addEventListener('mouseleave', () => {
            anime({
                targets: card,
                scale: 1,
                boxShadow: '0 0 0 rgba(255, 140, 0, 0)',
                borderColor: '#ddd',
                duration: 400,
                easing: 'spring(1, 80, 10, 0)'
            });
        });
    });

    // Contact form with input animations
    anime({
        targets: '#contact form > *',
        translateX: [-50, 0],
        opacity: [0, 1],
        delay: anime.stagger(150),
        duration: 800,
        easing: 'easeOutBack'
    });

    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            anime({
                targets: input,
                scale: 1.02,
                borderColor: '#ff4500',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        input.addEventListener('blur', () => {
            anime({
                targets: input,
                scale: 1,
                borderColor: '#ff8c00',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });

    // Section headings with morphing effect
    const headings = wrapLetters('section > h2');
    headings.forEach(heading => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: heading.querySelectorAll('.letter'),
                        scale: [0, 1],
                        translateY: ['1.5em', 0],
                        rotate: ['-45deg', '0deg'],
                        delay: anime.stagger(50),
                        duration: 800,
                        easing: 'easeOutElastic(1, .5)'
                    });
                    observer.unobserve(heading);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(heading);
    });

    // Footer animation
    anime({
        targets: 'footer p',
        translateY: [20, 0],
        opacity: [0, 1],
        delay: anime.stagger(200, {start: 1000}),
        duration: 800,
        easing: 'easeOutQuad'
    });
});

// Start typing animation
typeWriter();

// Form validation remains the same
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

function validateEmail() {
    const email = document.getElementById('email').value;
    const error = document.getElementById('errorEmail');
    if (email.length === 0) {
        error.innerHTML = 'Please enter an email address';
        return false;
    }
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!email.match(emailPattern)) {
        error.innerHTML = 'Please enter a valid email address.';
        return false;
    }
    error.innerHTML = '';
    return true;
}

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

function validateForm() {
    return validateName() && validateEmail() && validateMessage();
}

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
                anime({
                    targets: '#contact form',
                    scale: [1, 1.05, 1],
                    rotate: ['0deg', '5deg', '0deg'],
                    duration: 1000,
                    easing: 'easeInOutQuad',
                    complete: () => alert('Form submitted successfully!')
                });
            } else {
                alert('There was a problem submitting the form.');
            }
        };
        xhr.send(formData);
    }
});