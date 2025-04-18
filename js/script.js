function addProjects() {
    const newProjectsPlaceholder = document.getElementById('new-projects-placeholder');

    if (newProjectsPlaceholder) {
        const project1 = document.createElement('div');
        project1.className = 'project-card';
        project1.innerHTML = `
            <div>
                <h3>Earthie.world</h3>
                <p>A React Next.js web app that is a chatbot for Earth2, connected to Supabase DB and hosted via Vercel.</p>
                <a href="https://earthie.world">Earthie.world</a>
            </div>
        `;

        const project2 = document.createElement('div');
        project2.className = 'project-card';
        project2.innerHTML = `
            <div>
                <h3>3rdislandtours.com</h3>
                <p>A website for a touring company, tourism, written in simple HTML, CSS, and JS.</p>
                <a href="https://3rdislandtours.com">3rdislandtours.com</a>
            </div>
        `;

        newProjectsPlaceholder.appendChild(project1);
        newProjectsPlaceholder.appendChild(project2);
    }
}
 addProjects();
const menuIcon = document.querySelector('.menu-icon');
const navUl = document.querySelector('nav ul');

menuIcon.addEventListener('click', () => {
    navUl.classList.toggle('responsive');
});
