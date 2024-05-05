import Navbar from "./Navbar";
import './index.css';
import Home from "./components/home";
import Informacije from "./components/Informacije";
import Popis from "./components/Popis";
import Donacije from "./components/Donacije";
import Unos from "./components/Unos";
import TemaContext from "./kontekst";
import Prijava from "./components/Prijava";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';


axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.headers = {
    "content-type": "application/json",
};

function App(props) {
  const [tema, postaviTemu] = useState("Neregistriran");

  const promijeniTemu = (information) => {
    // Do something with the received information
    postaviTemu(information);
    console.log(information)
  };

  let component;
   switch(props.name){
    case "home":
      component = <Home></Home>
      break
    case "informacije":
      component = <Informacije admin={tema}></Informacije>
      break
    case "popis":
      component = <Popis admin={tema}></Popis>
      break
    case "donacije":
      component = <Donacije admin={tema}></Donacije>
      break
    case "unos":
      component = <Unos admin={tema}></Unos>
      break
    case "prijava":
      component = <Prijava authtema={promijeniTemu}></Prijava>
      break
  }


   
  function promjenaTeme(){
    postaviTemu(tema == "User" ? "Admin" : "User");
  }
 

  return (
    <>
  

     <div className="nav">
      Azil za životinje 
     <TemaContext.Provider value={tema}>
      </TemaContext.Provider>
     
     <button className="admin"><a style={{color:"black", textDecoration:"none"}}>{tema}</a></button> 
      </div>

    <Navbar></Navbar>
    {component}
    </>
  );
}

export default App;






