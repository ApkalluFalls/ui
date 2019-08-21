import React, { useContext } from 'react';
import { withRouter } from 'react-router';
import List from 'components/data/List';

function ListPage({
  source
}) {
  return (
    <List source={source} />
  )
}

export default withRouter(ListPage);