
let jobs = [
    {
        title: "Frontend Developer",
        company: "TechSolutions",
        location: "Remote",
        type: "Internship",
        salary: "₹8,000/month",
        skills: "HTML CSS JavaScript"
    },
    {
        title: "MERN Stack Developer",
        company: "WebWorks",
        location: "Bangalore",
        type: "Full-time",
        salary: "₹5 LPA",
        skills: "MongoDB Express React Node.js"
    },
    {
        title: "JavaScript Developer",
        company: "BrightCode",
        location: "Remote",
        type: "Internship",
        salary: "₹9,000/month",
        skills: "JavaScript HTML CSS"
    },
    {
        title: "React Developer",
        company: "CodeCraft",
        location: "Patna",
        type: "Full-time",
        salary: "₹4 LPA",
        skills: "React JavaScript CSS"
    },
    {
        title: "Backend Developer",
        company: "ServerPro",
        location: "Delhi",
        type: "Internship",
        salary: "₹10,000/month",
        skills: "Node.js Express MongoDB"
    },
    {
        title: "Python Developer",
        company: "DataTech",
        location: "Remote",
        type: "Full-time",
        salary: "₹5 LPA",
        skills: "Python SQL APIs"
    },
    {
        title: "AI / Machine Learning Engineer",
        company: "CareerTrack",
        location: "Hyderabad",
        type: "Full-time",
        salary: "₹1,00,000/month",
        skills: "Builds intelligent models and neural networks"
    }
];

let jobList = document.getElementById("jobList");
let searchInput = document.getElementById("searchInput");
let jobCount = document.getElementById("jobCount");
let totalJobs = document.getElementById("totalJobs");
let jobTypeFilter = document.getElementById("jobTypeFilter");
let savedCount = document.getElementById("savedCount");
let savedJobsList = document.getElementById("savedJobsList");

let savedJobs = JSON.parse(
    localStorage.getItem("savedJobs") || "[]"
);

totalJobs.textContent = "Total jobs available: " + jobs.length;

function displaySavedJobs() {
    savedCount.textContent = "Saved jobs: " + savedJobs.length;
    savedJobsList.innerHTML = "";

    if (savedJobs.length === 0) {
        savedJobsList.textContent = "No saved jobs yet.";
        return;
    }

    savedJobs.forEach(function (job) {
        let item = document.createElement("div");
        item.className = "saved-job";

        let title = document.createElement("p");
        title.textContent = job.title + " - " + job.company;

        let removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.className = "save-button";

        removeButton.addEventListener("click", function () {
            savedJobs = savedJobs.filter(function (savedJob) {
                return !(
                    savedJob.title === job.title &&
                    savedJob.company === job.company
                );
            });

            localStorage.setItem(
                "savedJobs",
                JSON.stringify(savedJobs)
            );

            displaySavedJobs();
            searchJobs();
        });

        item.appendChild(title);
        item.appendChild(removeButton);
        savedJobsList.appendChild(item);
    });
}

function displayJobs(jobArray) {
    jobList.innerHTML = "";
    jobCount.textContent = jobArray.length + " job(s) found";

    if (jobArray.length === 0) {
        jobList.innerHTML =
            '<p class="no-results">No jobs found. Try another search.</p>';
        return;
    }

    jobArray.forEach(function (job) {
        let card = document.createElement("article");
        card.className = "job-card";

        let title = document.createElement("h3");
        title.textContent = job.title;

        let company = document.createElement("p");
        company.className = "company";
        company.textContent = job.company;

        let details = document.createElement("div");
        details.className = "details";

        let location = document.createElement("p");
        location.textContent = "📍 " + job.location;

        let type = document.createElement("p");
        type.textContent = "💼 " + job.type;

        let skills = document.createElement("p");
        skills.textContent = "Skills: " + job.skills;

        let salary = document.createElement("span");
        salary.className = "salary";
        salary.textContent = job.salary;

        details.appendChild(location);
        details.appendChild(type);
        details.appendChild(skills);

        let saveButton = document.createElement("button");
        saveButton.className = "save-button";

        function updateSaveButton() {
            let isSaved = savedJobs.some(function (savedJob) {
                return (
                    savedJob.title === job.title &&
                    savedJob.company === job.company
                );
            });

            saveButton.textContent = isSaved
                ? "Remove Saved"
                : "Save Job";
        }

        saveButton.addEventListener("click", function () {
            let isAlreadySaved = savedJobs.some(function (savedJob) {
                return (
                    savedJob.title === job.title &&
                    savedJob.company === job.company
                );
            });

            if (isAlreadySaved) {
                savedJobs = savedJobs.filter(function (savedJob) {
                    return !(
                        savedJob.title === job.title &&
                        savedJob.company === job.company
                    );
                });
            } else {
                savedJobs.push(job);
            }

            localStorage.setItem(
                "savedJobs",
                JSON.stringify(savedJobs)
            );

            displaySavedJobs();
            searchJobs();
        });

        updateSaveButton();

        card.appendChild(title);
        card.appendChild(company);
        card.appendChild(details);
        card.appendChild(salary);
        card.appendChild(saveButton);

        jobList.appendChild(card);
    });
}

function searchJobs() {
    let searchText = searchInput.value.toLowerCase().trim();
    let selectedType = jobTypeFilter.value;

    let filteredJobs = jobs.filter(function (job) {
        let jobDetails = (
            job.title + " " +
            job.company + " " +
            job.location + " " +
            job.type + " " +
            job.skills
        ).toLowerCase();

        let matchesSearch = jobDetails.includes(searchText);

        let matchesType =
            selectedType === "All" || job.type === selectedType;

        return matchesSearch && matchesType;
    });

    displayJobs(filteredJobs);
}

searchInput.addEventListener("input", searchJobs);
jobTypeFilter.addEventListener("change", searchJobs);

displaySavedJobs();
searchJobs();
