#!/usr/bin/node

const texts = [
    "Code flows through my veins.",
    "AI is my playground.",
    "Building the future, one pixel at a time."
];
let currentTextIndex = 0;
let currentText = texts[currentTextIndex];
let index = 0;
const speed = 50;
const pauseDuration = 3000;

function typeWriter() {
    if (index < currentText.length) {
        document.getElementById("text").innerHTML += currentText.charAt(index);
        index++;
        setTimeout(typeWriter, speed);
    } else {
        setTimeout(resetText, pauseDuration);
    }
}

function resetText() {
    index = 0;
    currentTextIndex = (currentTextIndex + 1) % texts.length;
    currentText = texts[currentTextIndex];
    document.getElementById("text").innerHTML = "";
    setTimeout(typeWriter, speed);
}

document.addEventListener('DOMContentLoaded', () => {
    // Loading Animation
    anime({
        targets: '.loading-overlay',
        opacity: [1, 0],
        duration: 2000,
        easing: 'easeOutExpo',
        delay: 1500,
        complete: () => {
            document.querySelector('.loading-overlay').style.display = 'none';
        }
    });
    anime({
        targets: '.loading-text',
        translateY: [-20, 0],
        opacity: [0, 1, 0],
        duration: 1500,
        easing: 'easeOutBounce'
    });

    // Header Particles
    const headerParticles = document.querySelector('.header-particles');
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        headerParticles.appendChild(particle);
    }
    anime({
        targets: '.header-particles .particle',
        translateX: () => anime.random(-50, 50),
        translateY: () => anime.random(-50, 50),
        scale: () => anime.random(0.5, 1),
        duration: () => anime.random(2000, 4000),
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutSine'
    });

    // Header Letter Animation
    anime({
        targets: 'header .letter',
        opacity: [0, 1],
        translateY: [-30, 0],
        rotate: [-15, 0],
        delay: anime.stagger(50, {start: 500}),
        easing: 'easeOutElastic(1, .5)'
    });

    // Nav Hover Effects
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            anime({
                targets: link,
                scale: 1.2,
                color: '#ff4500',
                duration: 300,
                easing: 'spring(1, 80, 10, 0)'
            });
        });
        link.addEventListener('mouseleave', () => {
            anime({
                targets: link,
                scale: 1,
                color: '#ff8c00',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });

    // Theme Toggle Animation
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        anime({
            targets: '.toggle-thumb',
            translateX: isLight ? 26 : 0,
            rotate: isLight ? 360 : 0,
            scale: [1, 1.3, 1],
            duration: 400,
            easing: 'easeOutExpo'
        });
        anime({
            targets: '.sun',
            scale: isLight ? [1, 1.5, 1] : 1,
            duration: 400,
            easing: 'easeOutExpo'
        });
        anime({
            targets: '.moon',
            scale: isLight ? 1 : [1, 1.5, 1],
            duration: 400,
            easing: 'easeOutExpo'
        });
    });

    // About Section Particles
    const particlesContainer = document.querySelector('.particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particlesContainer.appendChild(particle);
    }
    anime({
        targets: '.particles .particle',
        translateX: () => anime.random(-100, 100),
        translateY: () => anime.random(-100, 100),
        scale: () => anime.random(0.5, 1.5),
        duration: () => anime.random(2000, 5000),
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutSine'
    });

    // About Section Animations
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: '#about .letter',
                    opacity: [0, 1],
                    translateX: [-20, 0],
                    rotate: [90, 0],
                    delay: anime.stagger(50),
                    easing: 'easeOutExpo'
                });
                anime({
                    targets: '.intro-text',
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 1000,
                    easing: 'easeOutQuad',
                    delay: 500
                });
                anime({
                    targets: '#dance',
                    scale: [0, 1],
                    opacity: [0, 1],
                    rotate: '1turn',
                    duration: 1200,
                    easing: 'spring(1, 80, 10, 0)',
                    begin: () => document.getElementById('dance').play()
                });
                anime({
                    targets: '.about-details p',
                    translateY: [30, 0],
                    opacity: [0, 1],
                    delay: anime.stagger(150, {start: 800}),
                    easing: 'easeOutQuad'
                });
                anime({
                    targets: '#socials a',
                    scale: [0, 1],
                    rotate: '1turn',
                    opacity: [0, 1],
                    delay: anime.stagger(100, {start: 1200}),
                    easing: 'spring(1, 80, 10, 0)'
                });
                aboutObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    aboutObserver.observe(document.getElementById('about'));

    // Skills Section Animation
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: '#skills h2',
                    scale: [0.5, 1],
                    opacity: [0, 1],
                    duration: 800,
                    easing: 'easeOutElastic(1, .5)'
                });
                anime({
                    targets: '.skill-category',
                    translateY: [50, 0],
                    opacity: [0, 1],
                    delay: anime.stagger(200),
                    duration: 1000,
                    easing: 'easeOutQuad'
                });
                anime({
                    targets: '.skill-category li',
                    translateX: [-30, 0],
                    opacity: [0, 1],
                    delay: anime.stagger(100, {start: 400}),
                    easing: 'easeOutQuad'
                });
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    skillsObserver.observe(document.getElementById('skills'));

    // Projects Section Animation
    const projectCards = document.querySelectorAll('.project-card');
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    scale: [0.8, 1],
                    rotate: ['-10deg', '0deg'],
                    opacity: [0, 1],
                    duration: 1000,
                    easing: 'easeOutElastic(1, .5)'
                });
                projectObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    projectCards.forEach(card => projectObserver.observe(card));

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            anime({
                targets: card,
                translateY: -15,
                boxShadow: '0 15px 30px rgba(255, 140, 0, 0.6)',
                scale: 1.05,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        card.addEventListener('mouseleave', () => {
            anime({
                targets: card,
                translateY: 0,
                boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
                scale: 1,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });

    // Contact Section Animation
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: '#contact h2',
                    opacity: [0, 1],
                    translateY: [-20, 0],
                    duration: 800,
                    easing: 'easeOutQuad'
                });
                anime({
                    targets: '.form-group',
                    translateY: [30, 0],
                    opacity: [0, 1],
                    delay: anime.stagger(200, {start: 400}),
                    duration: 1000,
                    easing: 'easeOutQuad'
                });
                contactObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    contactObserver.observe(document.getElementById('contact'));

    const formInputs = document.querySelectorAll('#contact input, #contact textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            anime({
                targets: input,
                boxShadow: '0 0 15px rgba(255, 140, 0, 0.7)',
                scale: 1.02,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        input.addEventListener('blur', () => {
            anime({
                targets: input,
                boxShadow: '0 0 0 rgba(255, 140, 0, 0)',
                scale: 1,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });

    const submitButton = document.querySelector('#contact button');
    submitButton.addEventListener('mouseenter', () => {
        anime({
            targets: submitButton,
            scale: 1.1,
            backgroundColor: '#ff4500',
            duration: 300,
            easing: 'easeOutQuad'
        });
    });
    submitButton.addEventListener('mouseleave', () => {
        anime({
            targets: submitButton,
            scale: 1,
            backgroundColor: '#ff8c00',
            duration: 300,
            easing: 'easeOutQuad'
        });
    });

    // Form Submission
    const submitForm = document.getElementById('submitForm');
    submitForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (validateForm()) {
            const formData = new FormData(submitForm);
            const xhr = new XMLHttpRequest();
            xhr.open('POST', submitForm.action, true);
            xhr.setRequestHeader('Accept', 'application/json');
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                    submitForm.reset();
                    anime({
                        targets: '#submitForm',
                        opacity: [1, 0],
                        duration: 500,
                        easing: 'easeOutQuad',
                        complete: () => {
                            anime({
                                targets: '.success-message',
                                opacity: [0, 1],
                                scale: [0.5, 1],
                                duration: 800,
                                easing: 'easeOutElastic(1, .5)'
                            });
                        }
                    });
                }
            };
            xhr.send(formData);
        }
    });

    // Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    document.addEventListener('mousemove', (e) => {
        anime({
            targets: cursor,
            left: e.clientX,
            top: e.clientY,
            duration: 0
        });
    });
    document.querySelectorAll('a, button, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            anime({
                targets: cursor,
                scale: 2,
                backgroundColor: '#ff8c00',
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
        el.addEventListener('mouseleave', () => {
            anime({
                targets: cursor,
                scale: 1,
                backgroundColor: '#fff',
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
    });
});

typeWriter();

function validateName() {
    const name = document.getElementById('name').value;
    const error = document.getElementById('errorName');
    if (!name) {
        error.textContent = 'Name is required';
        return false;
    }
    error.textContent = '';
    return true;
}

function validateEmail() {
    const email = document.getElementById('email').value;
    const error = document.getElementById('errorEmail');
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!email) {
        error.textContent = 'Email is required';
        return false;
    }
    if (!emailPattern.test(email)) {
        error.textContent = 'Invalid email format';
        return false;
    }
    error.textContent = '';
    return true;
}

function validateMessage() {
    const message = document.getElementById('message').value;
    const error = document.getElementById('errorMessage');
    if (!message) {
        error.textContent = 'Message is required';
        return false;
    }
    error.textContent = '';
    return true;
}

function validateForm() {
    return validateName() && validateEmail() && validateMessage();
}