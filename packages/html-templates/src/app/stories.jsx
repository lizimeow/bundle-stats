/* global module */
import { storiesOf } from '@storybook/react';
import { createJobs } from '@bundle-stats/utils';

/* eslint-disable */
import currentData from 'Fixtures/job.current.json'; // eslint-disable-line
import baselineData from 'Fixtures/job.baseline.json'; // eslint-disable-line
/* eslint-enable */
import StandaloneApp from '.';

const CURRENT_SOURCE = {
  webpack: {
    builtAt: currentData.builtAt,
    hash: currentData.hash,
    ...currentData.rawData.webpack,
  },
};

const BASELINE_SOURCE = {
  webpack: {
    builtAt: baselineData.builtAt,
    hash: baselineData.hash,
    ...baselineData.rawData.webpack,
  },
};

const JOBS = createJobs([CURRENT_SOURCE, BASELINE_SOURCE]);

const MULTIPLE_JOBS = createJobs([
  CURRENT_SOURCE,
  BASELINE_SOURCE,
  {
    webpack: {
      builtAt: baselineData.builtAt,
      hash: 'aaaa1111',
      ...baselineData.rawData.webpack,
      assets: baselineData.rawData.webpack.assets.filter((asset) => asset.name.match(/.(css|js)$/)),
      modules: baselineData.rawData.webpack.modules.slice(0, 100),
    },
  },
]);

const [CURRENT_JOB, BASELINE_JOB] = JOBS;

const EMPTY_BASELINE = createJobs([
  { webpack: currentData.rawData.webpack },
  { webpack: null },
]);

const stories = storiesOf('StandaloneApp', module);

stories.addDecorator((storyFn) => (
  <div style={{ margin: '-1rem' }}>
    {storyFn()}
  </div>
));

stories.add('default', () => (
  <StandaloneApp jobs={[CURRENT_JOB, BASELINE_JOB]} />
));

stories.add('no insights', () => (
  <StandaloneApp
    jobs={[
      {
        ...CURRENT_JOB,
        insights: undefined,
      },
      BASELINE_JOB,
    ]}
  />
));

stories.add('no baseline', () => (
  <StandaloneApp jobs={[CURRENT_JOB]} />
));

stories.add('empty baseline', () => (
  <StandaloneApp jobs={EMPTY_BASELINE} />
));

stories.add('multiple baselines', () => (
  <StandaloneApp jobs={MULTIPLE_JOBS} />
));

stories.add('empty', () => (
  <StandaloneApp />
));
