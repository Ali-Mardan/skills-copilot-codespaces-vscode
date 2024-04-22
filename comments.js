// Create web server
// Create a route for GET /comments
// Create a route for POST /comments
// Create a route for GET /comments/:id
// Create a route for PUT /comments/:id
// Create a route for DELETE /comments/:id

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const comments = require('./comments');

app.use(bodyParser.json());

app.get('/comments', (req, res) => {
  res.json(comments);
});

app.post('/comments', (req, res) => {
  const comment = req.body;
  comments.push(comment);
  res.json(comment);
});

app.get('/comments/:id', (req, res) => {
  const id = Number(req.params.id);
  const comment = comments.find(comment => comment.id === id);
  res.json(comment);
});

app.put('/comments/:id', (req, res) => {
  const id = Number(req.params.id);
  const newComment = req.body;
  comments.forEach((comment, index) => {
    if (comment.id === id) {
      comments[index] = newComment;
    }
  });
  res.json(newComment);
});

app.delete('/comments/:id', (req, res) => {
  const id = Number(req.params.id);
  const deletedComment = comments.find(comment => comment.id === id);
  comments = comments.filter(comment => comment.id !== id);
  res.json(deletedComment);
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});