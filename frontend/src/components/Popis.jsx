import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Row, Col } from 'react-bootstrap';

function Popis(props) {

    const [udomljeno, postaviUdomljeno] = useState('all');
    const [vrstaOdabir, postaviVrstaOdabir] = useState('all');

    const [editing, setEditing] = useState(false);

    const [animals, postaviZivotinje] = useState([]);

    useEffect(() => {
        const fetchAnimals = () => {

            axios.get('http://localhost:3000/zivotinje')
            .then(res => postaviZivotinje(res.data))
            .catch(err => console.log(err));   
        }

        fetchAnimals();
        const intervalId = setInterval(fetchAnimals, 1000);
        return () => clearInterval(intervalId);
        }, []);
        



    const promijeniUdomljeno = (event) => {
        postaviUdomljeno(event.target.value);
    };

    const promijeniVrste = (event) => {
        postaviVrstaOdabir(event.target.value);
    };

    let filteredAnimals;
    if (udomljeno === 'all') {
        filteredAnimals = animals;
    } else if (udomljeno === 'udomljen') {
        filteredAnimals = animals.filter(animal => animal.udomljen === true);
    } else if (udomljeno === 'nije_udomljen') {
        filteredAnimals = animals.filter(animal => animal.udomljen === false);
    }

    if (vrstaOdabir === 'all') {
        filteredAnimals = filteredAnimals;
    } else if (vrstaOdabir === 'pas') {
        filteredAnimals = filteredAnimals.filter(animal => animal.vrsta === "pas");
    } else if (vrstaOdabir === 'macka') {
        filteredAnimals = filteredAnimals.filter(animal => animal.vrsta === "mačka");
    }



    return (
        <div>


            <form>
                Filter:
                <label>
                    <input
                        type="radio"
                        name="Svi"
                        value="all"
                        checked={udomljeno === 'all'}
                        onChange={promijeniUdomljeno}
                        style={{ marginRight: 5 }}
                    />
                    Svi
                </label>

                <label>
                    <input
                        type="radio"
                        name="Udomljen"
                        value="udomljen"
                        checked={udomljeno === 'udomljen'}
                        onChange={promijeniUdomljeno}
                        style={{ marginRight: 5 }}

                    />
                    Udomljen
                </label>

                <label>
                    <input
                        type="radio"
                        name="Nije udomljen"
                        value="nije_udomljen"
                        checked={udomljeno === 'nije_udomljen'}
                        onChange={promijeniUdomljeno}
                        style={{ marginRight: 5 }}

                    />
                    Nije udomljen
                </label>
            </form>


            <form>
                Vrsta:
                <label>
                    <input
                        type="radio"
                        name="Sve"
                        value="all"
                        checked={vrstaOdabir === 'all'}
                        onChange={promijeniVrste}
                        style={{ marginRight: 5 }}
                    />
                    Sve
                </label>

                <label>
                    <input
                        type="radio"
                        name="Mačka"
                        value="macka"
                        checked={vrstaOdabir === 'macka'}
                        onChange={promijeniVrste}
                        style={{ marginRight: 5 }}

                    />
                    Mačke
                </label>

                <label>
                    <input
                        type="radio"
                        name="Pas"
                        value="pas"
                        checked={vrstaOdabir === 'pas'}
                        onChange={promijeniVrste}
                        style={{ marginRight: 5 }}

                    />
                    Psi
                </label>
            </form>



            <br />

            <Row style={{marginLeft:10, marginRight:10}}>
                {filteredAnimals.map((animal)=> (
                
                    <Col xs={12} md={6} lg={4} style={{marginBottom:10}} key={animal._id}>
                       
                       
                        <Card>
                            <Card.Body>
                            

                               {/*  {editing ? (
                                      <div>
            <input type="text" value={ime} onChange={(e) => setIme(e.target.value)} />
            <input type="text" value={vrsta} onChange={(e) => setVrsta(e.target.value)} />
            <input type="text" value={opis} onChange={(e) => setOpis(e.target.value)} />
                                      <Button variant="primary" style={{fontSize:12, margin:10 }} onClick={handleSave(animal.id)}>
                                          Potvrdi
                                      </Button>
                                  </div>
                                ):(
 */}
                                <div>
                                    <Card.Title>{animal.ime}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{animal.vrsta}</Card.Subtitle>
                                <Card.Text>{animal.opis}</Card.Text>
                                <Card.Text style={{ fontSize: 13 }}>Udomljen:
                                    <Button variant={animal.udomljen === false ? 'danger' : 'success'} style={{ marginLeft: 5 }} disabled></Button>
                                </Card.Text>
                                {animal.udomljen === false && (
                                    <Button variant="primary" style={{fontSize:12, margin:10 }} onClick={()=>{
                                        axios.patch(`http://localhost:3000/zivotinje/${animal._id}`,{
                                            udomljen:true
                                        }).then( axios.get('http://localhost:3000/zivotinje')
                                        .then(res => postaviZivotinje(res.data)))
                                    }}>
                                        Udomi
                                    </Button>
                                )}
                                {props.admin === "Admin" && (
                                    <Button variant="info" style={{fontSize:12, margin:10 }} onClick={()=>{
                                        setEditing(true)

                                    }}>
                                        Uredi
                                    </Button>
                                )}
                                </div>
                            
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">Age: {animal.godine}</small>
                            </Card.Footer>
                            

                        </Card>
                    </Col>
                
                ))}
            </Row>
        </div>
    );
}

export default Popis;

