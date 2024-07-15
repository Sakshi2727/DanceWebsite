const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDances');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    concern: String
  });
  const contact = mongoose.model('contact', contactSchema);
 
const bodyParser=require("body-parser")
const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 8050;
app.use('/static',express.static('static'))
app.use(express.urlencoded())
app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))
 app.use(bodyParser.urlencoded({extended: true}));
//  set views as directory
app.get('/',(req,res)=>{
    const params={ }
    res.status(200).render('home.pug',params)
})
app.get('/contact',(req,res)=>{
    const params={ }
    res.status(200).render('contact.pug',params)
})

app.post('/contact', async (req, res) => {
    try {
        console.log("POST request received");
        console.log(req.body); // Check the content of req.body
        
        const { name, phone, email, address, concern } = req.body;

        // Create a new Contact instance
        const myData = new contact({ name, phone, email, address, concern });

        // Save the data to MongoDB
        await myData.save();

        console.log("Data saved to database");
        res.send("This item saved to database");
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).send("Internal Server Error: Item was not saved");
    }
});
app.listen(port,()=>{
    console.log("the application started")
})

