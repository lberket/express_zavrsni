const express = require('express');
const router = express.Router();
const Obavijest = require('../models/Obavijest');

router.get("/", async (req, res) => {
    try {
        const sveObavijesti = await Obavijest.find();
        res.json(sveObavijesti);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post("/", async (req, res) => {
    try {
        const novaObavijest = new Obavijest({ ...req.body});
        await novaObavijest.save();
        res.status(201).send("Nova obavijest dodana.");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const obav = await Obavijest.findByIdAndDelete(req.params.id);
        if (!obav) {
            return res.status(404).send("Obavijest ne postoji");
        }
        res.send("Obavijest izbrisana");
    } catch (error) {
        res.status(500).send(error.message);
    }
});


module.exports = router;
