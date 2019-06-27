/**
 * This maps routes to a given page component for use within the `<Container />` component.
 * @module [{js/routes}pages]
 */
import Home from "pages/Home";
import List from "pages/List";

import { paths } from '../routes';

const routes = {
  [paths.home]: {
    component: Home
  },
  [paths.barding]: {
    component: List
  },
  [paths.emotes]: {
    component: List
  },
  [paths.minions]: {
    component: List
  },
  [paths.mounts]: {
    component: List
  }
};

export default routes;