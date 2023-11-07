#!/usr/bin/node

// An array of text strings
const texts = [
    "I speak Python fluently, but my snake charming skills need work.",
    "JavaScript is my cup of tea, it keeps me grounded even when my DOM's in disarray."
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

// Function to handle the form submission
function handleFormSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    const errorElement = document.getElementById('errorSubmit');
    errorElement.textContent = '';

    if (name.length === 0 || email.length === 0) {
        errorElement.textContent = 'Please fill in all required fields';
    } else {
        alert('Form submitted successfully!');
    }
}

// Add event listener to the form submission
const submitForm = document.getElementById('submitForm');
submitForm.addEventListener('submit', handleFormSubmit);
