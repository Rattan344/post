const postsContainer = document.getElementById('posts');
const loader = document.getElementById('loader');
let page = 1;

async function fetchPosts() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=5`);
    const data = await res.json();
    return data;
}

function displayPosts(posts) {
    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.body}</p>
        `;
        postsContainer.appendChild(postDiv);
    });
}

async function loadPosts() {
    loader.classList.add('show');
    const posts = await fetchPosts();
    displayPosts(posts);
    loader.classList.remove('show');
    page++;
}

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
        loadPosts();
    }
});

loadPosts();
