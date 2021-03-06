import React from 'react';
import { storiesOf } from '@storybook/react';
import { createJobs } from '@bundle-stats/utils';
import * as webpack from '@bundle-stats/utils/lib-esm/webpack';

import baselineStats from '../../../__mocks__/webpack-stats.baseline.json';
import currentStats from '../../../__mocks__/webpack-stats.current.json';
import { getWrapperDecorator } from '../../stories';
import { BundleChunkModules } from '.';

const [currentJob, baselineJob] = createJobs([
  { webpack: currentStats },
  { webpack: baselineStats },
]);

const stories = storiesOf('Components/BundleChunkModules', module);
stories.addDecorator(getWrapperDecorator());

const RUNS_DEFAULT = [baselineJob];

stories.add('default', () => (
  <BundleChunkModules
    name="vendor"
    id="1"
    runs={RUNS_DEFAULT}
    items={webpack.compareBySection.modules(RUNS_DEFAULT)[1].modules}
  />
));

const RUNS_MULTIPLE = [currentJob, baselineJob];

stories.add('multiple jobs', () => (
  <BundleChunkModules
    name="vendor"
    id="1"
    runs={RUNS_MULTIPLE}
    items={webpack.compareBySection.modules(RUNS_MULTIPLE)[1].modules}
  />
));

stories.add('empty modules', () => (
  <BundleChunkModules name="vendor" id="1" runs={RUNS_MULTIPLE} items={[]} />
));

stories.add('empty filtered modules', () => (
  <BundleChunkModules
    name="vendor"
    id="1"
    runs={RUNS_MULTIPLE}
    items={[
      {
        key: 'module-a',
        label: 'module-a',
        biggerIsBetter: false,
        changed: false,
        runs: [
          {
            name: 'module-a',
            value: 25,
            displayValue: '25B',
            delta: 0,
            deltaPercentage: 0,
            displayDelta: '0B',
            displayDeltaPercentage: '0%',
          },
          {
            name: 'module-a',
            value: 25,
            displayValue: '25B',
            delta: 0,
            deltaPercentage: 0,
            displayDelta: '0B',
            displayDeltaPercentage: '0%',
          },
        ],
      },
    ]}
  />
));

const JOBS_EMPTY_BASELINE = createJobs([{ webpack: currentStats }, null]);

stories.add('empty baseline', () => (
  <BundleChunkModules
    name="vendor"
    id="1"
    runs={JOBS_EMPTY_BASELINE}
    items={webpack.compareBySection.modules(JOBS_EMPTY_BASELINE)[1].modules}
  />
));
