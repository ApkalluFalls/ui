import React, { useEffect, useState } from 'react';
import List from 'components/data/List';

// Theme.
import injectSheet from 'react-jss';
import style from 'styles/Container';

function Container({
  classes
}) {
  return (
    <section className={classes.container}>
      <List source="minions" />
    </section>
  );
}

export default injectSheet(style)(Container);