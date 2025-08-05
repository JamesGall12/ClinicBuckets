<?php
// Email configuration
$to = "jgallagher@clinicbucket.com"; // Replace with your email
$subject = "New consultation inquiry from website";

// Validate POST request
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    http_response_code(405);
    die(json_encode(["error" => "Method not allowed"]));
}

// Get and sanitize form data
$name = filter_var($_POST['name'] ?? '', FILTER_SANITIZE_STRING);
$email = filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);
$clinic = filter_var($_POST['clinic'] ?? '', FILTER_SANITIZE_STRING);
$message = filter_var($_POST['message'] ?? '', FILTER_SANITIZE_STRING);

// Validate required fields
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    die(json_encode(["error" => "Please fill in all required fields"]));
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    die(json_encode(["error" => "Invalid email address"]));
}

// Build email content
$emailContent = "New consultation inquiry from your website:\n\n";
$emailContent .= "Name: $name\n";
$emailContent .= "Email: $email\n";
$emailContent .= "Clinic: $clinic\n\n";
$emailContent .= "Message:\n$message\n";

// Email headers
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email
if (mail($to, $subject, $emailContent, $headers)) {
    echo json_encode(["success" => true, "message" => "Thank you for your message! I'll get back to you within 24 hours."]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Sorry, there was an error sending your message. Please try again later."]);
}
?>
