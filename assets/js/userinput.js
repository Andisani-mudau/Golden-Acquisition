document.getElementById("pdfForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get the user input
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var career = document.getElementById("career").value;
    var cv = document.getElementById("cv").value;
    var message = document.getElementById("message").value;

    // Create a FormData object to send the data to the Google Apps Script
    var formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("career", career);
    formData.append("cv", cv);
    formData.append("message", message);

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