/**
 * Created by tehetenamasresha on 30/03/2017.
 */
const express = require('express')
const Books = require ('../Models/books')
const Users = require ('../Models/users')
const bodyParser = require('body-parser')


module.exports = (app)=> {

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}));

    app.get('/api/books', (req, res) => {
        Books.find().exec().then((books) => {
            res.send(books)
        })
    })
    app.get('/api/users', (req, res) => {
        Users.find().exec().then((users) => {
            res.send(users)
        })
    })

    app.get('/api/books/:id', (req, res) => {
        Books.findById(req.params.id, (err, book) => {
            if (err)
                res.send(err)
            res.json(book)
        })
    })
    app.get('/api/users/:id', (req, res) => {
        Users.findById(req.params.id, (err, user) => {
            if (err)
                res.send(err)
            res.json(user)
        })
    })

    app.post('/api/books', (req, res) => {
        const book = new Books()
        book.title = req.body.name;
        book.author = req.body.author;
        book.description = req.body.name;
        book.title = req.body.name;

        book.save((err) => {
            if (err)
                res.send(err)
            res.json({message: 'Book added to the store!', data: book});

        })
    })
    app.post('/api/users', (req, res) => {
        const user = new Users()
        user.name = req.body.name;
        user.contact = req.body.contact;


        book.save((err) => {
            if (err)
                res.send(err)
            res.json({message: 'Book added to the store!', data: book});

        })
    })
}