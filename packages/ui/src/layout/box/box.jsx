import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { NO_SPACE, SPACES } from '../../constants';
import css from './box.module.css';

export const Box = ({ className, as: Component, padding, outline, ...props }) => {
  const rootClassName = cx(css.root, className, css[`padding-${padding}`], outline && css.outline);

  return <Component className={rootClassName} {...props} />;
};

Box.defaultProps = {
  className: '',
  as: 'div',
  padding: NO_SPACE,
  outline: false,
};

Box.propTypes = {
  /** Adopted child class name */
  className: PropTypes.string,

  /** Rendered component */
  as: PropTypes.elementType,

  /** Padding space size */
  padding: PropTypes.oneOf(SPACES),

  /** Outline flag */
  outline: PropTypes.bool,
};
