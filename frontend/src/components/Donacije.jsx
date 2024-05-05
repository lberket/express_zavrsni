import axios from 'axios';
import { useState, useEffect } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';


function Donacije(props) {
  const [addingDonation, setAddingDonation] = useState(false);
  const [donationCategory, setDonationCategory] = useState('');
  const [donacije, postaviDonacije] = useState([]);


  useEffect(() => {
    const fetchDonations = () => {

      axios.get('http://localhost:3000/donacije')
        .then(res => postaviDonacije(res.data))
        .catch(err => console.log(err));

    }

    fetchDonations();
    const intervalId = setInterval(fetchDonations, 1000);
    return () => clearInterval(intervalId);
  }, []);


  const [formaPodaci, postaviPodatke] = useState({
    kategorija: "trazi",
    tip: "Hrana",
    vrijednost: 0,
    opis: ""
  });
  const [formaPodaci1, postaviPodatke1] = useState({
    kategorija: "nudi",
    tip: "Hrana",
    vrijednost: 0,
    opis: ""
  });

  const handleButtonClick1 = () => {
    postaviPodatke({ ...formaPodaci});
    postaviPodatke1({ ...formaPodaci1});
    dodajPonudu();
  };
  const handleButtonClick2 = () => {
    postaviPodatke({ ...formaPodaci});
    postaviPodatke1({ ...formaPodaci1});
    dodajPotragu();
  };

  function dodajPotragu() {
    axios.post('http://localhost:3000/donacije', formaPodaci)
      .then(axios.get('http://localhost:3000/donacije')
        .then(res => postaviDonacije(res.data))
        .catch(err => console.log(err)))
  }

  function dodajPonudu() {
    axios.post('http://localhost:3000/donacije', formaPodaci1)
      .then(axios.get('http://localhost:3000/donacije')
        .then(res => postaviDonacije(res.data))
        .catch(err => console.log(err)))
  }

  const handleNewDonation = (category) => {
    setAddingDonation(true);
    setDonationCategory(category);
  };

  const handleCancel = () => {
    setAddingDonation(false);
    setDonationCategory('');
  };

  const handleFormSubmit = (formData) => {

    setAddingDonation(false);
    setDonationCategory('');
  };



  const handleDelete = (id) => {
    axios.patch(`http://localhost:3000/donacije/${id}`), {
      kategorija: "donirano"
    }
  };

  function prihvati(id) {
    axios.patch(`http://localhost:3000/donacije/${id}`, {
      kategorija: "donirano"
    }).then(axios.get('http://localhost:3000/donacije')
      .then(res => postaviDonacije(res.data))
      .catch(err => console.log(err)));
  }

  function izbrisi(id) {
    axios.delete(`http://localhost:3000/donacije/${id}`).then(axios.get('http://localhost:3001/donacije')
      .then(res => postaviDonacije(res.data))
      .catch(err => console.log(err)));
  }


  let nude = donacije.filter(donacija => donacija.kategorija === "nudi");
  let traze = donacije.filter(donacija => donacija.kategorija === "trazi");
  let donirano = donacije.filter(donacija => donacija.kategorija === "donirano");


  return (
    <div className="sve">
      <h1>Donacije</h1>
      {props.admin === "admin" ?
        <button style={{ marginTop: 10, marginBottom: 15, }} onClick={() => handleNewDonation('tražimo')}>Nova donacija</button> :
        <button style={{ marginTop: 10, marginBottom: 15, }} onClick={() => handleNewDonation('nudi se')}>Nova donacija</button>}

      {addingDonation && donationCategory === 'tražimo' && (
        <form onSubmit={handleFormSubmit}>
          <label>
            Opis:
            <input type="text" name="opis" required onChange={(event) => postaviPodatke({ ...formaPodaci, opis: event.target.value })} />
          </label>
          <br />
          <label>
            Tip:
            <select name="tip" onChange={(event) => postaviPodatke({ ...formaPodaci, tip: event.target.value })}>
              <option value="Hrana">Hrana</option>
              <option value="Igračke">Igračke</option>
              <option value="Ostalo">Ostalo</option>
            </select>
          </label>
          <br />
          <label>
            Vrijednost:
            <input type="number" name="value" required onChange={(event) => postaviPodatke({ ...formaPodaci, vrijednost: event.target.value })} />
          </label>
          <br />
          <button type="submit" onClick={handleCancel} style={{ marginRight: 10 }}>Odustani</button>
          <button type="submit" onClick={handleButtonClick2}>Traži</button>
        </form>
      )}





      {addingDonation && donationCategory === 'nudi se' && (
        <form onSubmit={handleFormSubmit}>
          <label>
            Opis:
            <input type="text" name="opis" required onChange={(event) => postaviPodatke1({ ...formaPodaci1, opis: event.target.value })} />
          </label>
          <br />
          <label>
            Tip:
            <select name="tip" onChange={(event) => postaviPodatke1({ ...formaPodaci1, tip: event.target.value })}>
              <option value="Hrana">Hrana</option>
              <option value="Igračke">Igračke</option>
              <option value="Ostalo">Ostalo</option>
            </select>
          </label>
          <br />
          <label>
            Vrijednost:
            <input type="number" name="value" required onChange={(event) => postaviPodatke1({ ...formaPodaci1, vrijednost: event.target.value })} />
          </label>
          <br />
          <button type="submit" onClick={handleCancel} style={{ marginRight: 10 }}>Odustani</button>
          <button type="submit" onClick={handleButtonClick1}>Ponudi</button>
        </form>
      )}

      <div id="trazimo">

        <h4>Tražimo:</h4>
        <Row style={{ marginLeft: 10, marginRight: 10 }}>
          {traze.map((don) => (

            <Col xs={6} md={4} lg={3} style={{ marginBottom: 10 }} key={don._id}>
              <Card>
                <Card.Body>
                  <Card.Title>{don.tip}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{don.vrijednost} &#8364;</Card.Subtitle>
                  <Card.Text>{don.opis}</Card.Text>
                  {props.admin === "user" && <Button type="submit" onClick={() => prihvati(don._id)}>Doniraj</Button>}
                  {props.admin === "admin" && <Button type="submit" onClick={() => prihvati(don._id)}>Donirano</Button>}
                  {props.admin === "admin" && <Button style={{ marginLeft: 10 }} type="submit" onClick={() => izbrisi(don._id)}>Izbriši</Button>}





                </Card.Body>
              </Card>
            </Col>

          ))}
        </Row>

      </div>





      <div id="nudi_se">
        <h4>Nudi se:</h4>

        <Row style={{ marginLeft: 10, marginRight: 10 }}>
          {nude.map((don) => (

            <Col xs={6} md={4} lg={3} style={{ marginBottom: 10 }} key={don._id}>
              <Card>
                <Card.Body>
                  <Card.Title>{don.tip}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{don.vrijednost} &#8364;</Card.Subtitle>
                  <Card.Text>{don.opis}</Card.Text>
                  {props.admin === "admin" && <Button type="submit" onClick={() => prihvati(don._id)}>Prihvati</Button>}

                </Card.Body>
              </Card>
            </Col>

          ))}
        </Row>


      </div>
      <div id="donirano">
        <h4>Donirano:</h4>

        <Row style={{ marginLeft: 10, marginRight: 10 }}>
          {donirano.map((don) => (

            <Col xs={6} md={4} lg={3} style={{ marginBottom: 10 }} key={don._id}>
              <Card>
                <Card.Body>
                  <Card.Title>{don.tip}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{don.vrijednost} &#8364;</Card.Subtitle>
                  <Card.Text>{don.opis}</Card.Text>
                </Card.Body>
              </Card>
            </Col>

          ))}
        </Row>

      </div>
    </div>
  );
}


export default Donacije;