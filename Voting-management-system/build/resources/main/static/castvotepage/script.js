// JavaScript for handling navigation and admin actions

    // Object to track votes
    let votes = {
        'Candidate 1': 0,
        'Candidate 2': 0,
        'Candidate 3': 0,
        'Candidate 4': 0,
        'Candidate 5': 0,
    };

    // Navigation handling
    document.getElementById('dashboard-link').addEventListener('click', function() {
        document.getElementById('dashboard').style.display = 'block';
        document.getElementById('candidate').style.display = 'none';
        document.getElementById('manage-votes').style.display = 'none';
        document.getElementById('manage-candidates').style.display = 'none';
    });

    document.getElementById('candidate-link').addEventListener('click', function() {
        document.getElementById('dashboard').style.display = 'none';
        document.getElementById('candidate').style.display = 'block';
        document.getElementById('manage-votes').style.display = 'none';
        document.getElementById('manage-candidates').style.display = 'none';
    });

    document.getElementById('manage-votes-link').addEventListener('click', function() {
        document.getElementById('dashboard').style.display = 'none';
        document.getElementById('candidate').style.display = 'none';
        document.getElementById('manage-votes').style.display = 'block';
        document.getElementById('manage-candidates').style.display = 'none';
    });

    document.getElementById('manage-candidates-link').addEventListener('click', function() {
        document.getElementById('dashboard').style.display = 'none';
        document.getElementById('candidate').style.display = 'none';
        document.getElementById('manage-votes').style.display = 'none';
        document.getElementById('manage-candidates').style.display = 'block';
    });

    // Function to cast a vote
    function castVote(candidate) {
        alert("Vote cast for " + candidate + "!");
        votes[candidate]++;
        updateVotes();
    }

    // Function to update the vote count display
    function updateVotes() {
        document.getElementById('votes-candidate-1').textContent = votes['Candidate 1'];
        document.getElementById('votes-candidate-2').textContent = votes['Candidate 2'];
        document.getElementById('votes-candidate-3').textContent = votes['Candidate 3'];
        document.getElementById('votes-candidate-4').textContent = votes['Candidate 4'];
        document.getElementById('votes-candidate-5').textContent = votes['Candidate 5'];
    }

document.addEventListener('DOMContentLoaded', function() {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        alert("User not logged in");
        window.location.href = '/'; // Redirect to login page if not logged in
        return;
    }

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
                castVote(`Candidate ${candidateId}`);
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

