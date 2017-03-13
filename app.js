var methodOverride  = require('method-override'),
expressSanitizer    = require('express-sanitizer'),
bodyParser          = require('body-parser'),
mongoose            = require('mongoose'),
express             = require('express'),
app                 = express(),
Contact             = require('./models/contact'),
seedDB              = require('./seeds'),
sortByKey           = require('./sort')

// App Config
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride('_method'));

// Connect to DB
mongoose.connect('mongodb://localhost/contactslist_app');

//seed DB
seedDB();

//Routes
app.get('/', function(req, res){
  res.redirect('/contacts');
});

// INDEX ROUTE
app.get('/contacts', function(req, res){
  Contact.find({}, function(err, contacts){
    if(err){
      console.log(err);
    } else {
      sortByKey(contacts, 'lastname');
      res.render('index', {contacts: contacts});
    }
  });
});

// NEW Route /contacts/new GET
app.get('/contacts/new', function(req, res){
  res.render('new');
});

// CREATE Route /contacts POST
app.post('/contacts', function (req, res){
  Contact.create(req.body.contact, function(err, newContact){
    if(err){
      console.log(err);
    } else {
      res.redirect('/contacts');
    }
  });
});

// Show Route /contacts/:id GET
app.get('/contacts/:id', function(req, res){
  Contact.findById(req.params.id, function(err, foundContact){
    if(err){
      console.log(err);
    } else {
      res.render('show', {contact: foundContact});
    }
  });
});
// Edit Route /contacts/:id/edit GET
app.get('/contacts/:id/edit', function(req, res){
  Contact.findById(req.params.id, function(err, foundContact){
    if(err){
      res.redirect('/contacts');
    } else {
      res.render('edit', {contact: foundContact});
    }
  });
});
// Update Route /contacts/:id PUT
  app.put('/contacts/:id', function(req, res){
    Contact.findByIdAndUpdate(req.params.id, req.body.contact, function(err, updatedContact){
      if(err){
        res.redirect('/contacts');
      } else {
        res.redirect('/contacts/' + req.params.id);
      }
    });
  });
// Destroy Route /contacts/:id DELETE
  app.delete('/contacts/:id', function(req, res){
    Contact.findByIdAndRemove(req.params.id, req.body.contact, function(err){
      if(err){
        res.redirect('/contacts');
      } else {
        res.redirect('/contacts');
      }
    });
  });

//Start Server
app.listen(3000, function(){
  console.log('Started Server');
})
