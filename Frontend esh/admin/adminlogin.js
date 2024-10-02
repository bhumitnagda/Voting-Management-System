document.getElementById('admin-login-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const userId = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, password })
        });

        if (response.ok) {
            alert("Login successful!");
            window.location.href = "/adminlogin/candidatemanager/dummyCandidateManager.html"; // Redirect to admin dashboard
        } else {
            alert("Invalid credentials. Please try again.");
        }
    } catch (error) {
        alert("An error occurred. Please try again later.");
    }
});
