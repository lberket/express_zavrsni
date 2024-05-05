const express = require('express');
const router = express.Router();
const Zivotinja = require('../models/Zivotinja');


router.get("/", async (req, res) => {
    try {
        const sveZivotinje = await Zivotinja.find();
        res.json(sveZivotinje);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post("/", async (req, res) => {
    try {
        const novaZivotinja = new Zivotinja({ ...req.body});
        await novaZivotinja.save();
        res.status(201).send("Životinja dodana");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.patch('/:id', async (req, res) => {
    try {
      const ziv = await Zivotinja.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!ziv) {
        return res.status(404).send('Životinja ne postoji');
      }
      res.json(ziv);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

module.exports = router;

