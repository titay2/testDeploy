/**
 * Created by tehetenamasresha on 30/03/2017.
 */
const express = require('express')
const bodyParser = require('body-parser')

module.exports = (app)=> {

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}));



    app.use(express.static('public'));

    /**
     * @api {get} /api/books'
     * @apiName GetBooks
     * @apiGroup Books
     */

    app.get('/api/books', (req, res) => {
        Books.find().exec().then((books) => {
            res.send(books)
        })
    })
    /**
     * @api {get} /api/users'
     * @apiName Getusers4rr§
     * @apiGroup Books
     */


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
    /*app.post('/api/books', upload.array(), (req, res) => {
            Books.create(req.body).then( post =>{
                res.send({status:'OK', post : post})
            }).catch(()=>{
                res.send({status: 'error', message: 'Database error'})
            })
    })
*/
    app.post('/api/users', (req, res) => {
        const user = new Users()
        user.name = req.body.name;
        user.contact = req.body.contact;


        user.save((err) => {
            if (err)
                res.send(err)
            res.json({message: 'Book added to the store!', data: book});

        })
    })
}


