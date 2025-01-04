const API_URL = 'http://localhost:5000/api/blogs';

// Fetch blogs and display
async function fetchBlogs() {
    const res = await fetch(API_URL);
    const blogs = await res.json();
    const container = document.getElementById('blog-container');
    container.innerHTML = blogs.map(blog => `
        <article>
            <h2>${blog.title}</h2>
            <p>${blog.content}</p>
            <button onclick="deleteBlog('${blog._id}')">Delete</button>
            <a href="edit.html?id=${blog._id}">Edit</a>
        </article>
    `).join('');
}

// Create blog
async function createBlog(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    await fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title, content }) });
    window.location.href = 'blog.html';
}

// Delete blog
async function deleteBlog(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchBlogs();
}

document.addEventListener('DOMContentLoaded', fetchBlogs);
document.getElementById('blog-form')?.addEventListener('submit', createBlog);
