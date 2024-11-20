// main.js

// Function to get the query parameter from the URL
function getQueryParameter() {
  const urlParts = window.location.pathname.split("/");
  return urlParts[urlParts.length - 1];
}

// Function to fetch the linkTo data from the server and perform the redirection
async function redirectToLink() {
  const query = getQueryParameter();

  try {
    const response = await fetch(`/get-link?link=${query}`);
    if (!response.ok) {
      throw new Error("Link not found");
    }
    const data = await response.json();
    window.location.replace(data.linkTo);
  } catch (error) {
    console.error("Error fetching link data:", error);
    window.location.replace("https://www.google.com");
  }
}

// Execute the function on page load
redirectToLink();
