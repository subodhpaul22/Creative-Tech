// Save user data to localStorage
function saveUser(username, password) {
    const user = { username, password };
    localStorage.setItem(username, JSON.stringify(user));
}

// Check if user exists
function getUser(username) {
    return JSON.parse(localStorage.getItem(username));
}

// Handle signup
document.getElementById('signup')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;

    if (getUser(username)) {
        alert('Username already exists!');
    } else {
        saveUser(username, password);
        alert('Signup successful! Please login.');
        window.location.href = 'login.html';
    }
});

// Handle login
document.getElementById('login')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const user = getUser(username);

    if (user && user.password === password) {
        localStorage.setItem('currentUser', username);
        alert('Login successful!');
        window.location.href = 'index.html';
    } else {
        alert('Invalid username or password!');
    }
});

// Handle logout
document.getElementById('logout')?.addEventListener('click', function () {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
});

// Check if user is logged in
function checkLogin() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        document.getElementById('login-link').style.display = 'none';
        document.getElementById('signup-link').style.display = 'none';
        document.getElementById('logout').style.display = 'inline';
        document.getElementById('dashboard').style.display = 'block';
        document.getElementById('user-info').innerText = `Welcome, ${currentUser}`;

        // Redirect admin to admin page
        if (currentUser === 'admin') {
            window.location.href = 'admin.html';
        }
    }
}

// Run checkLogin on page load
checkLogin();
