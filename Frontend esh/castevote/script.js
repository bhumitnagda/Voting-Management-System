// Object to track votes
let votes = {};

// Navigation handling
/*document.getElementById('dashboard-link').addEventListener('click', function() {
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('candidate').style.display = 'none';
});
*/
 // Check if the user is logged in before the site loads
         (function() {
             const loggedInUser = sessionStorage.getItem('loggedInUser');
             if (!loggedInUser) {
                 window.location.href = '/'; // Redirect to login page if not logged in
             }
         })();

document.addEventListener('DOMContentLoaded', function() {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        return; // Stop further execution if not logged in
    }

    // Fetch candidates from the backend
    fetch('/candidates')
        .then(response => response.json())
        .then(data => {
            const voteForm = document.getElementById('vote-form');
            voteForm.innerHTML = '<input type="hidden" id="position-id" value="1">'; // Add hidden input for position ID
            data.forEach(candidate => {
                const label = document.createElement('label');
                label.innerHTML = `<input type="radio" name="candidate" value="${candidate.id}"> ${candidate.name}`;
                voteForm.appendChild(label);
                votes[candidate.name] = 0; // Initialize votes for each candidate
            });
            voteForm.appendChild(document.createElement('button')).innerText = 'Submit Vote';
        })
        .catch(error => console.error('Error:', error));

    // Handle vote submission
    document.getElementById('vote-form').addEventListener('submit', async function(event) {
        event.preventDefault();

        const candidateId = document.querySelector('input[name="candidate"]:checked').value;
        const positionId = document.getElementById('position-id').value;

        try {
            const response = await fetch('/api/castVote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ candidateId, positionId })
            });

            const result = await response.text();

            if (response.ok) {
                alert("Vote cast successfully!");
            } else if (response.status === 401) {
                alert(result);
                window.location.href = '/';  // Redirect to the homepage for login
                return;
            } else {
                alert(result);  // Display the error message returned by the server
            }
        } catch (error) {
            alert("An error occurred. Please try again.");
        }
    });
});
