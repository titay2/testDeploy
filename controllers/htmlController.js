/**
 * Created by tehetenamasresha on 30/03/2017.
 */
const express = require('express')

module.exports =(app)=>{
    /*app.get('/',(req, res)=>{

    })*/



app.use('/assets', express.static(__dirname + '/public'))


app.set('view engine', 'ejs')


app.get('/',(req,res)=>{
    //res.send("connected!")
    res.render('index')

})
}