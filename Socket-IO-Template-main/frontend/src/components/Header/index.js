import React from "react";
import { Link } from "react-router-dom";

import LOGO from "../../images/logo.png";

import "./style.css";

const Header = (props) => {
    return (
        <div className="header">
            <div>
                <Link to="/">
                    <img src={LOGO} alt="" height={50} width={125}/>
                </Link>
            </div>
            {/* <div></div>
            <div>Account</div> */}
        </div>
    )
}

export default Header;