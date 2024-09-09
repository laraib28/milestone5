// Adding event listener to the form submit
document.getElementById('resumeForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    // Getting username from the input
    const username = (document.getElementById('username') as HTMLInputElement).value.trim();

    // Getting the file input element
    const fileInput = document.getElementById('resumeFile') as HTMLInputElement;

    // Checking if any files are selected
    if (!fileInput.files || fileInput.files.length === 0) {
        alert('Please select a file');
        return;
    }

    // Correctly accessing the first file from the file input
    const file = fileInput.files[0];

    // Creating FormData object and appending data
    const formData = new FormData();
    formData.append('username', username);
    formData.append('resume', file);

    try {
        // Sending the FormData to the backend
        const response = await fetch('https://your-backend-domain.com/upload', {
            method: 'POST',
            body: formData,
        });

        // Parsing the response
        const result = await response.json();
        
        // Handling the response based on success
        if (result.success) {
            const resumeUrl = `https://${username}.vercel.app/resume`;
            document.getElementById('linkMessage')!.innerHTML = `
                Resume uploaded successfully! 
                <a href="${resumeUrl}" target="_blank">View Resume</a> 
                | <a href="${resumeUrl}" download="resume.pdf">Download PDF</a>
            `;
        } else {
            document.getElementById('linkMessage')!.innerText = 'Failed to upload resume.';
        }
    } catch (error) {
        // Handling any errors that occur during the fetch
        console.error('Error uploading resume:', error);
        document.getElementById('linkMessage')!.innerText = 'An error occurred.';
    }
});
