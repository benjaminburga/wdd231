document.addEventListener('DOMContentLoaded', async () => {
    const currentYear = new Date().getFullYear();
    document.getElementById('currentyear').textContent = currentYear;
    document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;

    const modal = document.getElementById('modal');
    const learnMoreLink = document.getElementById('learn-more-link');
    const closeButton = document.getElementsByClassName('close')[0];

    function openModal() {
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    learnMoreLink.addEventListener('click', openModal);
    closeButton.addEventListener('click', closeModal);
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('nav');

    navToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('open');
    });

    const timestampField = document.getElementById('timestamp');
    const timestamp = new Date().toISOString();
    timestampField.value = timestamp;
});
