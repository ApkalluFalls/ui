/**
 * This contains page routes for the entire application.
 * @module [{js}routes]
 */
export const paths = {
  // Core pages.
  home: '/',
  authentication: '/sign-in',

  // Character pages.
  character: characterId => `/character/${characterId}`,
  characterSelect: '/character-select',

  // Content lists.
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
  path: paths.character
}, {
  path: paths.characterSelect,
  exact: true
}];