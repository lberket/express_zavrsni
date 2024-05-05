import { useContext } from 'react';
import TemaContext from "./kontekst";
 
function Tipka(props) {
  const tema = useContext(TemaContext)
  return(
    <TemaContext.Consumer>
    { tema => <button className={tema} onClick={() => props.klik}>{props.natpis}</button> }
  </TemaContext.Consumer>
  ) 
}

export default Tipka;