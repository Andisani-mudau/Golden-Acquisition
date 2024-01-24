function onFormSubmit(e) {
    var formResponse = e.response;
    var itemResponses = formResponse.getItemResponses();
  
    // Assuming the first question in the form is for the firstname
    var firstname = itemResponses[0].getResponse();
    var lastname = itemResponses[1].getResponse();
    var email = itemResponses[2].getResponse();
    var phone = itemResponses[3].getResponse();
    var career = itemResponses[4].getResponse();
    var cv = itemResponses[5].getResponse();
    var message = itemResponses[6].getResponse();

    // Create a PDF file
    var pdfFile = createPDF(firstname, email, cv);
  
    // Save the PDF file to Google Drive
    saveToDrive(pdfFile, firstname, cv);
  
    // Log user input to Google Sheets
    logToSheet(firstname, lastname, email, phone, career, message);
  }
  
  function createPDF(firstname, email) {
    // Create a PDF file using your preferred method/library
    // You may want to use a library like Google Apps Script PDF Service or an external service
  
    // For simplicity, let's assume you have a function named generatePDF
    var pdfContent = generatePDF(firstname, email);
  
    // Create a file in Google Drive
    var folder = DriveApp.createFolder('PDF Files');
    var pdfFile = folder.createFile(firstname +'_'+ email + '_document.pdf', pdfContent, 'application/pdf');
  
    return pdfFile;
  }
  
  function saveToDrive(pdfFile, firstname) {
    // Move the PDF file to a specific folder in Google Drive
    var destinationFolder = DriveApp.getFolderById('your_destination_folder_id');
    destinationFolder.createFile(pdfFile);
    
    // Optionally, you can send an email confirmation to the user
    var subject = 'PDF Submission Confirmation';
    var body = 'Dear ' + firstname + ',\n\nThank you for submitting the form. Your PDF file has been saved and we are looking into it.';
    MailApp.sendEmail({
      to: email,
      subject: subject,
      body: body,
    });
  }
  
  function logToSheet(firstname, lastname, email, phone, career, message) {
    // Open the Google Sheets spreadsheet by its ID
    var spreadsheet = SpreadsheetApp.openById('your_spreadsheet_id');
    
    // Assuming the first sheet is where you want to log the data
    var sheet = spreadsheet.getSheets()[0];
  
    // Log the user input to the spreadsheet
    sheet.appendRow([new Date(), firstname, lastname, email, phone, career, message]);
  }

  /*
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PDF Submission Form</title>
</head>
<body>
  <form id="pdfForm">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>
    <br>

    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
    <br>

    <input type="submit" value="Submit">
  </form>

  <script>
    document.getElementById("pdfForm").addEventListener("submit", function(event) {
      event.preventDefault();

      // Get the user input
      var name = document.getElementById("name").value;
      var email = document.getElementById("email").value;

      // Create a FormData object to send the data to the Google Apps Script
      var formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);

      // Send the form data to the Google Apps Script using Fetch API
      fetch("YOUR_GOOGLE_APPS_SCRIPT_URL", {
        method: "POST",
        body: formData
      })
      .then(response => {
        if (response.ok) {
          alert("Form submitted successfully!");
        } else {
          alert("Form submission failed. Please try again.");
        }
      })
      .catch(error => {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
      });
    });
  </script>
</body>
</html>

  */