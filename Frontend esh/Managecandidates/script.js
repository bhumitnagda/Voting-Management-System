function loadMainContent() {
    fetch('manageCandidates.html') // Path to your main content HTML file
        .then(response => response.text())
        .then(html => {
            document.body.innerHTML = html;
        })
        .catch(error => console.error('Error loading main content:', error));
}