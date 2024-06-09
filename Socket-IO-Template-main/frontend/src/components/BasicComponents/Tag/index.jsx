import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import './style.css';

const Tag = (props) => {
    return (
        <span className="tag">
            {props.label}
            <AiOutlineClose
                className="icon"
                onClick={() => { props.onRemove(props.value); }}
            />
        </span>
    );
};

export default Tag;