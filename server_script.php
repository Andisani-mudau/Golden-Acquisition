<?php
$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$phone = $_POST['phone'];
$career = $_POST['career'];
$usermessage = $_POST['message'];
$senderEmail = $_POST['email'];
$recipientEmail = $_POST['andisanimudau101@gmail.com'];

// Additional form data retrieval

// Process the uploaded PDF file

$pdfFile = $_FILES['pdfFile'];
$pdfFileName = $pdfFile[$firstname +'_'+ $lastname +'_'+ $career];
$pdfFilePath = $pdfFile['tmp_name'];


// Email sending logic using PHP's mail() function
$to = $recipientEmail;
$subject = $firstname+" SENT A CV";
$message = "Name: "+$firstname+"\n"+
"Surname: "+$lastname+"\n"+
"Phone: "+$phone+"\n"+
"Career: "+$career+"\n"+
"email: "+$senderEmail+"\n"+
"Message: "+$usermessage+"\n";

$headers = "From: $senderEmail\r\n";
$headers .= "Reply-To: $senderEmail\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"boundary\"\r\n";

$attachment = chunk_split(base64_encode(file_get_contents($pdfFilePath)));

$message = "--boundary\r\n";
$message .= "Content-Type: text/plain; charset=\"iso-8859-1\"\r\n";
$message .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$message .= "Message body of your email\r\n";
$message .= "--boundary\r\n";
$message .= "Content-Type: application/pdf; name=\"$pdfFileName\"\r\n";
$message .= "Content-Transfer-Encoding: base64\r\n";
$message .= "Content-Disposition: attachment; filename=\"$pdfFileName\"\r\n\r\n";
$message .= "$attachment\r\n";
$message .= "--boundary--";

mail($to, $subject, $message, $headers);
?>
