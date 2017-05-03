const formidable = require('formidable')
const path = require('path')
const fs = require('fs')
const async = require('async');

const {arrayAverage} = require('../myFunctions');


const Book = require('../Models/books');
const User = require('../Models/users');

module.exports = (app)=>{
    app.get('/book/create/', (req, res) => {
        const success = req.flash('success');

        res.render('book/book', {title: 'Book Registration', user: req.user, success:success, noErrors: success.length > 0});
    });

    app.post('/book/create/', (req, res) => {
        const newBook = new Book();
        newBook.name = req.body.title;
        newBook.author = req.body.author;
        newBook.genre = req.body.genre;
        newBook.description = req.body.description;
        newBook.image = req.body.upload;
        newBook.ownerId = req.user.id;
        newBook.ownerName = req.user.fullname;

        newBook.save((err) => {
            if(err){
                console.log(err);
            }
              console.log(newBook);

            req.flash('success', 'Book has been added.');
             res.redirect('/book/create/' )
        })


     })

    app.post('/upload', (req, res) => {
        const form = new formidable.IncomingForm();

        form.uploadDir = path.join(__dirname, '../public/uploads');

        form.on('file', (field, file) => {
            fs.rename(file.path, path.join(form.uploadDir, file.name), (err) => {
                if(err){
                    throw err
                }

                console.log('File has been renamed');
            });
        });

        form.on('error', (err) => {
            console.log('An error occured', err);
        });

        form.on('end', () => {
            console.log('File upload was successful');
        });

        form.parse(req);

    });

    app.get('/books', (req, res) => {
        Book.find({}, (err, result) => {
            res.render('book/books', {title: 'All Books ', user: req.user, data: result});
            console.log(req.user)
            console.log(result)
        });
    })

    app.get('/book-profile/:id', (req, res) => {
        Book.findOne({'_id':req.params.id}, (err, data) => {
            const avg = arrayAverage(data.ratingNumber);
            res.render('book/book-profile', {title: 'Book Name', user:req.user, id: req.params.id, data:data, average: avg});
            });
        });

    app.get('/book/leaderboard', (req, res) => {
        Book.find({}, (err, result) => {
            res.render('book/leaderboard', {title: ' Leadebaord ', user: req.user, data: result});
        }).sort({'ratingSum': -1});
    });

    app.get('/book/search', (req, res) => {
            res.render('book/search', {title: 'All Books ', user: req.user});
    })
    app.post('/book/search', (req, res) => {
        const name = req.body.search;
        const regex = new RegExp(name, 'i');

        Book.find({'$or': [{'name':regex}]}, (err, data) => {
            if(err){
                console.log(err);
            }else{
                res.redirect('/book-profile/'+data[0]._id);

            }
        });
    });

    /*app.get('/mybooks/:id', (req, res) => {
        Book.find({'ownerId': req.params.ownerId}, (err, result) => {
            console.log(result)
            res.render('book/mybooks', {title: 'My Books ', user: req.user, data: result});
        });
    })*/

    app.get('/:name/owner', (req, res) => {
        Book.findOne({'name':req.params.name}, (err, data) => {
            res.render('book/owner', {title: 'Owner', user: req.user, data: data});
        });
    });
    }
