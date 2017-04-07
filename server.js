/**
 * Created by tehetenamasresha on 28/03/2017.
 */
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const moment = require('moment')
const apiController = require('./controllers/apiController')
const htmlController = require('./controllers/htmlController')

 require('dotenv').config()



mongoose.Promise = global.Promise; //ES6 Promise
/*const name= req.body.uname
const fname= req.body.fname*/




mongoose.connect('mongodb://localhost:27017/test').then(() => {

//mongoose.connect(db)

//mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/cats`).then(() => {

    console.log('Connected successfully.')
/*const catSchema = new Schema({
    name:  String,
    age:   Number,
    gender: { type: String, enum:[ 'male', 'female']  },
    color: String,
    weight: Number

    });*/

/*
    const cats = mongoose.model('cat1', catSchema);
*/

    /*const cat1 = new cats({
        name: 'Angela',
        age: 20,
        gender: 'male',
        color: 'blue',
        weight: 40
    });*/
    /*cat1.save().then( savedCat => console.log(savedCat)).catch(err => console.log(err));

    cats.find().
    where('age').gt(17).lt(50).
    exec(callback);




     cats.find({}, (err, cat)=> {
         if (err) throw err;

         console.log('the cats found '+ cat)
         app.get('/form',(req,res)=>{
             //res.send("connected!")
             res.render('test', { ID: cat})

         })

     })*/
    const port = process.env.PORT || 3030;

    app.listen(port)
     apiController(app)
    htmlController(app)


}, err => {
    console.log('Connection to db faileed: ' + err)
});





