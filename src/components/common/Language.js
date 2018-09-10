/**
 * The `<Language />` component displays language selection controls.
 * @module [{components/common}Language]
 * @example <Language />
 */
import React from "react";
import { LocalisationContext } from 'contexts/localisation';
import AFComponent from "components/AFComponent";

import style from "styles/common/Language";

const languages = [{
  locale: 'en',
  url: 'https://apkallufalls.com'
}, {
  locale: 'de',
  url: 'https://de.apkallufalls.com'
}, {
  locale: 'fr',
  url: 'https://fr.apkallufalls.com'
}, {
  locale: 'ja',
  url: 'https://ja.apkallufalls.com'
}, {
  locale: 'cn'
}, {
  locale: 'ko'
}];

const Language = ({ classes, locale }) => (
  <article className={classes.language}>
    <LocalisationContext.Consumer>
      {activeLocale => languages.map(language => (
        <a
          key={language.locale}
          className={
            `${
              classes.link
            } ${
              classes[language.locale]
            } ${
              language.locale === activeLocale ? classes.active : ''
            } ${
              language.url ? '' : classes.disabled
            }`
          }
          href={language.url}
          title={locale.components.language.change}
        />
      ))}
    </LocalisationContext.Consumer>
  </article>
);

export default (props) => (
  <AFComponent style={style} {...props}>
    <Language />
  </AFComponent>
);