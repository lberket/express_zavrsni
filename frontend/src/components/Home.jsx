import shelter from "./dodatci/shelter.jpg"
import { useState } from "react";

function Home(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);
    setName('');
    setEmail('');
    setMessage('');
  };   
  
  
  
  return(
 
        <div>
        
        <h2 className="naslov">O nama</h2>
        <div className="content-wrapper">
        <img src={shelter} alt="" className="slika"/>
       <div>
        
       <h4>Azil za životinje No Kill</h4>
       <h4>Osnovano: 2014</h4>
       <h6>Brinemo se o napuštenim, maltretiranim i zlostavljanim životinjama i tražimo sigurne domove pune ljubavi za njih. Sve dolazne životinje štiti i promiče naš partner: Bestie Foundation Split, neprofitna organizacija osnovana 2011. s ciljem rješavanja i unaprjeđenja prava napuštenih životinja te edukacije ljudi o odgovornom posjedovanju kućnih ljubimaca na području Splita.</h6>
</div>

       </div>
       
       <div className="content-wrapper">
        <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d740269.1508190164!2d15.160074882708816!3d43.55078760402636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13355c31b9ab5199%3A0x91350fe7fd3000f3!2sNO%20KILL%20animal%20shelter%20Animalis%20Centrum!5e0!3m2!1sen!2shr!4v1684081621214!5m2!1sen!2shr"
        width="60%"
        height="400rem"
        className="slika"
        style={{ border:0}}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>  

    <div>
        
    <h2>Kontakt</h2>
    <form onSubmit={handleSubmit}>
      <label>
        Ime:
        <input type="text" value={name} onChange={handleNameChange} required />
      </label>
      <br />
      <label>
        Mail:
        <input type="email" value={email} onChange={handleEmailChange} required />
      </label>
      <br />
      <label>
        Poruka:
        <textarea value={message} onChange={handleMessageChange} required></textarea>
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
    </div>

    </div>
      </div>
    )
}
export default Home;