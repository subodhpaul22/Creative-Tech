// Post a notice
document.getElementById('notice-form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const noticeContent = document.getElementById('notice-content').value;
    localStorage.setItem('adminNotice', noticeContent);
    alert('Notice posted!');
    window.location.href = 'index.html'; // Redirect to homepage to see the notice
});

// Display all posts for management
function displayPostsForAdmin() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const postList = document.getElementById('post-list');
    postList.innerHTML = posts.map((post, index) => `
        <div class="post">
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <small>By ${post.author}</small>
            <button onclick="editPost(${index})">Edit</button>
            <button onclick="deletePost(${index})">Delete</button>
        </div>
    `).join('');
}

// Edit a post
function editPost(index) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const post = posts[index];
    const newTitle = prompt('Edit post title:', post.title);
    const newContent = prompt('Edit post content:', post.content);

    if (newTitle && newContent) {
        posts[index] = { ...post, title: newTitle, content: newContent };
        localStorage.setItem('posts', JSON.stringify(posts));
        displayPostsForAdmin();
    }
}

// Delete a post
function deletePost(index) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.splice(index, 1);
    localStorage.setItem('posts', JSON.stringify(posts));
    displayPostsForAdmin();
}

// Display all users
function displayUsers() {
    const users = Object.keys(localStorage).filter(key => key !== 'currentUser' && key !== 'adminNotice' && key !== 'posts');
    const userList = document.getElementById('user-list');
    userList.innerHTML = users.map(user => `
        <div class="user">
            <p>Username: ${user}</p>
            <button onclick="removeUser('${user}')">Remove User</button>
        </div>
    `).join('');
}

// Remove a user
function removeUser(username) {
    if (confirm(`Are you sure you want to remove ${username}?`)) {
        localStorage.removeItem(username);
        displayUsers();
        alert(`${username} has been removed.`);
    }
}

// Load posts and users on page load
displayPostsForAdmin();
displayUsers();