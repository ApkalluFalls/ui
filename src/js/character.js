/**
 * @class Character
 */
export default class Character {
  /**
   * Construct the Character class.
   * This instantiates the Character class with a character ID.
   * 
   * @param {number} characterId - the ID of the character to instantiate.
   * 
   * @returns {Character} - Returns the instantiated Character class.
   */
  constructor(characterId, isActive = true) {
    if (!characterId || typeof characterId !== 'number') {
      throw new Error('Character class instantiated with non-number value: ' + characterId);
    }

    this.id = characterId;
    this.recentlyUpdated = false;
    this.data = fetchData.call(this);

    if (isActive) {
      window.character = this;
      localStorage && localStorage.setItem('active', this.id);

      if (typeof window.config.reloadProfile === 'function')
        window.config.reloadProfile();
    }
  }

  /**
   * Get cached character data.
   * This returns data stored for the character within the user's browser
   * localStorage.
   * 
   * @returns {Object} - Character data stored in cache.
   */
  get cache() {
    return localStorage && JSON.parse(localStorage.getItem('character.' + this.id)) || null;
  }

  /**
   * Get the character's basic info.
   * This function returns the character's avatar, name, server and title.
   * 
   * @returns {Object} - Returns the character's basic info.
   */
  async info() {
    const { info } = await this.data;
    return info;
  }

  /**
   * Get the character's Lodestone privacy state.
   * This function returns whether the character's data can be synchronised through XIVAPI.
   * 
   * @returns {boolean} - Returns the character's achievement privacy state.
   */
  async isPrivate() {
    const { isPrivate } = await this.data;
    return isPrivate;
  }

  /**
   * Get the character's obtained achievement data.
   * This function returns the character's obtained achievements.
   * 
   * @returns {Array} Returns the character's obtained achievements.
   */
  async achievements() {
    const { achievements } = await this.data;
    return achievements;
  }

  /**
   * Get the character's obtained minion data.
   * This function returns the character's obtained minions.
   * 
   * @returns {Array} - Returns the character's obtained minions.
   */
  async minions() {
    const { minions } = await this.data;
    return minions;
  }

  /**
   * Get the character's obtained mount data.
   * This function returns the character's obtained mounts.
   * 
   * @returns {Array} - Returns the character's obtained mounts.
   */
  async mounts() {
    const { mounts } = await this.data;
    return mounts;
  }

  /**
   * PLACEHOLDER.
   * This function is in place for future use. Without it, list page breaks.
   * 
   * @returns {Array} - PLACEHOLDER.
   */
  async barding() {
    return [];
  }

  /**
   * PLACEHOLDER.
   * This function is in place for future use. Without it, list page breaks.
   * 
   * @returns {Array} - PLACEHOLDER.
   */
  async emotes() {
    return [];
  }

  /**
   * PLACEHOLDER.
   * This function is in place for future use. Without it, list page breaks.
   * 
   * @returns {Array} - PLACEHOLDER.
   */
  async orchestrionRolls() {
    return [];
  }

  /**
   * Get the character's total obtained counts.
   * This function returns the character's obtained totals.
   * 
   * @returns {Object} - Returns the character's obtained totals.
   */
  async counts() {
    const { counts } = await this.data;
    return counts;
  }

  /**
   * Get the character's achievement statistics.
   * 
   * @returns {Object} - Returns the character's achievement statistics.
   */
  async achievementStats() {
    const { achievements } = await this.data;

    if (!achievements || !achievements.length)
      return null;
    
    const achievementsList = await window.api.json('achievements', false, 'v3');

    const response = {};

    // First.
    const first = achievements[0];
    response.first = {
      obtained: first.date,
      data: achievementsList.data.filter(o => o.id === first.id)[0]
    };

    // Last.
    const last = achievements[achievements.length - 1];
    response.last = {
      obtained: last.date,
      data: achievementsList.data.filter(o => o.id === last.id)[0]
    };

    return response;
  }

  /**
   * Get the character's Tracked state on Apkallu Falls.
   * This function returns whether the character is being tracked.
   * 
   * @returns {boolean} - Returns the character's tracked state.
   */
  isTracked() {
    if (!localStorage)
      return true;
    
    const tracked = JSON.parse(localStorage.getItem('tracked'));

    return !!(tracked && tracked.filter(t => t.id === this.id)[0]);
  }

  /**
   * Add this character to the tracked characters list.
   * This stores the character ID in the tracked characters object within localStorage.
   * 
   * @returns {boolean} - Always returns true when complete.
   */
  async track() {
    if (this.isTracked())
      return true;
    
    let tracked = JSON.parse(localStorage.getItem('tracked'));

    if (!tracked)
      tracked = [];

    const info = await this.info();

    tracked.push({
      id: this.id,
      img: info.avatar,
      name: info.name,
      world: info.server
    })

    localStorage.setItem('tracked', JSON.stringify(tracked));
    return true;
  }
}

/**
 * Get character data from the XIVAPI API.
 * This function checks XIVAPI's cache, then either returns a fresh set of data
 * from XIVAPI's API or returns the cached data from localStorage.
 */
async function fetchData() {
  const { id } = this;
  const { xivapiDate } = window.config;

  if (window.config.offline || (this.cache && this.recentlyUpdated)) {
    return this.cache;
  }

  this.recentlyUpdated = true;

  if (this.cache && this.cache.info && this.cache.info.fc) {
    const lastUpdated = this.cache.xivapiLastUpdated;

    const xivapiCache = await new Promise(
      (resolve) => fetch(
        `https://xivapi.com/character/${id}?data=AC&columns=Info.Achievements.Updated,Info.Character.State,Info.Character.Updated&key=f5e2c6eac7604e07b2cd&af=${+new Date()}`
      )
        .then(response => response.json())
        .then(resolve)
        .catch(window.config.handleXIVAPIError)
    );

    if (xivapiCache.Info.Character.State === 2
      && Number(`${xivapiCache.Info.Character.Updated}000`) <= lastUpdated
      && Number(`${xivapiCache.Info.Achievements.Updated}000`) <= lastUpdated)
      return this.cache;
  }

  const characterData = await new Promise(
    (resolve) => fetch(
      `https://xivapi.com/character/${id}?data=AC,FC&columns=Achievements.List,Character.Avatar,Character.ClassJobs,Character.Gender,Character.Minions,Character.Mounts,Character.Name,Character.Server,Character.Title,FreeCompany.Crest,FreeCompany.ID,FreeCompany.Name,FreeCompany.Tag,Info.Achievements.State,Info.Achievements.Updated,Info.Character.State,Info.Character.Updated,Info.FreeCompany.State,Info.FreeCompany.Updated&key=f5e2c6eac7604e07b2cd&af=${+new Date()}`
    )
      .then(response => response.json())
      .then(resolve)
      .catch(window.config.handleXIVAPIError)
  );

  switch (+characterData.Info.Character.State) {
    case 1:
      return {
        state: 'new'
      };

    case 2:
      // Found.
      break;

    case 3:
      return {
        state: 'not-found'
      };

    case 4:
      return {
        state: 'blacklisted'
      };
    
    default:
      return {
        state: +characterData.State
      }
  }
  
  const response = {
    info: {
      avatar: characterData.Character.Avatar,
      gender: characterData.Character.Gender === 2 ? 'female' : 'male',
      name: characterData.Character.Name,
      server: characterData.Character.Server,
      title: characterData.Character.Title
    }
  }

  if (characterData.FreeCompany.ID && characterData.Info.FreeCompany.State === 2)
    response.info.fc = {
      id: characterData.FreeCompany.ID,
      name: characterData.FreeCompany.Name,
      tag: characterData.FreeCompany.Tag
    }

  let achievements;

  if (characterData.Info.Achievements.State !== 2) {
    response.isPrivate = true;
    achievements = [];
  } else {
    achievements = characterData.Achievements.List;
  }

  if (!(achievements instanceof Array))
    achievements = [];

  const achievementsLastChanged = +xivapiDate(characterData.Info.Achievements.Updated);
  const dataLastChanged = +xivapiDate(characterData.Info.Character.Updated);

  response.xivapiLastUpdated = achievementsLastChanged > dataLastChanged ? achievementsLastChanged : dataLastChanged;
  response.achievements = achievements.map(o => {
    return {
      id: o.ID,
      date: +xivapiDate(o.Date)
    }
  }).sort((a, b) => +a.date < b.date ? -1 : 1);
  response.minions = characterData.Character.Minions || [];
  response.mounts = characterData.Character.Mounts || [];

  const characterAvailableAchievements = await getCharacterAvailableAchievements.call(this, response);
  const characterClassJobs = characterData.Character.ClassJobs;

  response.counts = {
    achievements: characterAvailableAchievements.length,
    achievementPoints: characterAvailableAchievements.length && characterAvailableAchievements.map(a => a.points).reduce((a, b) => a + b),
    achievementRewards: characterAvailableAchievements.filter(a => a.reward && a.reward.item).length,
    combinedLevel: characterClassJobs && typeof characterClassJobs === 'object' ? Object.values(characterClassJobs).filter(c => c.JobID !== 28).map(c => c.Level).reduce((a,b) => a + b) : 0,
    minions: await getAvailableMinionsCount.call(this, response),
    mounts: await getAvailableMountsCount.call(this, response),
    titles: characterAvailableAchievements.filter(a => a.reward && a.reward.title).length
  }

  if (localStorage) {
    localStorage.setItem('character.' + this.id, JSON.stringify(response));
  }

  return response;
}

async function getCharacterAvailableAchievements(data) {
  const achievementList = await window.api.json('achievements', false, 'v3');

  /**
   * The city a character starts in grants the ability for that character to
   * obtain one of three different achievements. Legacy characters may obtain
   * two of these by starting in a different city in A Realm Reborn. For this
   * reason, we need to strip out two of the three.
   */
  let startCityNeedsProcessing = true;
  
  return achievementList.data.filter(o => {
    // Start city achievements. See comment above.
    if (startCityNeedsProcessing && (o.id === 310 || o.id === 311 || o.id === 312)) {
      const achievementData = data.achievements.filter(l => l.id === o.id);

      if (achievementData.length) {
        startCityNeedsProcessing = false;
        return true;
      }
    }

    if (o.unavailable)
      return false;

    const achievementData = data.achievements.filter(l => l.id === o.id);

    return achievementData.length;
  });
}

async function getAvailableCount(data, type) {
  const list = await window.api.json(type, false, 'v3');

  return data[type].filter(id => {
    const entry = list.data.filter(l => l.id === id)[0];

    if (entry && entry.hasParent)
      return false;

    if (!entry || !entry.ref)
      return true;
    
    return entry.ref.filter(r => r.available && !r.promo).length;
  }).length;
}

async function getAvailableMinionsCount(data) {
  const count = await getAvailableCount(data, 'minions');
  return count;
}

async function getAvailableMountsCount(data) {
  const count = await getAvailableCount(data, 'mounts');
  return count;
}