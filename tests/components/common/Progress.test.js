import React from "react";
import renderer from "react-test-renderer";

import { LocalisationContext, localisation, localeInject } from 'contexts/localisation';

import { TestComponent } from "components/common/Progress";
import classes from "styles/common/Progress";

test('Percentage is accurately calculated', () => {
  const component = renderer.create(
    <LocalisationContext.Consumer>
      {locale => (
        <TestComponent
          locale={localisation[locale]}
          localeInject={localeInject}
          classes={classes}
          caption="Test"
          value="5"
          total="15"
        />
      )}
    </LocalisationContext.Consumer>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})