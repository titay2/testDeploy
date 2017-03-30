/**
 * Created by tehetenamasresha on 28/03/2017.
 */
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const moment = require('moment')
const Schema = mongoose.Schema
 require('dotenv').config()


const app = express()

mongoose.Promise = global.Promise; //ES6 Promise
/*const name= req.body.uname
const fname= req.body.fname*/

app.use('/assets', express.static(__dirname + '/public'))


app.set('view engine', 'ejs')


app.get('/',(req,res)=>{
    //res.send("connected!")
    res.render('index')

})


//mongoose.connect('mongodb://localhost:27017/test').then(() => {
//mongoose.connect(db)
mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PASS}:${process.env.DB_HOST}:${process.env.DB_PORT}/cats`).then(() => {
    console.log('Connected successfully.')
const catSchema = new Schema({
    name:  String,
    age:   Number,
    gender: { type: String, enum:[ 'male', 'female']  },
    color: String,
    weight: Number

    });

    const cats = mongoose.model('cat1', catSchema);

    const cat1 = new cats({
        name: 'John',
        age: 10,
        gender: 'male',
        color: 'blue',
        weight: 15
    });
    cat1.save((err)=>{
        if(err)throw err
        console.log('cat saved!')
    })

    cats.find({}, (err, cat)=> {
        // if (err) throw err;
        //
        // console.log('the cats found '+ cat)
        // app.get('/form',(req,res)=>{
        //     //res.send("connected!")
        //     res.render('test', { ID: cat })
        //
        // })
        console.log(cat);
    })
    const port = process.env.PORT || 3000;

    app.listen(port)
}, err => {
    console.log('Connection to db faileed: ' + err)
});





