var mongoose = require('mongoose');

var contactsSchema = new mongoose.Schema({
  firstname:      String,
  lastname:       String,
  phonehome:      String,
  phonecell:      String,
  phonework:      String,
  emailprimary:   String,
  emailsecondary:  String,
  note:           String
});

module.exports = mongoose.model('Contact', contactsSchema);
