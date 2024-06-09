import React, { useState } from "react";
import IconHover from "../IconHover";
import Tag from "../Tag";
import './style.css';

const TagList = ({tags, setTags}) => {
    const [newTag, setNewTag] = useState("");

    const addTags = () => {
        setTags([...tags, { label: newTag, value: newTag }]);
        setNewTag("");
    };

    const onRemove = (tagVal) => {
        setTags(tags.filter(tag => tag.value !== tagVal));
    }

    const tagListDisplay = tags?.map(tag => (<Tag {...tag} onRemove={onRemove} />))

    return (
        <>
            {tagListDisplay}
            <div className="addTag">
                <input
                    value={newTag}
                    onChange={(e) => {
                        setNewTag(e.target.value);
                    }}
                />
                <IconHover
                    action="add"
                    onAction={addTags}
                />
            </div>
        </>
    )
};

export default TagList;