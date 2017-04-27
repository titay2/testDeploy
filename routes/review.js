/**
 * Created by tehetenamasresha on 27/04/2017.
 */

const Book = require('../Models/books');
const async = require('async');

module.exports = (app)=>{
    app.get('/review/:id', (req, res) => {
        const messg = req.flash('success');
        Book.findOne({'_id':req.params.id}, (err, data) => {
            res.render('book/review', {title: 'Book Review', user:req.user, data:data,msg: messg, hasMsg: messg.length>0 });
            console.log(req.user)
            console.log(data)


        });
    });

    app.post('/review/:id', (req, res) => {
        async.waterfall([
            (callback)=>{
                Book.findOne({'_id':req.params.id}, (err, result) => {
                    callback(err, result);
                });
            },

            (result, callback)=>{
                Book.update({
                        '_id': req.params.id
                    },
                    {
                        $push: {bookRating: {
                            userFullname: req.body.sender,
                            userRating: req.body.clickedValue,
                            userReview: req.body.review
                        },
                            ratingNumber: req.body.clickedValue
                        },
                        $inc: {ratingSum: req.body.clickedValue}
                    }, (err) => {
                        req.flash('success', 'Your review has been added.');
                        res.redirect('/review/'+req.params.id)
                    })
            }
        ])
    });

}