// pull data from LocalStorage to build resume template
export function loadResume() {
    const params = new URLSearchParams(window.location.search);
    const indexParam = params.get("resumeIndex");

    // convert index only if the param exists
    if (indexParam === null) {
        document.querySelector("#new-resume").innerHTML = "<p>Resume not found (missing index).</p>";
        console.error("Resume index missing from URL.");
        return;
    }

    const index = parseInt(indexParam);
    const resumes = JSON.parse(localStorage.getItem("resumes")) || [];
    console.log("Resume Index:", index);
    console.log("Resumes Array:", resumes);

    // only check if resumes array length here (not the resume itself)
    if (!resumes.length || index === null || index >= resumes.length) {
        document.querySelector("#new-resume").innerHTML = "<p>Resume not found</p>"
        console.error("Resume not found for index:", index);
        return;
    }

    // now safe to declare resume
    const resume = resumes[index]; 
    document.querySelector("#new-resume").innerHTML = dynamicResumeTemplate(resume);
}

// build template
function dynamicResumeTemplate(resume) {

    console.log("setupDynamicResumes is running with .js")
    // TEMPLATE FOR CONTACT INFO
    let template = `
        <section class="cont-info">
            <h2>Contact Information</h2>
            <p class="name"><strong>Name:</strong> ${resume.contactInfo.name}</p>
            <p class="email"><strong>Email:</strong> ${resume.contactInfo.email}</p>
            <p class="phone"><strong>Phone:</strong> ${resume.contactInfo.phone}</p>
            <p class="address"><strong>Address:</strong> ${resume.contactInfo.address}</p>
        </section>
    `;
    // TEMPLATE FOR WORK EXPERIENCE
    template += `
    <section class="work-experience">
        <h2>Work Experience</h2>
    `;
    if (resume.workExperience && resume.workExperience.length > 0) {
        resume.workExperience.forEach(work => {
            template += `
            <div class="work-entry">
                <p><strong>Company:</strong> ${work.company}</p>
                <p><strong>Employment Dates:</strong> ${work.startDate} - ${work.endDate}</p>
                <p><strong>Job Duties:</strong>
                <ul>
            `;
            work.jobDuties.forEach(duty => {
                template += `<li>${duty}</li>`;
            });
            template += `</ul></div>`;
        })
    }
    template += `</section>`;

    // TEMPLATE FOR EDUCATION
    template += `
        <section class="education">
            <h2>Education</h2>
        `;
    if (resume.educationExperience && resume.educationExperience.length > 0) {
        resume.educationExperience.forEach(edu => {
            template += `
            <div class="education-entry">
                <p><strong>Institution:</strong> ${edu.school}</p>
                <p><strong>Dates:</strong> ${edu.startDate} - ${edu.endDate}</p>
                <p><strong>Degree:</strong> ${edu.degree}</p>
                <ul>
            </div>`;
        });
    }
    template += `</section>`;

    // TEMPLATE FOR SKILLS
    template += `
    <section class="skills">
        <h2>Skills</h2>
        <ul>
    `;
    if (resume.skills && resume.skills.length > 0) {
        resume.skills.forEach(skill => {
            template += `<li>${skill}</li>`
        });
    }
    template += `
        </ul>    
        </section>`;

    // TEMPLATE FOR LANGUAGES
    template += `
        <section class="languages">
            <h2>Languages</h2>
            <p>${resume.languages.join(", ")}</p>
        </section>
    `;

    // TEMPLATE FOR REFERENCES
    template += `
    <section class="references">
        <h2>References</h2>
    `;
    if (resume.references && resume.references.length > 0) {
        resume.references.forEach(ref => {
            template += `
            <div class="reference-entry">
                <p><strong>Name:</strong> ${ref.name}</p>
                <p><strong>Phone:</strong> ${ref.phone}</p>
                <p><strong>Email:</strong> ${ref.email}</p>
            </div>`;
        });
    }
    template += `</section>`;
    
    // TEMPLATE FOR PROFILE
    template += `
    <section class="profile">
        <h2>Profile</h2>
        <p>${resume.profile}</p>
    </section>
    `;
    return template;
}