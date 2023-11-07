<?php
// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve the values from the form
    $name = $_POST["name"]; // Get the value of the 'name' field
    $email = $_POST["email"]; // Get the value of the 'email' field
    $message = $_POST["message"]; // Get the value of the 'message' field

    // Check if the form fields are not empty
    if (!empty($name) && !empty($email) && !empty($message)) {
        // Send an email notification to the specified email address
        $to = "philosncube@gmail.com"; // Set the recipient email address
        $subject = "Portfolio Contact Form Submission from $name"; // Set the subject of the email
        $message = "Name: $name\nEmail: $email\nMessage: $message"; // Create the email message

        // Send the email
        mail($to, $subject, $message);

        // Display success message
        echo "Message sent successfully!";
    } else {
        // Display error message if any field is empty
        echo "Please fill in all fields.";
    }
}
?>
