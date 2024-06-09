import React from 'react';

const Icons = (props) => {
    const { iconName } = props;

    switch (iconName) {
        default:
            return <div>Empty / Invalid Icon Name</div>;
    }
};

export default Icons;
