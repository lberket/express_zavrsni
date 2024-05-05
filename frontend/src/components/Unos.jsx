import "../index.css"
import { useState, useEffect } from "react";
import axios from "axios";


function Unos(props) {
  const [animals, postaviZivotinje] = useState([]);
  const [formaPodaci, postaviPodatke] = useState({
    ime: "",
    vrsta: "pas",
    godine: "",
    udomljen: false,
    opis: ""
  });

  useEffect(() => {
    const fetchAnimals = () => {

    axios.get('http://localhost:3000/zivotinje')
        .then(res => postaviZivotinje(res.data))
        .catch(err => console.log(err));}

fetchAnimals();
const intervalId = setInterval(fetchAnimals, 1000);
return () => clearInterval(intervalId);
}, []);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  function dodajZivotinju() {
    console.log(animals)
    axios.post('http://localhost:3000/zivotinje', formaPodaci)
    .then(rez => {
      console.log(rez);
      alert("Dodali ste životinju.");
    })
    .catch(error => {
      console.error('Error adding animal:', error);
      alert("Greška prilikom dodavanja životinje.");
    });
  }

  if (props.admin !== "admin") {
    return <h2 style={{ color: "red", textAlign: "center", margin: 15 }}>Morate biti prijavljeni kao administrator</h2>;
  }


  return (
    <div style={{ margin: 50 }}>
      <form onSubmit={handleSubmit}>
        <label>
          Ime:
          <input type="text" name="name" required onChange={(event) => postaviPodatke({ ...formaPodaci, ime: event.target.value })} />
        </label>
        <br />
        <label>
          Tip:
          <select name="type" onChange={(event) => postaviPodatke({ ...formaPodaci, vrsta: event.target.value })}>
            <option value="pas">Pas</option>
            <option value="mačka">Mačka</option>
            <option value="zec">Zec</option>
            <option value="ptica">Ptica</option>
          </select>
        </label>
        <br />
        <label>
          Godina:
          <input type="number" name="year" required onChange={(event) => postaviPodatke({ ...formaPodaci, godine: event.target.value })} />
        </label>
        <br />
        <label>
          Udomljen:
          <input type="checkbox" name="udomljen" checked={formaPodaci.udomljen}
            onChange={(event) => postaviPodatke({ ...formaPodaci, udomljen: event.target.checked })
            } />
        </label>
        <br />
        <label>
          Poruka:
          <textarea name="message" onChange={(event) => postaviPodatke({ ...formaPodaci, opis: event.target.value })}></textarea>
        </label>
        <br />
        <button type="submit" onClick={dodajZivotinju}>Submit</button>
      </form>
    </div>
  );
}

export default Unos;