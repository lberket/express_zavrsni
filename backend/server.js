require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const jwt = require("jsonwebtoken");
const Korisnik = require('./models/Korisnik');


const PORT = process.env.PORT || 3000;


const provjeriUlogu = (uloga) => (req, res, next) => {
    if (req.korisnik && req.korisnik.uloga === uloga) {
        next();
    } else {
        res
            .status(403)
            .send(`Zabranjen pristup - vaša uloga je ${req.korisnik.uloga} `);
    }
};

const provjeriCookie = (cookieName) => (req, res, next) => {
    if (req.cookies && req.cookies[cookieName]) {
        next();
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
};

const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
    next();
};


mongoose.connect("mongodb://localhost:27017/novaBaza", {
    family: 4,
});

const db = mongoose.connection;

db.on("error", (error) => {
    console.error("Greška pri spajanju:", error);
});
db.once("open", function () {
    console.log("Spojeni smo na bazu");
});

app.use((req, res, next) => {
    if (process.env.NODE_ENV == "development") {
        req.time = new Date(Date.now()).toString();
        console.log(req.method, req.hostname, req.path, req.time);
   }
   next();
});

const korisniciRouter = require("./routes/korisnici");
const obavijestiRouter = require("./routes/obavijesti");
const donacijeRouter = require("./routes/donacije");
const zivotinjeRouter = require("./routes/zivotinje");

const provjeriToken = (req, res, next) => {
    const authZaglavlje = req.headers["authorization"];
    if (!authZaglavlje)
        return res.status(403).send("Ne postoji autorizacijsko zaglavlje");

    const token = authZaglavlje.split(" ")[1];
    if (!token) return res.status(403).send("Token nije pronađen");

    try {
        const dekodiraniToken = jwt.verify(token, "tajniKljuc");
        req.korisnik = dekodiraniToken;
    } catch (err) {
        return res.status(401).send("Neispravni Token");
    }
    return next();
};

app.get("/token-ruta", provjeriToken, (req, res) => {
    console.log(req.korisnik);
    res.send("zaštićena");
});

const saltRunde = 10;

app.post("/prijava", async (req, res) => {
    try {
        const korisnikBaza = await Korisnik.findOne({ email: req.body.email });
        if (
            korisnikBaza &&
            (await bcrypt.compare(req.body.password, korisnikBaza.password))
        ) {
            const token = jwt.sign(
                { idKorisnika: korisnikBaza.username, uloga: korisnikBaza.role },
                "tajniKljuc",
                { expiresIn: "1h" }
            );
            res.json({ token });
        } else {
            res.status(401).send("Neispravni podaci za prijavu");
        }
    } catch (error) {
        next(error);
    }
});

app.get("/admin-ruta", provjeriToken, provjeriUlogu("admin"), (req, res) => {
    res.send("Ovo je podatak samo za admina");
});

app.post("/prijava-cookie", async (req, res) => {
    try {
        const korisnikBaza = await Korisnik.findOne({ email: req.body.email });
        if (
            korisnikBaza &&
            (await bcrypt.compare(req.body.password, korisnikBaza.password))
        ) {
            const token = jwt.sign(
                { idKorisnika: korisnikBaza.username },
                "tajniKljuc",
                { expiresIn: "1h" }
            );

            // Postavljamo JWT token kao cookie u odgovoru
            res.cookie("accessToken", token, {
                httpOnly: true,
                maxAge: 3600000, // 1 sat
                secure: false, // u produkcijskoj verziji mora biti TRUE
            });

            res.status(200).send("Prijava uspješna");
        } else {
            res.status(401).send("Neispravni podaci za prijavu");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});



app.use("/korisnici", korisniciRouter);
app.use("/obavijesti", obavijestiRouter);
app.use("/donacije", donacijeRouter);
app.use("/zivotinje", zivotinjeRouter);
app.use(errorMiddleware);


app.listen(PORT, () => {
    console.log(`Server sluša zahtjeve na portu ${PORT}`);
});
