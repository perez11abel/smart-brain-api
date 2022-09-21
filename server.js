const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : 'test',
    database : 'smart-brain'
  }
});


const app = express();
app.use(cors())
app.use(express.json());


app.get('/', (req, res) => { res.send('success') })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req,res) => {register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => {image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res) })

app.listen(process.env.PORT3000, () => {
	console.log(`app is running on port ${process.env.PORT}`);
})


// 	bcrypt.hash(password, null, null, function(err, hash) {
//     console.log(hash);
// 	});

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });


// --> res= this is working
//signin ==> POST = success/failure  (POST if the sign in is succesfull)
//register --> POST = user           (POST the New user created into our user variable. Or a database)
//profile/:userId --> GET = user.   (GET info from the user)
//image --> PUT --> user            (PUT/update the user entries)