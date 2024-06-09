import React, { useState } from "react";
import Accordian from "../Accordian";

const NestedAccordian = ({ accordianList = [], allowMultipleActive = false }) => {
    const [selectedAccordian, setSelectedAccordian] = useState([]);

    console.log(selectedAccordian);
    const createAccordianList = accordianList.map((AccordianDetails, index) => (
        <Accordian
            active={selectedAccordian.includes(index)}
            onToggle = {() => {
                if (allowMultipleActive) {
                    if (selectedAccordian.includes(index)) {
                        selectedAccordian.splice(selectedAccordian.indexOf(index), 1);
                    } else {
                        selectedAccordian.push(index);
                    }
                } else {
                    if (selectedAccordian.includes(index)) {
                        selectedAccordian.pop();
                    } else {
                        selectedAccordian.pop();
                        selectedAccordian.push(index);
                    }
                }
                setSelectedAccordian([...selectedAccordian]);
            }}
            header={AccordianDetails.header}
        >
            {AccordianDetails.content}
            {
                AccordianDetails.children && <NestedAccordian accordianList={AccordianDetails.children} />
            }
        </Accordian>
    ))

    return (
        <div>
            {createAccordianList}
        </div>
    )
}

export default NestedAccordian;