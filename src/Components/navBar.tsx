//This navbar will not be part of the iteration the 08/04/2024
import { NavLink} from "react-router-dom"
import "../StylingSheets/navbar.css"

export function Navbar(){

  return (
    <div>
      <p> THIS SHOULD RENDER</p>
      <nav>
        <div id="nav_menu">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/cart">Home</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}
