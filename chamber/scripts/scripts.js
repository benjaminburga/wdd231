document.addEventListener('DOMContentLoaded', function() {
    // Fetch member data
    fetch('data/members.json')
        .then(response => response.json())
        .then(data => {
            const membersContainer = document.getElementById('members');
            data.forEach(member => {
                const memberCard = document.createElement('div');
                memberCard.classList.add('member');
                memberCard.innerHTML = `
                    <h3>${member.name}</h3>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <p><a href="${member.website}" target="_blank">Visit Website</a></p>
                    <img src="images/${member.image}" alt="${member.name}">
                    <p>Membership Level: ${getMembershipLevel(member.level)}</p>
                `;
                membersContainer.appendChild(memberCard);
            });
        })
        .catch(error => console.error('Error fetching members:', error));

    const lastModifiedElement = document.getElementById('lastModified');
    const lastModified = document.lastModified;
    lastModifiedElement.textContent = lastModified;

    // Function to get membership level text
    function getMembershipLevel(level) {
        switch (level) {
            case 1:
                return 'Member';
            case 2:
                return 'Silver';
            case 3:
                return 'Gold';
            default:
                return 'Not specified';
        }
    }

    // Toggle between grid and list view
    const toggleViewButton = document.getElementById('toggleViewButton');
    toggleViewButton.addEventListener('click', function() {
        membersContainer.classList.toggle('list-view');
    });
});
