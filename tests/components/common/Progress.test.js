import React from "react";
import TestRenderer from 'react-test-renderer';
import { localisation, localeInject } from 'contexts/localisation';

import { TestComponent } from "components/common/Progress";

const testRenderer = TestRenderer.create(
  <TestComponent
    classes={{
      percentage: 'percentage'
    }}
    locale={localisation['en']}
    localeInject={localeInject}
    caption="Test"
    value="5"
    total="15"
  />
);

const testInstance = testRenderer.root;

test('Percentage is accurately calculated', () => {
  expect(testInstance.findByProps({className: "percentage"}).children).toEqual(['33', '%']);
})