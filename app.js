const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const denemeController = require('./controllers/cnt');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb://localhost:27017';
mongoose.connect(dbURI, {
   useNewUrlParser: true, useUnifiedTopology: true 
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));


  const requestSchema = mongoose.Schema({
    msg: {
      type: String
    }
      
    
      
  })

  const Request = mongoose.model('Request', requestSchema)





app.get('*', checkUser);
app.get('/',denemeController.deneme);
app.get('/signup',denemeController.deneme);
app.use(authRoutes);

app.get('/',function(req,res) {
  Request.find(function(err,found){
    if (err) {
      console.log(err)
    }
    else {
      res.render('home', {msg})
    }
  })
})
app.post('/', async function(req,res){
  console.log("fonksiyon message")
  const input = req.body.input;
  console.log(req)


  const newList = new Request({
    msg: input
  })
  await newList.save(function(err){
    if(err){
      console.log(err)
    } else {
      res.redirect('/')
    }
  })
})



