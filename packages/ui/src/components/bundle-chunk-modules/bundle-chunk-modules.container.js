import { compose, withProps } from 'recompose';
import { get } from 'lodash';

import { withCustomSort } from '../../hocs/with-custom-sort';
import { withFilteredItems } from '../../hocs/with-filtered-items';
import { withSearch } from '../../hocs/with-search';
import {
  SORT_BY_NAME,
  SORT_BY_SIZE,
  SORT_BY_DELTA,
  SORT_BY,
} from './bundle-chunk-modules.constants';

const getCustomSort = (sortBy) => (item) => {
  if (sortBy === SORT_BY_NAME) {
    return item.key;
  }

  if (sortBy === SORT_BY_SIZE) {
    return get(item, 'runs[0].value', 0);
  }

  if (sortBy === SORT_BY_DELTA) {
    return get(item, 'runs[0].deltaPercentage', 0);
  }

  return [!item.changed, item.key];
};

const getFilterByChanged = (filters) => (row) => {
  if (filters.changed) {
    return row.changed;
  }

  return true;
};

export default compose(
  withProps(({ runs, items }) => ({
    defaultFilters: { changed: true },
    initialFilters: { changed: runs && runs.length > 1 },
    allEntriesFilters: { changed: false },
    totalRowCount: items.length,
  })),
  withSearch(),
  withFilteredItems(getFilterByChanged),
  withCustomSort({ sortItems: SORT_BY, getCustomSort }),
);
