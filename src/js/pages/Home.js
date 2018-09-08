/**
 * The `<Home />` page component controls https://apkallufalls.com (route: `'/'`).
 * @module [{js/pages}Home]
 */
import React from "react";
import AFComponent from "js/AFComponent";

import style from "styles/pages/Home";

// Components.
import Panel from "js/components/Panel";

const Home = ({ classes, locale, localeInject }) => (
  <section className={classes.page}>
    <h2 className={classes.heading}>
      {locale.pages.home.heading}
    </h2>
    <p>{locale.pages.home.about}</p>
    <p dangerouslySetInnerHTML={{
      __html: localeInject(
        locale.pages.home.aboutExtra,
        {
          href: 'https://patreon.com/apkallufalls/posts',
          innerText: locale.common.patreonBlog,
          rel: 'noopener noreferrer',
          target: '_blank'
        },
        {
          href: 'https://discord.gg/VZ9BhKy',
          innerText: locale.common.discordServer,
          rel: 'noopener noreferrer',
          target: '_blank'
        }
      )
    }} />
    <Panel>Foobar</Panel>
  </section>
);

export default () => (
  <AFComponent style={style}>
    <Home />
  </AFComponent>
);