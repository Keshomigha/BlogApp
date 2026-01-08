import express from "express";
const app = express();
const port = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Temporary storage (NO database)
let posts = [];

// Home page – view all posts
app.get("/", (req, res) => {
  res.render("index.ejs", { posts });
});

// Create post page
app.get("/create", (req, res) => {
  res.render("create.ejs");
});

// Handle post creation
app.post("/create", (req, res) => {
  const { title, content } = req.body;
  posts.push({ title, content });
  res.redirect("/");
});

// Edit post page
app.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  res.render("edit.ejs", { post: posts[id], id });
});

// Handle post update
app.post("/edit/:id", (req, res) => {
  const id = req.params.id;
  posts[id] = {
    title: req.body.title,
    content: req.body.content
  };
  res.redirect("/");
});

// Delete post
app.post("/delete/:id", (req, res) => {
  const id = req.params.id;
  posts.splice(id, 1);
  res.redirect("/");
});

// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
