import React from "react";
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import './style.css';

const Accordian = ({ header, children, active, onToggle }) => {
    return (
        <div class="accordian">
            <div
                className={"accordian-header " + (active && "active")}
                onClick={onToggle}
            >
                {header}
                <div className="accordian-icons">
                    {active && <AiFillCaretUp className="icons"/> }
                    {!active && <AiFillCaretDown className="icons"/> }
                </div>
            </div>
            {active && <div className="accordian-content">{children}</div>}
        </div>
    )

};

export default Accordian;