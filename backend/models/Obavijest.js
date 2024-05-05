const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const obavijestShema = new Schema({
    naslov: String,
    datum: String,
    tekst: String,
    vazno: Boolean
});
const Obavijest = mongoose.model("Obavijest", obavijestShema, "obavijesti");

module.exports = Obavijest;
