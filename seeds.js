var mongoose = require('mongoose');
var Contact = require('./models/contact');

var data = [
  {
    firstname:      'Harry',
    lastname:       'Potter',
    phonehome:      '555-293-2901',
    phonecell:      '555-294-2902',
    phonework:      '555-295-2903',
    emailprimary:   'hpotter@hogwarts.edu',
    emailsecondary:  '',
    note:           'Loves Voldemort'
    },{
    firstname:      'Ron',
    lastname:       'Weasley',
    phonehome:      '555-296-2904',
    phonecell:      '555-297-2905',
    phonework:      '555-298-2906',
    emailprimary:   'rweasley@hogwarts.com',
    emailsecondary:  '',
    note:           'Hates Snape'
    },{
    firstname:      'Hermoine',
    lastname:       'Granger',
    phonehome:      '555-296-2904',
    phonecell:      '555-297-2905',
    phonework:      '555-298-2906',
    emailprimary:   'hgranger@hogwats.edu',
    emailsecondary:  '',
    note:           'Favorite class = Potions!'
    },{
    firstname:      'Draco',
    lastname:       'Malfoy',
    phonehome:      '555-296-2904',
    phonecell:      '555-297-2905',
    phonework:      '555-298-2906',
    emailprimary:   'dmalfoy@hogwarts.edu',
    emailsecondary:  '',
    note:           ''
    },{
    firstname:      'Neville',
    lastname:       'Longbottom',
    phonehome:      '555-296-2904',
    phonecell:      '555-297-2905',
    phonework:      '',
    emailprimary:   'nlongbottom@hogwarts.edu',
    emailsecondary:  '',
    note:           ''
    }
    ];

function seedDB(){
    // Remove all contacts
    Contact.remove({}, function(err){
      if(err){
        console.log(err);
      } else {
        console.log('removed contacts');
        // Add a few contacts
        data.forEach(function(seed){
            Contact.create(seed, function(err, contact){
              if(err){
                console.log(err);
              } else {
                console.log("added a contact")
                console.log(contact);;
              }
            });
          });
        }
      });
    };

module.exports = seedDB;
