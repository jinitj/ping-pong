import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import IconHover from "../IconHover";
import TagList from "../TagList";
import './style.css';

const Mapping = ({mappingKey, values, addValues, removeMapping}) => {
    return (
        <div className="mapping">
            <div>{mappingKey} <IconHover action="delete" onAction={() => removeMapping(mappingKey)}/></div>
            <div>
                <TagList
                    tags={values}
                    setTags={(tags) => {
                        addValues(mappingKey, tags);
                    }}
                />
            </div>
        </div>
    )
};

export default Mapping;