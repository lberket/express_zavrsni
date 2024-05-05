import axios from "axios";
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./Prijava.css";
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';


axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.headers = {
    "content-type": "application/json",
};

function Prijava({authtema}) {
    const [username, setUsername] = useState('');
    const [emailR, setEmailR] = useState('');
    const [passwordR, setPasswordR] = useState('');
    const [role, setRole] = useState('user');

    const [emailP, setEmailP] = useState('');
    const [passwordP, setPasswordP] = useState('');

    const [info, setInfo] = useState([]);
    const [token, setToken] = useState([]);

    const [showA, setShowA] = useState(false);
    const [showB, setShowB] = useState(true);

    const toggleShowA = () => setShowA(!showA);
    const toggleShowB = () => setShowB(!showB);


    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    const handleEmailRChange = (e) => {
        setEmailR(e.target.value);
    };
    const handlePasswordRChange = (e) => {
        setPasswordR(e.target.value);
    };
    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };
    const handleEmailPChange = (e) => {
        setEmailP(e.target.value);
    };
    const handlePasswordPChange = (e) => {
        setPasswordP(e.target.value);
    };

    const registriraj = () => {
        let podaci = {
            username: username,
            email: emailR,
            role: role,
            password: passwordR
        }
        authtema(role);
        axios.post("http://localhost:3000/korisnici", podaci)
        alert("Uspješna registracija!");
        axios.post("http://localhost:3000/prijava", podaci)
        .catch(error => {
            alert("Pogrešni podaci");
            setInfo([null, null, null]);
        })
        .then(response => {
            localStorage.setItem("token", response.data.token);
            axios.get("http://localhost:3000/token-ruta", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
                .then(response => {
                    console.log(response.data)
                    setToken(response.data);
                    axios.get(`http://localhost:3000/korisnici/${emailP}`).then(response => {
                        setInfo([response.data.username, response.data.email, response.data.role, token])
                    })
                        .catch(error => {
                            console.error("Greška kod prijave:", error);
                        });
                })
                .catch(error => {
                    // Obrada pogreške
                });



        });

    }


    const prijavi = () => {
        let podaci = {
            email: emailP,
            password: passwordP
        }
        axios.post("http://localhost:3000/prijava", podaci)
            .catch(error => {
                alert("Pogrešni podaci")
                setInfo([null, null, null])
            })
            .then(response => {
                localStorage.setItem("token", response.data.token);
                axios.get("http://localhost:3000/token-ruta", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                })
                    .then(response => {
                        setToken(response.data);
                        alert("Uspješna prijava!")
                        axios.get(`http://localhost:3000/korisnici/${emailP}`).then(response => {
                            setInfo([response.data.username, response.data.email, response.data.role, token])
                            authtema(response.data.role)
                        })
                            .catch(error => {
                                console.error("Greška kod prijave:", error);
                            });
                    })
                    .catch(error => {
                        // Obrada pogreške
                    });



            });

    };
    const adminver = () => {
        axios.get("http://localhost:3000/admin-ruta", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then(response => {
                alert("Osoba je admin")
            })
            .catch(error => {
                alert("Osoba nije admin")
            });

    }


    return (
        <div>

            <Row xs={1} md={2} className="g-4">
                <Col>
                    <Card border="danger" className="registracija">
                        <Card.Header as="h4">Registracija korisnika</Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicUsername">
                                    <Form.Label>Korisničko ime</Form.Label>
                                    <Form.Control type="username" placeholder="Upišite username" onChange={handleUsernameChange}
                                    />

                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email adresa</Form.Label>
                                    <Form.Control type="email" placeholder="Upišite email" onChange={handleEmailRChange} />

                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Šifra</Form.Label>
                                    <Form.Control type="password" placeholder="Upišite šifru" onChange={handlePasswordRChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <div key={`inline-radio`} className="mb-3">
                                        <Form.Check
                                            inline
                                            label="User"
                                            name="group1"
                                            id={`1`}
                                            type={"radio"}
                                            value="user"
                                            checked={role === 'user'}
                                            onChange={handleRoleChange}
                                        />
                                        <Form.Check
                                            inline
                                            label="Admin"
                                            name="group1"
                                            id={`2`}
                                            type={"radio"}
                                            value="admin"
                                            checked={role === 'admin'}
                                            onChange={handleRoleChange}
                                        />
                                    </div>      </Form.Group>
                                <Button variant="danger" onClick={registriraj}>
                                    Registriraj se
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>


                <Col>


                    <Card border="danger" className="prijava">
                        <Card.Header as="h4">Prijava korisnika</Card.Header>
                        <Card.Body>
                            <Form>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email adresa</Form.Label>
                                    <Form.Control type="email" placeholder="Upišite email" onChange={handleEmailPChange} />

                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Šifra</Form.Label>
                                    <Form.Control type="password" placeholder="Upišite šifru" onChange={handlePasswordPChange} />
                                </Form.Group>

                                <Button variant="danger" onClick={prijavi}>
                                    Prijavi se
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <br />
            <Container className="text-center mt-4">
                <Button onClick={toggleShowA} className="mb-2" size="sm" variant="secondary">
                    Prikaži podatke
                </Button>
                <br />
                <div className="toast-container">
                    <Toast show={showA} onClose={toggleShowA}>
                        <Toast.Header>
                            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                            <strong className="me-auto">Podatci o korisniku</strong>
                            <small></small>
                        </Toast.Header>
                        <Toast.Body>
                            <Row className="podatci">
                                <p>Username: {info[0]} <br /></p>
                                <p>Email: {info[1]} <br /></p>
                                <p>Role: {info[2]} <br /></p>
                                <p>Ruta: {token}</p>
                                
                            </Row>
                        </Toast.Body>
                    </Toast>
                </div>
            </Container>

            <br />
  

        </div>
    );
}

export default Prijava;
