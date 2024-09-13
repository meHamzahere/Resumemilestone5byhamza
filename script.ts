// Add event listener for form submission
document.getElementById('resumeForm')?.addEventListener('submit', function (e: Event): void {
    e.preventDefault();

    // Get the input values
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLInputElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;

    // Handle image upload
    const profilePicInput = (document.getElementById('profilePic') as HTMLInputElement);
    let profilePicURL = '';
    if (profilePicInput.files && profilePicInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            profilePicURL = e.target?.result as string;
            generateResume(name, email, education, experience, skills, profilePicURL);
        };
        reader.readAsDataURL(profilePicInput.files[0]);
    } else {
        generateResume(name, email, education, experience, skills, '');
    }
});

// Function to generate and display the resume
function generateResume(name: string, email: string, education: string, experience: string, skills: string, profilePicURL: string): void {
    const skillsList = skills.split(',').map(skill => `<li>${skill.trim()}</li>`).join('');
    const profilePicHTML = profilePicURL ? `<img src="${profilePicURL}" alt="Profile Picture">` : '';

    const resume = `
        ${profilePicHTML}
        <h2>${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <h3>Education</h3>
        <p>${education}</p>
        <h3>Work Experience</h3>
        <p>${experience}</p>
        <h3>Skills</h3>
        <ul>${skillsList}</ul>
    `;

    const resumeOutput = document.getElementById('resumeOutput');
    if (resumeOutput) {
        resumeOutput.innerHTML = resume;
        resumeOutput.classList.add('active');  // Apply the fade-in animation
    }

    // Generate and display the unique shareable URL
    const uniqueURL = generateUniqueURL(name);
    displayShareLink(uniqueURL);
}

// Function to generate a unique URL based on the user's name
function generateUniqueURL(name: string): string {
    const username = name.toLowerCase().replace(/\s+/g, '');
    return `https://yourapp.vercel.app/${username}/resume`;
}

// Function to display the shareable link
function displayShareLink(url: string): void {
    const shareButton = document.getElementById('shareButton');
    if (shareButton) {
        shareButton.addEventListener('click', () => {
            const shareableLink = prompt("Copy and share your resume link:", url);
            if (shareableLink) {
                navigator.clipboard.writeText(shareableLink);
                alert("Link copied to clipboard!");
            }
        });
    }
}

// Add event listener to download the resume as a PDF
document.getElementById('downloadButton')?.addEventListener('click', function () {
    window.print();  // Use print function as a basic way to download the resume as PDF
});
