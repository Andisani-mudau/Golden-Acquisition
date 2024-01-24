<?php
$firstname = $_POST['name-1'];
$senderEmail = $_POST['email'];
$recipientEmail = $_POST['andisanimudau101@gmail.com'];

// Email sending logic using PHP's mail() function
$to = $recipientEmail;
$subject = $firstname+" WANTS YOU TO CONTACT THEM";
$message = "Name: "+$firstname+"\n"+
"This is the message from your website. Please contact the user";

$headers = "From: $senderEmail\r\n";
$headers .= "Reply-To: $senderEmail\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"boundary\"\r\n";

$message = "--boundary\r\n";
$message .= "Content-Type: text/plain; charset=\"iso-8859-1\"\r\n";
$message .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$message .= "Message body of your email\r\n";
$message .= "--boundary\r\n";
$message .= "Content-Transfer-Encoding: base64\r\n";
$message .= "--boundary--";

mail($to, $subject, $message, $headers);
?>
