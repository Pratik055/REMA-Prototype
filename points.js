document.addEventListener('DOMContentLoaded', function() {
    const initialPoints = 400; // Initial points
    const dailyPoints = 10; // Points to add for daily claim
    const weeklyPoints = 100; // Points to add for weekly claim

    // Retrieve points from local storage or set to initial points if not present
    let currentPoints = parseInt(localStorage.getItem('points')) || initialPoints;

    // Save initial points if not present in local storage
    if (!localStorage.getItem('points')) {
        localStorage.setItem('points', initialPoints);
    }

    // Function to update points display
    function updatePointsDisplay() {
        const pointsElement = document.getElementById('points');
        if (pointsElement) {
            pointsElement.textContent = currentPoints ;
        }
    }

    // Update display on load
    updatePointsDisplay();

    // Function to claim points
    function claimPoints(pointsToAdd) {
        currentPoints += pointsToAdd;
        localStorage.setItem('points', currentPoints);
        updatePointsDisplay();
    }

    // Event listener for daily claim button
    const dailyButton = document.getElementById('claim-daily');
    if (dailyButton) {
        dailyButton.addEventListener('click', function() {
            claimPoints(dailyPoints);
            alert(`You have claimed ${dailyPoints} points!`);
            window.location.href = 'mypoints.html'; // Redirect to mypoints.html
        });
    }

    // Event listener for weekly claim button
    const weeklyButton = document.getElementById('claim-weekly');
    if (weeklyButton) {
        weeklyButton.addEventListener('click', function() {
            claimPoints(weeklyPoints);
            alert(`You have claimed ${weeklyPoints} points!`);
            window.location.href = 'mypoints.html'; // Redirect to mypoints.html
        });
    }

    // Function to redeem points with 15% discount
    function redeemPoints() {
        // Calculate points to deduct based on 15% discount
        const pointsToDeduct = Math.ceil(currentPoints * 0.15); // Round up to nearest integer

        // Deduct points
        currentPoints -= pointsToDeduct;
        localStorage.setItem('points', currentPoints);

        // Update points display
        updatePointsDisplay();
    }

    // Event listener for redeem button
    const redeemButton = document.getElementById('redeem-button');
    if (redeemButton) {
        redeemButton.addEventListener('click', function() {
            redeemPoints();
            alert(`You have redeemed points with a 15% discount!`);
        });
    }

    // Listen for pageshow event to handle session restore after back/forward navigation
    window.addEventListener('pageshow', function(event) {
        // If the page is being loaded from the bfcache (back/forward cache), update points display
        if (event.persisted) {
            updatePointsDisplay();
        }
    });
});


// for leaderboard

document.addEventListener('DOMContentLoaded', () => {
    const redeemButton = document.getElementById('redeem-button');

    redeemButton.addEventListener('click', () => {
        const storedUsername = localStorage.getItem('username') || ''; // Default to empty string if no username

        // Example score to add when redeeming
        const redemptionScore = 50;

        // Retrieve current leaderboard data or initialize an empty array
        let leaderboardData = JSON.parse(localStorage.getItem('leaderboardData')) || [];

        // Check if the user already exists in the leaderboard data
        let userFoundIndex = -1;
        leaderboardData.forEach((entry, index) => {
            if (entry.username === storedUsername) {
                // Update the existing score
                entry.score += redemptionScore;
                userFoundIndex = index;
            }
        });

        // If user not found, add a new entry
        if (userFoundIndex === -1) {
            leaderboardData.push({
                username: storedUsername,
                score: redemptionScore
            });
        }

        // Remove any duplicates based on username (in case of any)
        leaderboardData = leaderboardData.reduce((unique, entry) => {
            if (!unique.some(item => item.username === entry.username)) {
                unique.push(entry);
            } else {
                // If duplicate, accumulate scores
                let existingEntry = unique.find(item => item.username === entry.username);
                existingEntry.score += entry.score;
            }
            return unique;
        }, []);

        // Store updated data in localStorage
        localStorage.setItem('leaderboardData', JSON.stringify(leaderboardData));

        // Redirect to leaderboard.html
        window.location.href = 'leaderboard.html';
    });
});

