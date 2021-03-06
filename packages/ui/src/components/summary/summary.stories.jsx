import React from 'react';
import { storiesOf } from '@storybook/react';
import { createJobs } from '@bundle-stats/utils';

import baselineData from '../../../__mocks__/webpack-stats.baseline.json';
import currentData from '../../../__mocks__/webpack-stats.current.json';
import { getWrapperDecorator } from '../../stories';
import { Summary } from '.';

const MULTIPLE_JOBS = createJobs([{ webpack: currentData }, { webpack: baselineData }]);

const SINGLE_JOB = createJobs([{ webpack: currentData }]);

const stories = storiesOf('Components/Summary', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => <Summary data={MULTIPLE_JOBS[0].summary} />);

stories.add('loading', () => <Summary loading />);

stories.add('single run', () => (
  <Summary data={SINGLE_JOB[0].summary} showSummaryItemDelta={false} />
));

stories.add('with link', () => (
  <Summary
    data={MULTIPLE_JOBS[0].summary}
    SummaryItemWrapper={({ keyProps, ...props }) => (
      <button type="button" {...props} onClick={() => alert(JSON.stringify(keyProps))} />
    )}
  />
));
