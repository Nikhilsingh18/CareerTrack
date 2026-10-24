let jobList = document.getElementById("jobList");
let searchInput = document.getElementById("searchInput");
let jobCount = document.getElementById("jobCount");
let totalJobs = document.getElementById("totalJobs");
totalJobs.textContent = "Total jobs available: " + jobs.length;
let jobTypeFilter = document.getElementById("jobTypeFilter");
let savedJobs = [];
let savedCount = document.getElementById("savedCount");

function displayJobs(jobArray) {
    jobList.innerHTML = "";

    jobCount.textContent =
        jobArray.length + " job(s) found";

    if (jobArray.length === 0) {
        jobList.innerHTML =
            '<p class="no-results">No jobs found. Try another search.</p>';
        return;
    }

    jobArray.forEach(function (job) {
        let card = document.createElement("article");
        card.className = "job-card";

        card.innerHTML = `
                    <h3>${job.title}</h3>
                    <p class="company">${job.company}</p>
                    <div class="details">
                        <p>📍 ${job.location}</p>
                        <p>💼 ${job.type}</p>
                        <p>Skills: ${job.skills}</p>
                    </div>
                    <span class="salary">${job.salary}</span>
                `;

        let saveButton = document.createElement("button");

        saveButton.className = "save-button";
        saveButton.textContent = savedJobs.includes(job)
            ? "Remove Saved"
            : "Save Job";

        saveButton.addEventListener("click", function () {
            if (savedJobs.includes(job)) {
                savedJobs = savedJobs.filter(function (savedJob) {
                    return savedJob !== job;
                });
            } else {
                savedJobs.push(job);
            }

            savedCount.textContent = "Saved jobs: " + savedJobs.length;

            displayJobs(
                jobs.filter(function (item) {
                    let text = (
                        item.title + " " +
                        item.company + " " +
                        item.location + " " +
                        item.type + " " +
                        item.skills
                    ).toLowerCase();

                    return text.includes(searchInput.value.toLowerCase().trim()) &&
                        (jobTypeFilter.value === "All" ||
                            item.type === jobTypeFilter.value);
                })
            );
        });

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

displayJobs(jobs);