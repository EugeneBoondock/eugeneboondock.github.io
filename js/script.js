// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {

    const anime = window.anime; // Use the global anime instance

    // --- Theme Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const toggleThumb = document.querySelector('.toggle-thumb');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Set initial theme based on preference or saved state
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.className = savedTheme;
    } else if (prefersDark) {
        body.className = 'dark-theme';
    } else {
        body.className = 'light-theme';
    }
    // Update toggle position without animation on load
    if (body.classList.contains('light-theme')) {
        toggleThumb.style.transform = 'translateX(24px)';
    } else {
        toggleThumb.style.transform = 'translateX(0px)';
    }

    themeToggle.addEventListener('click', () => {
        const isDark = body.classList.contains('dark-theme');
        const targetTheme = isDark ? 'light-theme' : 'dark-theme';
        body.className = targetTheme; // Switch class immediately

        // Animate the toggle thumb
        anime({
            targets: toggleThumb,
            translateX: isDark ? 24 : 0, // Target position based on new theme
            duration: 400,
            easing: 'spring(1, 70, 15, 0)' // Bouncy spring
        });

         // Animate icons (optional: subtle scale/color change)
         anime({
            targets: '#theme-toggle span',
            scale: [1, 1.2, 1],
            duration: 300,
            easing: 'easeInOutQuad'
        });


        localStorage.setItem('theme', targetTheme); // Save preference
    });

    // --- Typewriter Effect ---
    const texts = [
        "Building pixel-perfect UIs and robust backends.",
        "Exploring the frontiers of AI and Machine Learning.",
        "Turning caffeine into code, one line at a time.",
        "Passionate about clean code and creative solutions.",
        "Web Development + AI = Future Magic ✨"
    ];
    let currentTextIndex = 0;
    let currentText = '';
    let letterIndex = 0;
    const speed = 60; // Typing speed
    const deleteSpeed = 40; // Deleting speed
    const pauseDuration = 2000; // Pause before switching text
    const textElement = document.getElementById("text");
    let isDeleting = false;

    function typeWriterLoop() {
        const fullText = texts[currentTextIndex];

        if (isDeleting) {
            // Deleting phase
            currentText = fullText.substring(0, letterIndex - 1);
            letterIndex--;
        } else {
            // Typing phase
            currentText = fullText.substring(0, letterIndex + 1);
            letterIndex++;
        }

        textElement.innerHTML = currentText;

        let typeSpeed = isDeleting ? deleteSpeed : speed;

        // If finished typing
        if (!isDeleting && letterIndex === fullText.length) {
            typeSpeed = pauseDuration; // Pause at end
            isDeleting = true; // Start deleting next cycle
        }
        // If finished deleting
        else if (isDeleting && letterIndex === 0) {
            isDeleting = false; // Start typing next text
            currentTextIndex = (currentTextIndex + 1) % texts.length; // Move to next text
            typeSpeed = speed * 2; // Short pause before typing new text
        }

        setTimeout(typeWriterLoop, typeSpeed);
    }

    // Start typewriter after a small delay
    setTimeout(typeWriterLoop, 1500);


    // --- Master Animation Timeline (for initial page load) ---
    const masterTimeline = anime.timeline({
        easing: 'easeOutExpo', // Default easing for the timeline
        duration: 1000 // Default duration
    });

    // Split text for letter animations
    function wrapLetters(selector, className = 'letter') {
        document.querySelectorAll(selector).forEach(el => {
            el.innerHTML = el.textContent.replace(/(\S*)/g, m => {
              return `<span class="${className}-word">` +
                      m.replace(/(-|#|@)?\S(-|#|@)?/g, `<span class='${className}'>$&</span>`) +
                     `</span>`;
            });
        });
    }

    wrapLetters('.header-title');
    wrapLetters('.header-subtitle', 'sub-letter'); // Different class if needed


    masterTimeline
        // Header Reveal
        .add({
            targets: 'header',
            opacity: [0, 1],
            translateY: [-80, 0],
            duration: 800
        }, 0) // Start at time 0
        .add({
            targets: '.header-title .letter',
            opacity: [0, 1],
            translateY: ['1em', 0],
            rotateZ: [10, 0],
            scale: [0.5, 1],
            duration: 800,
            delay: anime.stagger(40, { start: 200 }) // Stagger letters after header slides in
        }, 200) // Offset start
        .add({
            targets: '.header-subtitle .sub-letter',
            opacity: [0, 1],
            translateX: ['-1em', 0],
             scale: [0.8, 1],
            duration: 600,
            delay: anime.stagger(30, { start: 500 })
        }, 500)

        // Nav Reveal
        .add({
            targets: 'nav',
            opacity: [0, 1],
            translateY: [-50, 0],
            duration: 600
        }, 400) // Overlap slightly with header text
        .add({
            targets: 'nav ul li',
            opacity: [0, 1],
            translateY: [-20, 0],
            scale: [0.8, 1],
            duration: 500,
            delay: anime.stagger(80)
        }, 600) // Start after nav background appears
         .add({
            targets: '#theme-toggle',
            opacity: [0, 1],
            scale: [0.5, 1],
            duration: 500,
         }, 800) // Theme toggle appears last

        // Footer Reveal
        .add({
            targets: 'footer',
            opacity: [0, 1],
            translateY: [50, 0],
            duration: 800
        }, 1000); // Start footer animation later


    // --- Intersection Observer for Sections & Elements ---
    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                 const sectionId = section.id;

                // Reveal the section itself
                anime({
                    targets: section,
                    opacity: [0, 1],
                    translateY: [50, 0], // Slide up effect
                    duration: 800,
                    easing: 'easeOutCubic',
                     delay: sectionId === 'about' ? 200 : 0 // Add slight delay only to first section after header
                });

                // Trigger animations for children *within* the section
                animateSectionChildren(section);

                // Unobserve the section after it has animated
                observer.unobserve(section);
            }
        });
    }, observerOptions);

    // Observe all main sections
    document.querySelectorAll('main > section').forEach(section => {
        sectionObserver.observe(section);
    });

    // Function to animate children of a section
    function animateSectionChildren(section) {
        const childrenToAnimate = section.querySelectorAll('.initial-hidden-child');
        const sectionTitle = section.querySelector('.section-title');

        // Animate Section Title Underline
        if (sectionTitle) {
             const titleUnderline = sectionTitle.querySelector('::after'); // Direct selection doesn't work for pseudo
             // We animate the title itself and use CSS for the underline transition
             anime({
                 targets: sectionTitle,
                 opacity: [0, 1], // Fade in title text
                 translateY: [20, 0],
                 duration: 600,
                 easing: 'easeOutQuad',
                 complete: () => {
                    sectionTitle.style.setProperty('--after-transform', 'scaleX(1)'); // Trigger CSS animation by changing variable or class
                     sectionTitle.classList.add('title-visible'); // Add class to trigger CSS transition
                 }
             });
              // Ensure CSS handles the underline animation on class add or style change
              // Update CSS:
              /*
              h2.section-title::after {
                  transform: scaleX(0);
                  transform-origin: left; // Or center
                  transition: transform 0.6s ease-out 0.3s; // Add delay
              }
              h2.section-title.title-visible::after {
                  transform: scaleX(1);
              }
              */
        }


        // Staggered animation for general child elements
        anime({
            targets: childrenToAnimate,
            opacity: [0, 1],
            translateY: [30, 0],
            scale: [0.95, 1], // Subtle scale up
            duration: 700,
            delay: anime.stagger(100, { start: sectionTitle ? 300 : 100 }), // Start after title (if exists) or sooner
            easing: 'easeOutCubic'
        });


         // Special animations for specific sections
        if (section.id === 'about') {
            // Extra bounce for social icons
            anime({
                targets: '.social-link',
                translateY: [30, 0],
                scale: [0, 1],
                opacity: [0, 1],
                delay: anime.stagger(100, { start: 800 }), // Start later
                easing: 'spring(1, 80, 10, 0)'
            });
             // Video entrance
             anime({
                 targets: '#dance',
                 opacity: [0, 1],
                 scale: [0.8, 1],
                 rotateZ: [-5, 0],
                 duration: 1000,
                 delay: 600,
                 easing: 'easeOutElastic(1, .8)'
             });
        }

         if (section.id === 'skills') {
             // Animate skill categories with rotation
             anime({
                 targets: '.skill-category',
                 opacity: [0, 1],
                 translateY: [50, 0],
                 rotateX: [-90, 0], // Flip effect
                 duration: 800,
                 delay: anime.stagger(120, { start: 400 }),
                 easing: 'easeOutExpo'
             });
             // Animate description cards
             anime({
                 targets: '.skill-description-card',
                 opacity: [0, 1],
                 translateX: [-50, 0], // Slide from left
                 duration: 700,
                 delay: anime.stagger(100, { start: 800 }), // Start after categories
                 easing: 'easeOutCubic'
             });
         }

        if (section.id === 'projects') {
            // Project cards get a more dynamic entrance
            anime({
                 targets: '.project-card',
                 opacity: [0, 1],
                 translateY: [50, 0],
                 rotateZ: [-3, 0], // Slight rotation
                 scale: [0.9, 1],
                 duration: 800,
                 delay: anime.stagger(150, { from: 'start', start: 400 }), // Stagger from the start
                 easing: 'easeOutBack' // Overshoot easing
             });
        }

         if (section.id === 'contact') {
              // Animate form elements individually
            anime({
                targets: '.form-label',
                opacity: [0, 1],
                translateX: [-30, 0],
                duration: 500,
                delay: anime.stagger(100, { start: 400 }),
                easing: 'easeOutQuad'
            });
             anime({
                targets: '.form-input',
                opacity: [0, 1],
                scaleX: [0.8, 1], // Stretch in horizontally
                duration: 600,
                delay: anime.stagger(100, { start: 500 }),
                easing: 'easeOutQuad'
            });
             anime({
                targets: '.submit-button',
                opacity: [0, 1],
                scale: [0.5, 1],
                duration: 700,
                delay: 800, // Button last
                easing: 'easeOutElastic(1, .7)'
            });
         }
    }

     // --- Interactive Animations ---

    // Project Card Hover Effects (More pronounced)
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            anime.remove(card); // Remove any ongoing animation on this target
            anime({
                targets: card,
                translateY: -12, // Lift higher
                scale: 1.04,     // Scale more
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)', // More shadow
                duration: 300,
                easing: 'easeOutQuad'
            });
             // Animate link button inside
             anime({
                 targets: card.querySelector('.project-link'),
                 scale: 1.1,
                 duration: 200,
                 easing: 'easeOutSine'
             });
        });

        card.addEventListener('mouseleave', () => {
            anime.remove(card);
            anime({
                targets: card,
                translateY: 0,
                scale: 1,
                boxShadow: '0 5px 15px var(--shadow-color)', // Back to normal shadow
                duration: 400,
                easing: 'easeOutQuad'
            });
            anime({
                 targets: card.querySelector('.project-link'),
                 scale: 1,
                 duration: 200,
                 easing: 'easeOutSine'
             });
        });
    });

    // Social Icon Hover
     document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('mouseenter', () => {
            anime({
                targets: link.querySelector('img'),
                rotate: [5, -5, 0], // Wiggle effect
                scale: [1.2, 1.1],
                duration: 400,
                easing: 'easeInOutSine'
            });
        });
        link.addEventListener('mouseleave', () => {
             anime({
                targets: link.querySelector('img'),
                rotate: 0,
                scale: 1,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
     });


    // --- Smooth Scrolling ---
    document.querySelectorAll('nav a.nav-link[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calculate position, considering potential sticky nav height
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - 10; // Add small offset

                anime({
                    targets: document.scrollingElement || document.documentElement, // Cross-browser compatibility
                    scrollTop: targetPosition,
                    duration: 1200, // Slower, smoother scroll
                    easing: 'easeInOutCubic' // Smoother easing
                });

                // Optional: Close mobile menu if open
            }
        });
    });

     // --- Active Nav Link Highlighting on Scroll ---
    const navLinks = document.querySelectorAll('nav a.nav-link[href^="#"]');
    const sections = Array.from(navLinks).map(link => document.querySelector(link.getAttribute('href')));

    function updateActiveLink() {
        let currentSection = null;
        const scrollPosition = window.pageYOffset;
        const navHeight = document.querySelector('nav').offsetHeight;
         const offset = navHeight + 50; // Offset to trigger slightly earlier

        sections.forEach(section => {
             if (section && section.offsetTop <= scrollPosition + offset) {
                currentSection = section.id;
             }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (section && link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Initial check


    // --- Form Validation and Submission ---
    const submitForm = document.getElementById('submitForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const errorName = document.getElementById('errorName');
    const errorEmail = document.getElementById('errorEmail');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('form-success-message');

    function validateField(input, errorElement, validationFn, message) {
        if (!validationFn(input.value)) {
            errorElement.textContent = message;
            anime({ targets: input, borderColor: '#ff4d4d', duration: 300 }); // Animate border red
            return false;
        }
        errorElement.textContent = '';
         anime({ targets: input, borderColor: var(--border-color), duration: 300 }); // Animate border back
        return true;
    }

    function validateName() { return nameInput.value.trim().length > 0; }
    function validateEmail() {
        const email = emailInput.value.trim();
        return email.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    function validateMessage() { return messageInput.value.trim().length > 10; } // Require min length

    function validateForm() {
        const isNameValid = validateField(nameInput, errorName, validateName, 'Please enter your name.');
        const isEmailValid = validateField(emailInput, errorEmail, validateEmail, 'Please enter a valid email address.');
        const isMessageValid = validateField(messageInput, errorMessage, validateMessage, 'Message should be at least 10 characters.');
        return isNameValid && isEmailValid && isMessageValid;
    }

    // Real-time validation feedback (optional but good UX)
    nameInput.addEventListener('blur', () => validateField(nameInput, errorName, validateName, 'Please enter your name.'));
    emailInput.addEventListener('blur', () => validateField(emailInput, errorEmail, validateEmail, 'Please enter a valid email address.'));
    messageInput.addEventListener('blur', () => validateField(messageInput, errorMessage, validateMessage, 'Message should be at least 10 characters.'));


    submitForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default browser submission
        successMessage.style.display = 'none'; // Hide previous success message

        if (validateForm()) {
            const submitButton = submitForm.querySelector('.submit-button');
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
             // Sending animation
             anime({
                targets: submitButton,
                opacity: 0.7,
                duration: 300,
                loop: true,
                direction: 'alternate',
                easing: 'linear'
            });


            const formData = new FormData(submitForm);
            const xhr = new XMLHttpRequest();

            xhr.open('POST', submitForm.action, true);
            xhr.setRequestHeader('Accept', 'application/json');

            xhr.onreadystatechange = function () {
                if (xhr.readyState !== XMLHttpRequest.DONE) return;

                 // Stop sending animation regardless of outcome
                anime.remove(submitButton); // Stop looping animation
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
                 anime({ targets: submitButton, opacity: 1, duration: 200 });


                if (xhr.status === 200) {
                    // Success!
                    submitForm.reset(); // Clear the form
                    errorName.textContent = ''; // Clear any previous errors
                    errorEmail.textContent = '';
                    errorMessage.textContent = '';

                    // Show success message with animation
                    successMessage.style.display = 'block';
                    anime({
                        targets: successMessage,
                        opacity: [0, 1],
                        translateY: [-20, 0],
                        scale: [0.8, 1],
                        duration: 500,
                        easing: 'easeOutExpo'
                    });

                     // Fun success animation on the form/button itself
                    anime({
                        targets: submitButton,
                         backgroundColor: ['#2ecc71'], // Flash green
                        scale: [1, 1.05, 1],
                        duration: 800,
                        easing: 'easeInOutQuad',
                         complete: () => {
                            // Optionally reset background color after flash
                            anime({ targets: submitButton, backgroundColor: getComputedStyle(submitButton).getPropertyValue('background'), duration: 300 });
                         }
                    });

                    // Hide success message after a few seconds
                    setTimeout(() => {
                         anime({
                            targets: successMessage,
                            opacity: 0,
                            translateY: [0, -10],
                            duration: 400,
                            easing: 'easeInExpo',
                            complete: () => successMessage.style.display = 'none'
                        });
                    }, 4000); // Hide after 4 seconds

                } else {
                    // Error
                     document.getElementById('errorSubmit').textContent = 'Oops! There was a problem sending your message. Please try again later.';
                    // Shake animation for the form to indicate error
                    anime({
                        targets: submitForm,
                        translateX: [
                            { value: 10, duration: 50, easing: 'easeInOutSine' },
                            { value: -10, duration: 100, easing: 'easeInOutSine' },
                            { value: 10, duration: 100, easing: 'easeInOutSine' },
                            { value: 0, duration: 50, easing: 'easeInOutSine' }
                        ]
                    });
                }
            };

            xhr.send(formData);
        } else {
             // Form is invalid, maybe shake the submit button
             anime({
                 targets: submitForm.querySelector('.submit-button'),
                 translateX: [ { value: 5, duration: 50 }, { value: -5, duration: 100 }, { value: 0, duration: 50 }],
                 easing: 'easeInOutSine'
             });
        }
    });

    // --- Update Footer Year ---
    document.getElementById('current-year').textContent = new Date().getFullYear();

}); // End of DOMContentLoaded