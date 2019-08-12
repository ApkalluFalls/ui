/**
 * This maps routes to a given page component for use within the `<Container />` component.
 * @module [{js/routes}pages]
 */
import Authentication from "pages/Authentication";
import Home from "pages/Home";
import List from "pages/List";

import { paths } from '../routes';

const routes = {
  // Core pages
  [paths.home]: {
    component: Home
  },
  [paths.authentication]: {
    component: Authentication
  },

  // Content lists
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
  },
  [paths.orchestrion]: {
    component: List
  }
};

export default routes;