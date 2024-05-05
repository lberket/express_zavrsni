const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const korisnikShema = new Schema({
  username: String,
  email: { type: String, unique: true, required: true },
  password: String
});

const Korisnik = mongoose.model("Korisnik", korisnikShema, "korisnici");

module.exports = Korisnik;
