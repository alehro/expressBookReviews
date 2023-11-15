const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let doesExist = require("./auth_users.js").doesExist;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!doesExist(username)) {
      users.push({ "username": username, "password": password });
      return res.status(200).json({ message: "Customer successfully registred. Now you can login" });
    } else {
      return res.status(404).json({ message: "Customer already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register Customer." });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  //Write your code here
  return res.status(200).json({ books: books });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  //Write your code here  
  return res.status(200).json(books[req.params.isbn]);
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  //Write your code here
  let keys = Object.keys(books);
  let key = keys.find(i => {
    return books[i]["author"] == req.params.author;
  })
  return res.status(200).json(books[key]);
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  //Write your code here
  let keys = Object.keys(books);
  let key = keys.find(i => {
    return books[i]["title"] == req.params.title;
  })
  return res.status(200).json(books[key]);
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  //Write your code here
  return res.status(200).json(books[req.params.isbn].reviews);
});

//task 10
public_users.get('/books', async function (req, res) {
  await new Promise((resolve, reject) => {
    resolve(res.status(200).json({ books: books }));
  });
});

public_users.get('/books/isbn/:isbn', async function (req, res) {
  await new Promise((resolve, reject) => {
    resolve(res.status(200).json(books[req.params.isbn]));
  });
});

public_users.get('/books/author/:author', async function (req, res) {
  await new Promise((resolve, reject) => {
    let keys = Object.keys(books);
    let key = keys.find(i => {
      return books[i]["author"] == req.params.author;
    })

    resolve(res.status(200).json(books[key]));
  });

});

public_users.get('/books/title/:title', async function (req, res) {
  await new Promise((resolve, reject) => {
    let keys = Object.keys(books);
    let key = keys.find(i => {
      return books[i]["title"] == req.params.title;
    })

    resolve(res.status(200).json(books[key]));
  });
});

module.exports.general = public_users;
