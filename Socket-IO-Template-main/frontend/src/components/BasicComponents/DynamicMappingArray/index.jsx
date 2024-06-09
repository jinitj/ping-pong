import React, { useState } from "react";
import IconHover from "../IconHover";
import Mapping from "../Mapping";
import "./style.css";

const DynamicMappingArray = ({mappingList, setMappingList}) => {
    const [newMapping, setNewMapping] = useState("");

    const addMapping = () => {
        setMappingList([...mappingList, {mappingKey: newMapping, values: []}]);
        setNewMapping("");
    };

    const addValues = (mappingKey, values) => {
        for (let i = 0; i < mappingList.length; i++) {
            if (mappingList[i].mappingKey === mappingKey) {
                mappingList[i].values = [...values];
                break;
            }
        }
        setMappingList([...mappingList]);
    };

    const removeMapping = (mappingKey) => {
        setMappingList(mappingList.filter(mapping => mapping.mappingKey !== mappingKey));
    };

    const mappingDisplay = mappingList.map(mapping => <Mapping {...mapping} addValues={addValues} removeMapping={removeMapping} />);
    
    return (
        <>
            {mappingDisplay}
            <div className="addMapping">
                <input
                    value={newMapping}
                    onChange={(e) => {
                        setNewMapping(e.target.value);
                    }}
                />
                <IconHover
                    action="add"
                    onAction={addMapping}
                />
            </div>
        </>
    );
};

export default DynamicMappingArray;