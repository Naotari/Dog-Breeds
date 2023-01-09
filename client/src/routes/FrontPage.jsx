import React from "react";
import "./FrontPage.css"
import {Link} from "react-router-dom"


const FrontPage = () => {
    return(
        <div className="FrontPage_Main">
            <div className="FrontPage_Second">
                    <h1>THE BEST HUMAN FRIEND</h1>
                    <p>There are many types, colors, sizes, temperaments and amounts of hair. Thanks to that They are the best friends of the human.</p>
                    <p>On this page you can see the existing dog breeds and you can add your own breed to the collection.</p>
                    <Link to="/home" className="FrontPage_Button"><h3>DOG BREEDS</h3></Link>
            </div>
        </div>
    )
}

export default FrontPage;