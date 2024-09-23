//Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var commentsFile = path.join(__dirname, 'comments.json');
var comments = [];

app.use(express.static('public'));
app.use(bodyParser.json());

// Get the comments
app.get('/comments', function(req, res) {
  fs.readFile(commentsFile, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    comments = JSON.parse(data);
    res.json(comments);
  });
});

// Add a comment
app.post('/comments', function(req, res) {
  comments.push(req.body);
  fs.writeFile(commentsFile, JSON.stringify(comments, null, 4), function(err) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(comments);
  });
});

// Start the server
app.listen(3000, function() {
  console.log('Server is running on http://localhost:3000/');
});
//End of file