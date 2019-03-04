const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const PostModule = require("./modules/postModule.js");
const CommentModule = require("./modules/commentModule.js");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, "dist")));
app.use(cors({ credentials: true, origin: true }));

const db = mongoose.connect("mongodb://localhost/blog");

const postModule = new PostModule(db);
const commentModule = new CommentModule(db);

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "dist/index.html"));
// });

const port = process.env.PORT || "3000";
const server = http.createServer(app);
server.listen(port, () => {
  console.log("server listenting on " + port);
});

// const hashedAdminPassword = bcrypt.hashSync("admin", 8);
const hashedAdminPassword =
  "$2a$08$fhGinQ9VKzrZjyll7PFNTenzZUsJ13enAYImkC9NK0igHpr4D0rRm";

function authenticate(token, callback) {
  jwt.verify(token, secret, (err, decoded) => {
    if (err) console.log(err);
    else callback(decoded);
  });
}

app.post("/login", (req, res) => {
  console.log("got login request", req.body.password);
  console.log(bcrypt.hashSync(req.body.password, 8));
  console.log(hashedAdminPassword);
  if (
    req.body.username == "admin" &&
    bcrypt.hashSync(req.body.password, 8) == hashedAdminPassword
  ) {
    const token = jwt.sign({ id: "123" }, secret, { expiresIn: 86400 });
    res.status(200).send({ auth: true, token: token });
  } else {
    res
      .status(500)
      .send({ auth: false, message: "Invalid username and or password." });
  }
});

app.post("/create-post", (req, res) => {
  const token = req.headers["X-access-token"];
  if (!token)
    return res.status(401).send({
      auth: false,
      message: "No token provided."
    });

  authenticate(token, result => {
    postModule.createPost(req.body, result => {
      res.send(result);
    });
  });
});

app.get("/get-posts", (req, res) => {
  postModule.getPosts(result => {
    res.send(result);
  });
});

app.get("/get-post", (req, res) => {
  postModule.getPost(req.params.id, result => {
    res.send(result);
  });
});

app.patch("/update-post", (req, res) => {
  const token = req.headers["X-access-token"];
  if (!token)
    return res.status(401).send({
      auth: false,
      message: "No token provided."
    });

  authenticate(token, result => {
    postModule.updatePost(req.body, rewult => {
      res.send(result);
    });
  });
});

app.delete("/delete-post", (req, res) => {
  const token = req.headers["X-access-token"];
  if (!token)
    return res.status(401).send({
      auth: false,
      message: "No token provided."
    });

  authenticate(toekn, result => {
    postModule.deletePost(req.params.id, result => {
      res.send(result);
    });
  });
});

app.post("/create-comment", (req, res) => {
  commentModule.createComment(req.body, result => {
    res.send(result);
  });
});

app.get("/get-comments", (req, res) => {
  commentModule.getComments(result => {
    res.send(result);
  });
});

app.get("/get-comment", (req, res) => {
  commentModule.getComment(req.params.id, result => {
    res.send(result);
  });
});

app.patch("/update-comment", (req, res) => {
  const token = req.headers["X-access-token"];
  if (!token)
    return res.status(401).send({
      auth: false,
      message: "No token provided."
    });

  authenticate(token, result => {
    commentModule.updateComment(req.params.id, result => {
      res.send(result);
    });
  });
});

app.delete("/delete-comment", (req, res) => {
  const token = req.headers["X-access-token"];
  if (!token)
    return res.status(401).send({
      auth: false,
      message: "No token provided."
    });

  authenticate(token, result => {
    commentModule.deleteComment(req.params.id, result => {
      res.send(result);
    });
  });
});
