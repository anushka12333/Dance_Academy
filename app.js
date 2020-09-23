const express = require("express");
const path =require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser=require("body-parser")
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
const port = 80;

// define schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
   address: String,
    desc: String
  });


const Contact = mongoose.model('Contact', contactSchema);



//Express specific stuff
app.use('/static', express.static('static'))
app.use(express.urlencoded()) // middleware

// pug specific stuff
app.set('view engine', 'pug') // set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// Endpoint
app.get('/',(req,res)=>{
    const con = "This is the best content on the internet so far wisely used it "
    const params={'title':'Pubg isthe best game','content':con }
    res.status(200).render('home.pug',params)
})
app.get('/contact',(req,res)=>{
    const con = "This is the best content on the internet so far wisely used it "
    const params={'title':'Pubg isthe best game','content':con }
    res.status(200).render('contact.pug',params)
})
app.post('/contact',(req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been save to the database")
    }).catch(()=>{
        res.status(400).send("Item was not send to the database")
    })
    // res.status(200).render('contact.pug')
})
app.get('/about',(req,res)=>{
    const con = "This is the best content on the internet so far wisely used it "
    const params={'title':'Pubg isthe best game','content':con }
    res.status(200).render('about.pug',params)
})


// start the server
app.listen(port, () => {
    console.log(`the application started succesfullyon port ${port}`);

})
