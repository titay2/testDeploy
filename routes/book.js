const formidable = require('formidable')
const path = require('path')
const fs = require('fs')




const Book = require('../Models/books');

module.exports = (app)=>{
    app.get('/book/create', (req, res) => {
        const success = req.flash('success');
        res.render('book/books', {title: 'Book Registration', success:success, noErrors: success.length > 0});
    });

    app.post('/book/create', (req, res) => {

        const newBook = new Book();
        newBook.name = req.body.title;
        newBook.author = req.body.author;
        newBook.genre = req.body.genre;
        newBook.description = req.body.description;
        newBook.image = req.body.upload;

        newBook.save((err) => {
            if(err){
                console.log(err);
            }

            console.log(newBook);

            req.flash('success', 'Book data has been added.');
            res.redirect('/book/create');
        })
    });

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
}
