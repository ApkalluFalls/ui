/**
 * The `<Panel />` component displays a panel (box) on the page for content to sit within.
 * @module [{components/common}Panel]
 * @prop {Component} props.children - Content to be rendered within the panel.
 * @example <Panel>Foobar</Panel>
 */
import React from "react";
import AFComponent from "components/AFComponent";

import style from "styles/common/Panel";

const Panel = ({
  classes,
  children
}) => (
  <article className={classes.panel}>
    {children}
  </article>
);

export default (props) => (
  <AFComponent style={style} {...props}>
    <Panel>
      {props.children}
    </Panel>
  </AFComponent>
)