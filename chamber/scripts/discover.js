document.addEventListener('DOMContentLoaded', function () {
    const visitMessage = document.getElementById('visit-message');
    const lastVisit = localStorage.getItem('lastVisit');
    const now = new Date();
    localStorage.setItem('lastVisit', now);

    if (!lastVisit) {
        visitMessage.innerHTML = '<p>Welcome! Let us know if you have any questions.</p>';
    } else {
        const lastVisitDate = new Date(lastVisit);
        const daysDifference = Math.floor((now - lastVisitDate) / (1000 * 60 * 60 * 24));

        if (daysDifference < 1) {
            visitMessage.innerHTML = '<p>Back so soon! Awesome!</p>';
        } else {
            visitMessage.innerHTML = `<p>You last visited ${daysDifference} day${daysDifference > 1 ? 's' : ''} ago.</p>`;
        }
    }

    document.getElementById('currentyear').textContent = now.getFullYear();
    document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;

    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });
});
