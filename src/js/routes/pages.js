/**
 * This maps routes to a given page component for use within the `<Container />` component.
 * @module [{js/routes}pages]
 */
import Home from "../../components/pages/Home";

const routes = {
  '/': {
    component: Home
  }
};

export default routes;