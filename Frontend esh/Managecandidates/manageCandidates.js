document.addEventListener("DOMContentLoaded", () => {
    fetch('/api/admin/checkLoginStatus')
        .then(response => response.json())
        .then(data => {
            if (!data.loggedIn) {
                window.location.href = "adminlogin/adminlogin.html";
            } else {
                fetchCandidates();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            window.location.href = "adminlogin/adminlogin.html";
        });

    const addCandidateBtn = document.getElementById("addCandidateBtn");
    const candidateNameInput = document.getElementById("candidateName");
    const candidateAgeInput = document.getElementById("candidateAge");
    const candidateList = document.getElementById("candidateList");
    const logoutBtn = document.querySelector(".logout-btn");

    // Add candidate event
    addCandidateBtn.addEventListener("click", () => {
        const candidateName = candidateNameInput.value.trim();
        const candidateAge = parseInt(candidateAgeInput.value.trim());

        if (candidateName && candidateAge) {
            addCandidate({ name: candidateName, age: candidateAge });
        } else {
            alert("Please enter both candidate name and age.");
        }
    });

    // Logout event
    logoutBtn.addEventListener("click", () => {
        fetch('/api/admin/logout', { method: 'POST' })
            .then(() => {
                window.location.href = "adminlogin/adminlogin.html";
            })
            .catch(error => console.error('Logout error:', error));
    });

    // Fetch candidates and render
    function fetchCandidates() {
        fetch('/candidates')
            .then(response => response.json())
            .then(candidates => {
                candidateList.innerHTML = '';
                candidates.forEach(candidate => {
                    const listItem = createCandidateElement(candidate);
                    candidateList.appendChild(listItem);
                });
            })
            .catch(error => console.error('Error fetching candidates:', error));
    }

    // Add candidate
    function addCandidate(candidate) {
        fetch('/candidates', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(candidate)
        })
        .then(response => response.json())
        .then(addedCandidate => {
            const listItem = createCandidateElement(addedCandidate);
            candidateList.appendChild(listItem);
            candidateNameInput.value = '';
            candidateAgeInput.value = '';
        })
        .catch(error => console.error('Error adding candidate:', error));
    }

    // Create a candidate list item
    function createCandidateElement(candidate) {
        const listItem = document.createElement("li");
        listItem.className = "candidate-item";
        listItem.innerHTML = `
            <span>Name: ${candidate.name}, Age: ${candidate.age}</span>
            <button class="delete-btn" data-id="${candidate.id}">Delete</button>
        `;
        const deleteButton = listItem.querySelector(".delete-btn");
        deleteButton.addEventListener("click", () => {
            deleteCandidate(candidate.id, listItem);
        });
        return listItem;
    }

    // Delete candidate
    function deleteCandidate(candidateId, listItem) {
        fetch(`/candidates/${candidateId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                listItem.remove();
            } else {
                console.error('Error deleting candidate');
            }
        })
        .catch(error => console.error('Error:', error));
    }
});
