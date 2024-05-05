const express = require('express');
const router = express.Router();
const Donacija = require('../models/Donacija');



router.get("/", async (req, res) => {
    try {
        const svedonacije = await Donacija.find();
        res.json(svedonacije);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post("/", async (req, res) => {
    try {
        const novaDonacija = new Donacija({ ...req.body});
        await novaDonacija.save();
        res.status(201).send("Hvala na donaciji!");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.patch('/:id', async (req, res) => {
    try {
      const donacija = await Donacija.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!donacija) {
        return res.status(404).send('Donacija ne postoji');
      }
      res.json(donacija);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  router.delete("/:id", async (req, res) => {
    try {
        const donacija = await Donacija.findByIdAndDelete(req.params.id);
        if (!donacija) {
            return res.status(404).send("Donacija ne postoji");
        }
        res.send("Donacija izbrisana");
    } catch (error) {
        res.status(500).send(error.message);
    }
});


module.exports = router;
