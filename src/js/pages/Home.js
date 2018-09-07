/**
 * The `<Home />` page component controls https://apkallufalls.com (route: `'/'`).
 * @module [{js/pages}Home]
 */
import React from "react";
import AFComponent from "js/AFComponent";

import style from "styles/pages/Home";

// Components.
import Progress from "js/components/Progress";

const Home = ({ classes, locale }) => (
  <section className={classes.page}>
    <h2 className={classes.heading}>
      {locale.pages.home.heading}
    </h2>
    <p>{locale.pages.home.about}</p>
    <Progress
      caption={locale.common.achievements}
      total="2109"
      value="266"
    />
  </section>
);

export default () => (
  <AFComponent style={style}>
    <Home />
  </AFComponent>
);