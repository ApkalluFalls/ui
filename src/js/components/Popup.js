/**
 * The `<Popup />` component displays a control to open a popup, which when clicked reveals the popup on the page.
 * @module [{js/components}Popup]
 * @prop {Component} props.children - Content to be rendered within the popup.
 * @prop {string} props.openerCaption - Clickable text to be displayed for opening the popup. This is also used within accessibility attribute `aria-labelledby`.
 * @prop {string} props.openerDescription - Title text to be displayed when hovering over the opener. This is also used within accessibility attribute `aria-describedby`.
 * @example <Popup openerCaption="Open" openerDescription="Opens a popup">Foobar</Popup>
 */
import React from "react";
import AFComponent from "js/AFComponent";

import style from "styles/components/Popup";

const Popup = ({
  classes,
  children,
  isOpen,
  locale,
  onCloseClick,
  onOpenerClick,
  openerCaption,
  openerDescription
}) => {
  const control = (
    <span
      className={classes.opener}
      onClick={onOpenerClick}
      title={openerDescription}
    >
      <span className="fal fa-info-circle" />
      {' '}
      {openerCaption}
    </span>
  );

  if (!isOpen)
    return control;

  return (
    <React.Fragment>
      {control}
      <section
        aria-describedBy={openerDescription}
        aria-labelledby={openerCaption}
        className={classes.wrapper}
        onClick={onCloseClick}
        role="dialog"
      >
        <article className={classes.popup} onClick={(e) => e.stopPropagation()}>
          <button
            className={classes.close}
            type="button"
            onClick={onCloseClick}
          >
            <span className="fal fa-times" />
          </button>
          {children}
          <footer className={classes.footer}>
            <button
              type="button"
              onClick={onCloseClick}
            >
              {locale.common.close}
            </button>
          </footer>
        </article>
      </section>
    </React.Fragment>
  )
};

export default class extends React.Component {
  state = {
    isOpen: false
  };

  constructor() {
    super();
    this.onCloseClick = this.onCloseClick.bind(this);
    this.onOpenerClick = this.onOpenerClick.bind(this);
  }

  onCloseClick() {
    this.setState({
      isOpen: false
    })
  }

  onOpenerClick() {
    this.setState({
      isOpen: true
    })
  }

  render() {
    return (
      <AFComponent
        style={style}
        {...this.props}
        {...this.state}
        onCloseClick={this.onCloseClick}
        onOpenerClick={this.onOpenerClick}
      >
        <Popup>
          {this.props.children}
        </Popup>
      </AFComponent>
    );
  }
}