const Blog = require("../model/BlogSchema")
const Fuse = require("fuse.js");


const BlogPage=(req,res)=>{
    res.render("Blog")
}

const BlogPostForm=(req,res)=>{
    res.render("BlogPost")
}

const BlogPost=async(req,res)=>{
try {
    req.body.author = req.cookies.username;
     const blogPost = await Blog.create(req.body);
     res.cookie("blogId", blogPost.id);
     res.send(`Blog created by ${req.cookies.username}`);

} catch (error) {
    res.status(500).send("An error occurred while creating the blog."); 
}
}

const getAllBlogs=async(req, res)=>{
    try {
        let blog=await Blog.find()
        res.status(200).json(blog)
    } catch (error) {
        res.status(500).json({ message: "Error retrieving blogs", error: error.message })
    }
}

const deleteBlog=async(req, res)=>{
    try{
        let {id}=req.params
        let blog=await Blog.findByIdAndDelete(id)
        res.status(200).json(blog)
    }
    catch(error){
        res.status(500).json({ message: "Error deleting blog", error: error.message })
    }
}

const EditBlog=async(req,res)=>{
    try{
        let {id}=req.params
        let blog=await Blog.findByIdAndUpdate(id,req.body,{new:true})
        res.send(blog)
    }
    catch(error){
        res.status(500).json({ message: "Error retrieving blog", error: error.message })
    }
}

const SingleBlog = async(req, res) =>{
    try {
      const { id } = req.params;
      const singleBlog = await Blog.findById(id);
      if (!singleBlog) {
        return res.status(404).send("Blog not found");
      }
      console.log("Image URL:", singleBlog.image); 
      res.render("singleBlogPage", { singleBlog });
    } catch (error) {
      res.status(500).send("An error occurred while retrieving the blog.");
    }
}
  

const searchBlogs = async(req, res) =>{
    try {
      const query = req.query.blogs; 
      if (!query) {
        return res.status(400).json({ message: "Search query is required" });
      }
  
      const blogs = await Blog.find(); 
  
      const options = {
        keys: ["title", "author", "category"], 
      };
  
      const fuse = new Fuse(blogs, options);
      const results = fuse.search(query);
  
      const matchedBlogs = results.map((result) => result.item);
  
      res.status(200).json(matchedBlogs);
    } catch (error) {
      res.status(500).json({ message: "An error occurred during search", error: error.message });
    }
}
    
const likeBlog = async(req, res) =>{
    try {
      const { id } = req.params;
      const username = "Tester";
      console.log(req.cookies);
      if (!username) {
        return res.send("User not logged in.");
      }
  
      const blog = await Blog.findById(id);
      blog.likedBy.push({ username });
      await blog.save();
  
      res.status(200).json({ likedBy: blog.likedBy });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while liking the blog",
        error: error.message,
      });
    }
}
  

const addCommentToBlog = async(req, res) =>{
  try {
      const { id } = req.params; 
      const { text } = req.body; 
      const username = "Testing"; 
      console.log(req.cookies);
    
      const blog = await Blog.findById(id);

      if (!blog) {
          return res.status(404).send("Blog not found.");
      }

      blog.comments.push({ username, text });
      await blog.save();

      res.status(200).json(blog); 
  } catch (error) {
      res.status(500).json({
          message: "An error occurred while adding the comment.",
          error: error.message,
      });
  }
}

  
  
  

module.exports = { BlogPage, BlogPostForm, BlogPost, getAllBlogs, deleteBlog, EditBlog, SingleBlog,searchBlogs,likeBlog,addCommentToBlog};


