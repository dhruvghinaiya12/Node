const {Router}=require("express");
const { BlogPostForm, BlogPage, BlogPost, getAllBlogs, deleteBlog, EditBlog, SingleBlog, searchBlogs, likeBlog, addCommentToBlog } = require("../controller/BlogController");
const checkRole = require("../middleware/Authorization");

const BlogRouter=Router();

BlogRouter.get("/create",checkRole,BlogPostForm)
BlogRouter.get("/",BlogPage)
BlogRouter.post("/create",checkRole,BlogPost)
BlogRouter.get("/blogs",getAllBlogs)
BlogRouter.get("/search", searchBlogs);
BlogRouter.delete("/delete/:id",checkRole,deleteBlog)
BlogRouter.patch("/edit/:id",checkRole,EditBlog)
BlogRouter.get("/singleBlog/:id", SingleBlog);
BlogRouter.patch("/like/:id",likeBlog);
BlogRouter.patch("/comment/:id", addCommentToBlog);

module.exports=BlogRouter;