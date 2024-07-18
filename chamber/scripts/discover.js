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
        const hoursDifference = Math.floor((now - lastVisitDate) / (1000 * 60 * 60));

        if (daysDifference < 1) {
            if (hoursDifference < 1) {
                visitMessage.innerHTML = '<p>Back so soon! Awesome!</p>';
            } else {
                visitMessage.innerHTML = `<p>Back after ${hoursDifference} hour${hoursDifference > 1 ? 's' : ''}! Awesome!</p>`;
            }
        } else {
            const lastVisitTime = lastVisitDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            visitMessage.innerHTML = `<p>You last visited ${daysDifference} day${daysDifference > 1 ? 's' : ''} ago at ${lastVisitTime}.</p>`;
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
