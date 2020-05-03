const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controler/register');
const signin = require('./controler/signin');
const profile = require('./controler/profile');
const image = require('./controler/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'trees',
      database : 'smartbrain'
    }
});

const app = express();
app.use(bodyParser.json())
app.use(cors());

app.get("/",(req,res) => {
    res.send(database.users);
})

app.post('/signin',signin.handleSignin(db,bcrypt))

app.post('/register',(req,res) => { register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id',(req,res) => { profile.handleProfile(req,res,db)})

app.put('/image',(req,res) => { image.handleImage(req,res,db)})

app.post('/imageUrl',(req,res) => { image.handleApiCall(req,res)})

// Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(3000, () => {
    console.log("The port is 3000");
})

// res = this is working
// signin --> Post = success/fail
// register --> Post = user
// profile/:userid --> Get = user
// image --> Put --> user