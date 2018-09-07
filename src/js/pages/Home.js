import React from "react";
import AFComponent from "js/AFComponent";

import style from "styles/pages/Home";

const Home = ({ classes, locale }) => (
  <section className={classes.page}>
    <h2 className={classes.heading}>
      {locale.pages.home.heading}
    </h2>
    <p>{locale.pages.home.about}</p>
  </section>
);

export default () => (
  <AFComponent style={style}>
    <Home />
  </AFComponent>
);