const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const zivotinjaShema = new Schema({
    id: Number,
    ime: String,
    vrsta: String,
    cip: Boolean,
    godine: Number,
    opis: String,
    pregled: String,
    udomljen: Boolean
});

const Zivotinja = mongoose.model("Zivotinja", zivotinjaShema, "zivotinje");

module.exports = Zivotinja;
