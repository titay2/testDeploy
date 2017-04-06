/**
 * Created by tehetenamasresha on 30/03/2017.
 */
const Books = require ('../Models/books')
const Users = require ('../Models/users')
const bodyParser = require('body-parser')


module.exports = (app)=> {

    app.use (bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get ('/api/books', (req,res)=>{
        Books.find().exec().then((books)=>{
            res.send(books)
        })
    })
    app.get ('/api/users', (req,res)=>{
        Books.find().exec().then((users)=>{
            res.send(users)
        })
    })

    app.get('/api/books/:id', (req,res)=>{
        Books.findById(req.params.id,(err, book) =>{
            if(err)
            res.send(err)
            res.json(book)
        })
    })
    app.get('/api/users/:id', (req,res)=>{
        Books.findById(req.params.id,(err, user) =>{
            if(err)
            res.send(err)
            res.json(user)
        })
    })
    app.post('/api/books', (req, res)=>{
        const book = new Books()
            beer.title = req.body.name;
            beer.author = req.body.author;
            beer.description = req.body.name;
            beer.title = req.body.name;
    })

    var beersRoute = router.route('/beers');

// Create endpoint /api/beers for POSTS
    beersRoute.post(function(req, res) {
        // Create a new instance of the Beer model
        var beer = new Beer();

        // Set the beer properties that came from the POST data
        beer.name = req.body.name;
        beer.type = req.body.type;
        beer.quantity = req.body.quantity;

        // Save the beer and check for errors
        beer.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Beer added to the locker!', data: beer });
        });
    });

}