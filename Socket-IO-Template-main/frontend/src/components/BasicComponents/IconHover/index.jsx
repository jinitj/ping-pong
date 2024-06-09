import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { AiFillDelete, AiFillPlusCircle, AiOutlineDelete, AiOutlinePlusCircle } from 'react-icons/ai';

import './style.css';

const IconHover = ({ size, action, onAction }) => {
  const [iconAddHovered, setIconAddHovered] = useState(false);
  return (
    <div
      className="iconHover"
      role="button"
      tabIndex="0"
      onClick={() => { onAction(); }}
    >
      <span
        onMouseEnter={() => setIconAddHovered(true)}
        onMouseLeave={() => setIconAddHovered(false)}
      >
        {
          action === 'add' ? (
            iconAddHovered ? <AiFillPlusCircle /> : <AiOutlinePlusCircle />
          ) : (
            iconAddHovered ? <AiFillDelete /> : <AiOutlineDelete />
          )
        }
      </span>
    </div>
  );
};

IconHover.propTypes = {
  action: PropTypes.string.isRequired,
  size: PropTypes.string,
};

IconHover.defaultProps = {
  size: 'lg',
};

export default IconHover;
