import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { omit } from 'lodash';

import css from './table.module.css';

const getColumnAttributes = (headers, hasRowHeader, cellId) => {
  if (!headers) {
    return {};
  }

  const headerId = hasRowHeader ? cellId + 1 : cellId;
  const header = headers[headerId];

  return typeof header === 'object' ? omit(header, ['children']) : {};
};

const Tr = (props) => {
  const { className } = props;
  return <tr className={cx(css.row, className)} {...props} />;
};

Tr.defaultProps = {
  className: '',
};

Tr.propTypes = {
  /** Adopted child class name */
  className: PropTypes.string,
};

const Th = (props) => {
  const { className, ...restProps } = props;

  return <th className={cx(css.cell, className)} {...restProps} />;
};

Th.defaultProps = {
  className: '',
};

Th.propTypes = {
  /** Adopted child class name */
  className: PropTypes.string,
};

const Td = (props) => {
  const { className, ...restProps } = props;
  return <td className={cx(css.cell, className)} {...restProps} />;
};

Td.defaultProps = {
  className: '',
};

Td.propTypes = {
  /** Adopted child class name */
  className: PropTypes.string,
};

const renderHeader = (header, index) => {
  const headerProps = {
    key: `header-${index}`,
    ...(typeof header === 'object' && !React.isValidElement(header)
      ? header
      : { children: header }),
  };

  return <Th {...headerProps} />;
};

export const Table = ({ className, emptyMessage, outline, headers, rows }) => (
  <table className={cx(className, css.root, outline && css.outline)}>
    {headers && headers.length > 0 && (
      <thead>
        <Tr key="header-row">{headers.map(renderHeader)}</Tr>
      </thead>
    )}
    <tbody>
      {rows.length > 0 &&
        rows.map(
          ({ className: rowCustomClassName, cells = [], header = '', key, ...rowProps }, index) => {
            const rowKey = `row-${key || index}`;

            return (
              <Tr className={rowCustomClassName} key={rowKey} {...rowProps}>
                {header && renderHeader(header)}

                {cells.map((cell, cellIndex) => {
                  const cellProps = {
                    key: cell?.key || `${rowKey}-${cellIndex}`,
                    ...getColumnAttributes(headers, !!header, cellIndex),
                    ...(typeof cell === 'object' && !React.isValidElement(cell)
                      ? cell
                      : { children: cell }),
                  };

                  return <Td {...cellProps} />;
                })}
              </Tr>
            );
          },
        )}

      {rows.length === 0 && (
        <tr key="row-empty">
          <Td className={css.emptyData} colSpan={headers.length || 1}>
            {emptyMessage}
          </Td>
        </tr>
      )}
    </tbody>
  </table>
);

Table.defaultProps = {
  className: '',
  emptyMessage: 'No entries found.',
  outline: false,
  headers: [],
  rows: [],
};

Table.propTypes = {
  className: PropTypes.string,
  emptyMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  outline: PropTypes.bool,
  headers: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  rows: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};
