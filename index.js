document.addEventListener("DOMContentLoaded", function() {
    fetchGitHubData();
    fetchGitHubProjects();
});

async function fetchGitHubData() {
    try {
        const response = await fetch('https://api.github.com/repos/ijlalansari1122/your-repo/contents/path/to/about-me.md');
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        const content = atob(data.content); // Decodes base64 content
        
        document.getElementById('about-me-content').innerText = content;
    } catch (error) {
        console.error('Error fetching about me content:', error);
        document.getElementById('about-me-content').innerText = 'Failed to load content.';
    }
}

async function fetchGitHubProjects() {
    try {
        const response = await fetch('https://api.github.com/users/ijlalansari1122/repos');
        if (!response.ok) throw new Error('Network response was not ok');

        const repos = await response.json();
        const projectsContainer = document.getElementById('projects-container');
        projectsContainer.innerHTML = ''; // Clear existing content

        repos.forEach(repo => {
            const projectRow = document.createElement('tr');
            projectRow.innerHTML = `
                <td><a href="${repo.html_url}" target="_blank">${repo.name}</a></td>
                <td>${repo.language || 'N/A'}</td>
                <td>${repo.description || 'No description'}</td>
            `;
            projectsContainer.appendChild(projectRow);
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        document.getElementById('projects-container').innerHTML = '<tr><td colspan="3">Failed to load projects.</td></tr>';
    }
}
