document.addEventListener('DOMContentLoaded', function() {
    // Set current year
    const currentYear = new Date().getFullYear();
    document.getElementById('currentyear').textContent = currentYear;

    // Set last modified date
    document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;

    // Display submitted information on thank you page
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('firstname')) {
        document.getElementById('firstname').textContent = urlParams.get('firstname');
        document.getElementById('lastname').textContent = urlParams.get('lastname');
        document.getElementById('email').textContent = urlParams.get('email');
        document.getElementById('phone').textContent = urlParams.get('phone');
        document.getElementById('organization').textContent = urlParams.get('organization');
        document.getElementById('membership-level').textContent = urlParams.get('membership-level');
        document.getElementById('business-description').textContent = urlParams.get('business-description');
        document.getElementById('timestamp').textContent = urlParams.get('timestamp'); // Assuming you send timestamp in the query parameters
    }
});
