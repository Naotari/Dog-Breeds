import React from "react";
import "./NavBar.css"
import {Link} from "react-router-dom"


const NavBar = () => {
    return(
        <div className="Navbar_Main">
            <Link to="/home" className="Navbar_Title"><h3>DOGS</h3></Link>
            <img src="https://svgsilh.com/svg/1084899.svg" className="Navbar_img" alt="no paw found"></img>
            <Link to="/creation" className="Navbar_Link">Creation</Link>
        </div>
    )
}

export default NavBar;