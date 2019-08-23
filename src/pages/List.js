import React, { useContext } from 'react';
import { LocalisationContext } from 'contexts/localisation';
import { withRouter } from 'react-router';
import List from 'components/data/List';

function ListPage({ source }) {
  const { locale } = useContext(LocalisationContext);

  return (
    <React.Fragment>
      <h1>{locale.common[source]}</h1>
      <List source={source} />
    </React.Fragment>
  )
}

export default withRouter(ListPage);