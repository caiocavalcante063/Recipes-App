import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function LinkButton({ text, linkTo, testid, id, className }) {
  return (
    <Link to={ linkTo }>
      <button
        type="button"
        data-testid={ testid }
        id={ id }
        className={ className }
      >
        { text }
      </button>
    </Link>
  );
}

LinkButton.propTypes = {
  text: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};
