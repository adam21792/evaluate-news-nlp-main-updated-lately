import { checkForURL } from "./urlChecker"; // Import the function for URL validation

// Define constants
const serverURL = 'http://localhost:8000/api'; // Use 'http' for localhost

// Add event listener to the form if it exists
const form = document.getElementById('urlForm');
if (form) {
    form.addEventListener('submit', handleSubmit);
} else {
    console.error("Form with ID 'urlForm' not found.");
}

// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault();

    // Get the URL from the input field
    const formText = document.getElementById('name')?.value;

    if (!formText) {
        alert("Input field is missing or empty. Please try again.");
        return;
    }

    // Check if the URL is valid
    if (checkForURL(formText)) {
        console.log("Valid URL detected. Sending to server...");
        sendDataToServer(formText); // Send valid URL to server
    } else {
        console.log("Invalid URL");
        alert("Please enter a valid URL.");
    }
}

// Function to send data to the server
async function sendDataToServer(url) {
    try {
        const response = await fetch(serverURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }), // Correctly passing the URL
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Response from server:", data);
            displayResults(data); // Display server results
        } else {
            console.error("Server error:", response.statusText);
            alert("There was an error processing your request. Please try again later.");
        }
    } catch (error) {
        console.error("Error sending data to server:", error);
        alert("Unable to connect to the server. Please check your connection.");
    }
}

// Function to display results on the page
function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    if (resultsDiv) {
        resultsDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`; // Format data neatly
    } else {
        console.error("Results container not found.");
    }
}

// Export the handleSubmit function for testing or further use
export { handleSubmit };
