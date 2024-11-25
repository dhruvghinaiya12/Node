import Navbar from "./header.js";

document.getElementById("header").innerHTML = Navbar();

let id=null;

// Handle form submission to create a new blog post
const handleBlog = async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();
  const author = document.getElementById("author").value.trim();


  if (!title || !content || !author) {
    alert("All fields are required.");
    return;
  }

  const newPost = { title, content, author };

  if(id==null){
    const response = await axios.post("http://localhost:5000/blogPosts", newPost);

    if (response.status === 200 || response.status === 201) {
      alert("Blog post created successfully!");
      document.getElementById("blog-form").reset();
      fetchBlogPosts(); 
    } else {
      alert(response.data.message || "Failed to create blog post");
    }
  }
  else{
    const response = await axios.patch(`http://localhost:5000/blogPosts/${id}`, newPost);

      if (response.status === 200) {
        alert("Blog post updated successfully!");
        document.getElementById("blog-form").reset();
        id = null; 
        document.getElementById("submit-btn").innerText = "Create Post";
        fetchBlogPosts();
      }
  }
  
};

document.getElementById("blog-form").addEventListener("submit", handleBlog);

// update the blog post
const updateBlog = (post) => {
  document.getElementById("title").value = post.title;
  document.getElementById("content").value = post.content;
  document.getElementById("author").value = post.author;

  id = post._id; 
  document.getElementById("submit-btn").innerText = "Update Post";
};

// display all posts
const fetchBlogPosts = async () => {
  const response = await axios.get("http://localhost:5000/blogPosts");
  document.getElementById("blog-posts").innerHTML = ""; 
  response.data.map((post) => {
    document.getElementById("blog-posts").innerHTML += `
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${post.content}</p>
          <p class="card-text"><small class="text-muted">Author ID: ${post.author}</small></p>
          <p class="card-text"><small class="text-muted">Created at: ${new Date(
            post.createdAt
          ).toLocaleString()}</small></p>
           <button class="btn btn-primary" id="edit-btn-${post._id}">Edit</button>
          <button class="btn btn-danger" id="delete-btn-${post._id}">Delete</button>
        </div>
      </div>`;
  });

  response.data.forEach((post)=>{
    document.getElementById(`edit-btn-${post._id}`).addEventListener("click", () => {
      updateBlog(post);
    });

    document.getElementById(`delete-btn-${post._id}`).addEventListener("click", () => {
      deleteBlogPost(post._id);
    });
  })
};

// delete blog post
const deleteBlogPost = async (postId) => {
  await axios.delete(`http://localhost:5000/blogPosts/${postId}`);
  alert("Blog post deleted successfully!");
  fetchBlogPosts(); 
};


fetchBlogPosts();

  

