import React from "react";
import { SocialIcon } from 'react-social-icons';
import { facebookUrl, instagramUrl, whatsappUrl } from "../../constants/links";
import "./style.css"

const Footer = () => {
    return (
        <div>
            <div className="social-icons">
                <SocialIcon url={instagramUrl} />
                <SocialIcon url={facebookUrl} />
                <SocialIcon url={whatsappUrl} />
            </div>
        </div>
    )
}

export default Footer;