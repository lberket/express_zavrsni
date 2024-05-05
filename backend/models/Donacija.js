const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const donacijaShema = new Schema({
    kategorija: String,
    tip: String,
    opis: String,
    vrijednost: Number,
    id: Number
});
const Donacija = mongoose.model("Donacija", donacijaShema, "donacije");

module.exports = Donacija;
