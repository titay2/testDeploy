/**
 * Created by tehetenamasresha on 30/03/2017.
 */
const express = require('express')
const ejs =require('ejs')
const engine = require('ejs-mate')


module.exports =(app)=>{
    /*app.get('/',(req, res)=>{

    })*/



app.use( express.static('/public'))
app.engine('ejs', engine)
app.set('view engine', 'ejs')



}