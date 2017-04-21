

module.exports = (app)=>{
    app.get('/book/create', (req, res) => {
       // const success = req.flash('success');
        res.render('book/books', {title: 'Company Registration'});
    });
}
