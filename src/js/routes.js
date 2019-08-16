/**
 * This contains page routes for the entire application.
 * @module [{js}routes]
 */
export const paths = {
  // Core pages.
  home: '/',
  account: '/account',
  authentication: '/sign-in',

  // Character pages.
  character: (characterId = ':characterId') => `/character/${characterId}`,
  characterSearch: '/character-search',

  // Content lists.
  achievements: '/achievements',
  barding: '/barding',
  emotes: '/emotes',
  minions: '/minions',
  mounts: '/mounts',
  orchestrion: '/orchestrion-rolls'
};

export default [{
  path: paths.home,
  exact: true,
  source: 'home'
}, {
  path: paths.account,
  exact: true,
  source: 'account'
}, {
  path: paths.authentication,
  exact: true,
  source: 'authentication'
}, {
  path: paths.barding,
  exact: true,
  source: 'barding'
}, {
  path: paths.emotes,
  exact: true,
  source: 'emotes'
}, {
  path: paths.minions,
  exact: true,
  source: 'minions'
}, {
  path: paths.mounts,
  exact: true,
  source: 'mounts'
}, {
  path: paths.orchestrion,
  exact: true,
  source: 'orchestrion'
}, {
  path: paths.character()
}, {
  path: paths.characterSearch,
  exact: true
}];