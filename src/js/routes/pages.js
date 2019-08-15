/**
 * This maps routes to a given page component for use within the `<Container />` component.
 * @module [{js/routes}pages]
 */
import Account from "pages/Account";
import Authentication from "pages/Authentication";
import CharacterSearch from "pages/CharacterSearch";
import Error404 from "pages/Error404";
import Home from "pages/Home";
import List from "pages/List";

import { paths } from '../routes';

const routes = {
  // 404
  notFound: {
    component: Error404
  },

  // Core pages
  [paths.home]: {
    component: Home
  },
  [paths.account]: {
    component: Account
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
  },

  // Character pages
  [paths.characterSearch]: {
    component: CharacterSearch
  },
};

export default routes;