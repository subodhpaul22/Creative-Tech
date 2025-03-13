// Save posts to localStorage
function savePost(title, content, imageUrl, linkUrl, author) {
    const post = { title, content, imageUrl, linkUrl, author };
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));
}

// Display posts
function displayPosts() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const postList = document.getElementById('post-list');
    postList.innerHTML = posts.map(post => `
        <div class="post">
            <h3>${post.title}</h3>
            ${post.imageUrl ? `<img src="${post.imageUrl}" alt="Post Image" class="post-image">` : ''}
            <p>${post.content}</p>
            ${post.linkUrl ? `<a href="${post.linkUrl}" target="_blank" class="post-link">Read more</a>` : ''}
            <small>By ${post.author}</small>
        </div>
    `).join('');
}

// Handle post form submission
document.getElementById('post-form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;
    const imageUrl = document.getElementById('post-image').value;
    const linkUrl = document.getElementById('post-link').value;
    const author = localStorage.getItem('currentUser');
    savePost(title, content, imageUrl, linkUrl, author);
    alert('Post published!');
    displayPosts();
});

// Display posts on page load
displayPosts();