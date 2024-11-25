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


// Open comments box
const openCommentsModal = async (postId) => {
  document.getElementById("blogPostId").value = postId;
  document.getElementById("comment-list").innerHTML = "";

  const response = await axios.get(`http://localhost:5000/comments/${postId}`);
  response.data.forEach((comment) => {
    const commentItemId = `delete-btn-${comment._id}`; 

    document.getElementById("comment-list").innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${comment.content} </span>
        <button class="btn btn-danger btn-sm" id="${commentItemId}">Delete</button>
      </li>`;

   
    document.getElementById(commentItemId).addEventListener('click', () => {
      deleteComment(comment._id); 
    });
  });

  new bootstrap.Modal(document.getElementById("commentModal")).show();
};

// Add a new comment
document.getElementById("comment-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const content = document.getElementById("comment-content").value.trim();
  const author = document.getElementById("comment-author").value.trim();
  const blogPostId = document.getElementById("blogPostId").value;

  if (!content || !author) {
    alert("Both fields are required.");
    return;
  }

  const newComment = { content, author, blogPost: blogPostId };

  await axios.post("http://localhost:5000/comments", newComment);
  alert("Comment added successfully!");
  openCommentsModal(blogPostId); 
});

// Delete a comment
const deleteComment = async (commentId) => {
  await axios.delete(`http://localhost:5000/comments/${commentId}`);
  alert("Comment deleted successfully!");
  const blogPostId = document.getElementById("blogPostId").value;
  openCommentsModal(blogPostId); 
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
          <p class="card-text"><small class="text-muted">Created at: ${new Date(post.createdAt).toLocaleString()}</small></p>
           <button class="btn btn-primary" id="edit-btn-${post._id}">Edit</button>
          <button class="btn btn-danger" id="delete-btn-${post._id}">Delete</button>
          <button class="btn btn-info view-comments-btn" data-id="${post._id}">View Comments</button>
        </div>
      </div>`;

   
    document.getElementById(`edit-btn-${post._id}`).addEventListener("click", () => {
      updateBlog(post);
    });

   
    document.getElementById(`delete-btn-${post._id}`).addEventListener("click", () => {
      deleteBlogPost(post._id);
    });
  });

 
  document.querySelectorAll(".view-comments-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const postId = e.target.getAttribute("data-id");
      openCommentsModal(postId);
    });
  });
};


const deleteBlogPost = async (postId) => {
  await axios.delete(`http://localhost:5000/blogPosts/${postId}`);
  alert("Blog post deleted successfully!");
  fetchBlogPosts(); 
};

fetchBlogPosts(); 


