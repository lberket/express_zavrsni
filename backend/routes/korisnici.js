const express = require('express');
const router = express.Router();
const Korisnik = require('../models/Korisnik');


router.post("/", async (req, res) => {

    try {
        const hashLozinka = await bcrypt.hash(req.body.password, saltRunde);
        const noviKorisnik = new Korisnik({ ...req.body, password: hashLozinka });
        await noviKorisnik.save();
        res.status(201).send("Korisnik uspješno registriran");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get("/", async (req, res) => {
    try {
        const sviKorisnici = await Korisnik.find();
        res.json(sviKorisnici);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get("/:email", async (req, res) => {
    const { email } = req.params;
    try {
        const korisnik = await Korisnik.findOne({ email });
        if (!korisnik) {
            return res.status(404).send("Korisnik ne postoji");
        }
        res.json(korisnik);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const korisnik = await Korisnik.findByIdAndDelete(req.params.id);
        if (!korisnik) {
            return res.status(404).send("Korisnik ne postoji");
        }
        res.send("Korisnik izbrisan");
    } catch (error) {
        res.status(500).send(error.message);
    }
});



module.exports = router;
