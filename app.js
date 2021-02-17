/*
 Authors: Agnes Ko, Shaniah Nizzar
 Your name and student #: Agnes Ko A01205739
 Your Partner's Name and student #: Shaniah Nizzar A01199153
 (Make sure you also specify on the Google Doc)
*/
const express = require("express");
const fs = require('fs')

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

let movieList = []
// const toDoList = document.querySelector('#todo-list')

app.get("/", (req, res) => res.render("pages/index"));

app.get("/myForm", (req, res) => res.render("pages/myForm"));


movieList = []

app.post("/myForm", (req, res) => {
  // Add your implementation here
  let formMovie = req.body;
  let splitMovie = formMovie.Movies.split(',');
  splitMovie.forEach((movie) => movieList.push(movie))
  console.log("this is list", movieList)
  res.render('pages/index', { movies: movieList });
  res.redirect("/");
});


app.get("/myListQueryString", (req, res) => {
  // Add your implementation here
  let movie1 = req.query.movie1
  let movie2 = req.query.movie2
  movieList.push(movie1)
  movieList.push(movie2)
  console.log('This is list 2', movieList)
  res.render('pages/index', { movies: movieList })
});

let emptyList = []

app.get("/search/:movieName", (req, res) => {
  // Add your implementation here
  let movieName = req.params.movieName;
  fs.readFile('movieDescriptions.txt', (err, data) => { 
    if (err) throw err; 
    let text = data.toString('utf-8');
    let splitByN = text.split('\n')
    splitByN.forEach(line => {
      let splitByColon = line.split(':')
      if (splitByColon[0].toUpperCase() === movieName.toUpperCase()) {
        emptyList.push(splitByColon[0])
        emptyList.push(splitByColon[1])
      }
    })
  // console.log('this is emptylist', emptyList)
  res.render('pages/searchResult', { movies: emptyList })
  })
})


app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});