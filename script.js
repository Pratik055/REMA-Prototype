document.addEventListener('DOMContentLoaded', () => {
    const leaderboardList = document.getElementById('leaderboardList');
    
    // Retrieve leaderboard data from localStorage
    const leaderboardData = JSON.parse(localStorage.getItem('leaderboardData')) || [];

    // Clear existing leaderboard list
    leaderboardList.innerHTML = '';

    if (leaderboardData.length > 0) {
        // Sort leaderboard data by score in descending order
        leaderboardData.sort((a, b) => b.score - a.score);

        // Define colors for ranks
        const colors = [
            { rank: 1, color: '#4CAF50' },   // Green for 1st rank
            { rank: 2, color: '#8BC34A' },   // Light green for 2nd rank
            { rank: 3, color: '#FF9800' },   // Orange for 3rd rank
            { rank: 4, color: '#F44336' }    // Red for 4th rank
            // Add more colors as needed for additional ranks
        ];

        // Populate the leaderboard with sorted data and apply background colors
        leaderboardData.forEach((entry, index) => {
            const rank = index + 1; // Rank starts from 1

            // Find color for the current rank
            const colorObj = colors.find(c => c.rank === rank);
            const backgroundColor = colorObj ? colorObj.color : '#FFFFFF'; // Default to white if rank color not found

            // Create leaderboard item
            const listItem = document.createElement('li');
            listItem.classList.add('leaderboard-item');
            listItem.style.backgroundColor = backgroundColor; // Set background color
            listItem.innerHTML = `${entry.username} <span class="badge">${getBadge(entry.score)} (${entry.score})</span>`;
            leaderboardList.appendChild(listItem);
        });
    } else {
        console.log('No leaderboard data found.');
    }

    function getBadge(score) {
        if (score >= 500) return 'Gold';
        if (score >= 200) return 'Silver';
        return 'Bronze';
    }
});







// script.js
document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.getElementById('login-button');
  const popup = document.getElementById('popup');
  const closeButton = document.getElementById('close-button');
  const loginForm = document.getElementById('login-form');

  // Show the pop-up when the login button is clicked
  loginButton.addEventListener('click', () => {
      popup.style.display = 'flex';
  });

  // Hide the pop-up when the close button is clicked
  closeButton.addEventListener('click', () => {
      popup.style.display = 'none';
  });

  // Handle form submission
  loginForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent default form submission behavior

      const username = document.getElementById('username').value;

      // Save the username in local storage
      localStorage.setItem('username', username);

      // Redirect to index.html
      window.location.href = 'index.html';
  });

  document.addEventListener('DOMContentLoaded', () => {
    const storedUsername = localStorage.getItem('username');
    console.log('Stored Username:', storedUsername);
});
});


document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');

  loginForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const username = document.getElementById('username').value;

      // Check if the user already exists in userData
      let user = userData.users.find(user => user.username === username);

      if (!user) {
          // If user doesn't exist, create a new user object
          user = {
              username: username,
              purchases: [] // Array to store user's purchases
          };
          userData.users.push(user);
      }

      // Save updated userData to localStorage
      localStorage.setItem('userData', JSON.stringify(userData));

      // Redirect to index.html or update UI
      window.location.href = 'index.html';
  });
});
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get the username from the input field
    const username = document.getElementById('username').value;
    
    // Store the username in local storage
    localStorage.setItem('username', username);
    
    // Redirect to the page where you want to display the greeting
    window.location.href = 'weekly.html';
});
