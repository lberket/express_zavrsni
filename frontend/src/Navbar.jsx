import './index.css'
import { Link } from "react-router-dom";



function Navbar() {
    return (
        <nav >
            <ul>
                <li>
                <Link className="nav-link" to={`/`} >O nama</Link>
                </li>
                <li>
                <Link className="nav-link" to={`/informacije`} >Informacije</Link>
                </li>
                <li>
                <Link className="nav-link" to={`/popis`} >Popis</Link>
                </li>
                <li>
                <Link className="nav-link" to={`/donacije`} >Donacije</Link>
                </li>
                <li>
                <Link className="nav-link" to={`/unos`} >Unos</Link>
                </li>
                <li>
                <Link className="nav-link" to={`/prijava`} >Prijava</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;


