function emailSend() {
    var username = document.getElementById('name-1').value;
    var useremail = document.getElementById('email-1').value;
    var usermessage = document.getElementById('message-1').value;
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "andisanimudau101@gmail.com",
        Password : "DBBB69248FB0E81910A26ECFA64C214F2E58",
        To : useremail,
        From : "andisanimudau101@gmail.com",
        Subject : username + " Wants To Contact You.",
        Body : "Name: "+ username +"\n"+
            "Email: " +useremail +"\n"+
            "Message: "+ usermessage
    }).then(
      message => {
        if(message == "OK"){
            alert("Form sent!");
        }
      }
    );
}
function emailSend2() {
    var useremail = document.getElementById('email-2').value;
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "andisanimudau101@gmail.com",
        Password : "DBBB69248FB0E81910A26ECFA64C214F2E58",
        To : useremail,
        From : "andisanimudau101@gmail.com",
        Subject : "One User Subscribed To Your Newsletter",
        Body : "Their email: " + useremail
    }).then(
      message => {
        if(message == "OK"){
            alert("Form sent!");
        }
      }
    );
}
function emailSend3() {
    var firstname = document.getElementById('firstname').value;
    var lastname = document.getElementById('lastname').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var career = document.getElementById('career').value;  
    var message = document.getElementById('message').value;
    const pdfInput = document.getElementById('pdfFile');

    // Check if a file is selected
    if (pdfInput.files.length > 0) {
        const pdfFile = pdfInput.files[0];
        
        // Read the PDF file as a data URL
        const reader = new FileReader();
        reader.onload = function (event) {
          const pdfDataUri = event.target.result;

          // Now you can use pdfDataUri in your data payload for submission
          console.log("PDF Data URI:", pdfDataUri);
          
          Email.send({
            SecureToken : "a9574a7f-0a33-4986-bce1-680a46ccc805",
            To : email,
            From : "andisanimudau101@gmail.com",
            Subject : firstname + " Sent A CV",
            Body : "Name: "+ firstname +" "+ lastname +
                "\n Email: " +email +
                "\n Phone: "+ phone +
                "\n Career: "+ career +
                "\n Message: "+ message,
            Attachments : [
                {
                    name: email+'_attachment.pdf',
                    data: pdfDataUri.split(',')[1], // Extract base64 data
                }]
        }).then(
          message => {
            if(message == "OK"){
                alert("Form sent!");
            }
          }
        );
        };

        reader.readAsDataURL(pdfFile);

      } else {
        console.error("No PDF file selected.");
      }
    
    
}