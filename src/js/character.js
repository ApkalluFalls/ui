/**
 * @class Character
 */
export default class Character {
  /**
   * This class allows for the easy fetching of known character data and searching of new characters.
   * @param {Object} - Raw character data.
   * @param {Object} [searchParams] - A search query object. 
   */
  constructor({
    '@': timeClaimed,
    id,
    main: isActive
  }, searchParams) {
    this.id = id;
    this.isActive = isActive;
    this.timeClaimed = timeClaimed;

    // Search params.
    this.searchParams = searchParams;
  }

  /**
   * Get Character achievement data from XIVAPI or returned cached data.
   * This function caches retrieved data within session storage with an expiry of 24 hours.
   * @param {Boolean} [bypassCache] - If true this will ignore cached data and pull fresh data from the API.
   */
  async getAchievements(bypassCache) {
    if (!this.id) {
      throw new Error('Cannot call getAchievements without an ID being specified.');
    }

    const cacheKey = `character/${this.id}/achievements`;
    const fromCache = JSON.parse(sessionStorage.getItem(cacheKey));

    if (!bypassCache && fromCache && fromCache.cacheExpires > Number(new Date())) {
      return fromCache;
    }

    const characterAchievements = await fetch(
      `https://xivapi.com/character/${this.id}?data=AC&columns=Achievements,AchievementsPublic&af=${+new Date()}`
    )
      .then(response => response.json())
      .catch((error) => {
        console.error(error);
        return {
          error: true
        }
      });

    if (characterAchievements.error) {
      return characterAchievements;
    }

    // Return if the character's achievements are not public.
    if (!characterAchievements.AchievementsPublic) {
      const responseIfPrivate = {
        cacheExpires: Number(new Date()) + 86400000,
        isPrivate: true
      }

      sessionStorage.setItem(cacheKey, JSON.stringify(responseIfPrivate));
  
      return responseIfPrivate;
    }

    const {
      List
    } = characterAchievements.Achievements;

    const response = {
      cacheExpires: Number(new Date()) + 86400000,
      list: List.map(achievement => ({
        date: achievement.Date,
        id: achievement.ID
      }))
    }

    sessionStorage.setItem(cacheKey, JSON.stringify(response));

    return response;
  }

  /**
   * Get Character data from XIVAPI or returned cached data.
   * This function caches retrieved data within session storage with an expiry of 24 hours.
   * @param {Boolean} [bypassCache] - If true this will ignore cached data and pull fresh data from the API.
   */
  async getData(bypassCache) {
    if (!this.id) {
      throw new Error('Cannot call getData without an ID being specified.');
    }

    const cacheKey = `character/${this.id}`;
    const fromCache = JSON.parse(sessionStorage.getItem(cacheKey));

    if (!bypassCache && fromCache && fromCache.cacheExpires > Number(new Date())) {
      return fromCache;
    }

    const characterInfo = await fetch(
      `https://xivapi.com/character/${this.id}?data=FC&columns=Character.Avatar,Character.Bio,Character.DC,Character.ID,Character.Name,Character.Server,FreeCompany.ID,FreeCompany.Crest,FreeCompany.Name,FreeCompany.Tag&af=${+new Date()}`
    )
      .then(response => response.json())
      .catch((error) => {
        console.error(error);
        return {
          error: true
        }
      });

    if (characterInfo.error) {
      return characterInfo;
    }

    // If an exception was thrown with a status of 200, pass that back to the callee.
    if (characterInfo.Ex) {
      return {
        error: true,
        errorCode: characterInfo.ExCode
      };
    }

    const {
      Character,
      FreeCompany
    } = characterInfo;

    const response = {
      ...parseRawCharacterData(Character),
      bio: Character.Bio,
      claimed: !!this.timeClaimed,
      cacheExpires: Number(new Date()) + 86400000,
      dc: Character.DC,
      world: Character.Server
    }

    console.info(FreeCompany);

    if (FreeCompany && FreeCompany.Name) {
      response.freeCompany = {
        crestParts: FreeCompany.Crest,
        id: FreeCompany.ID,
        name: FreeCompany.Name,
        tag: FreeCompany.Tag
      }
    }

    sessionStorage.setItem(cacheKey, JSON.stringify(response));

    return response;
  }

  /**
   * Search for a Character using XIVAPI.
   */
  async search() {
    if (!this.searchParams || typeof this.searchParams !== 'object') {
      throw new Error('Attempt to search without providing search parameters.');
    }

    const {
      name,
      server
    } = this.searchParams;

    console.info(this.searchParams);

    if (!name || !server) {
      return [];
    }

    const response = await fetch(
      `https://xivapi.com/character/search?name=${name}&server=${server}&af=${+new Date()}`
    )
      .then(response => response.json())
      .catch((error) => {
        console.error(error);
        return [];
      });

    return response.Results.map(parseRawCharacterData);
  }
}

/**
 * Normalise the raw Character object returned by XIVAPI.
 * @param {Object} character - A Character object as returned by XIVAPI.
 */
export function parseRawCharacterData(character) {
  const nameParts = character.Name.split(' ');

  return {
    avatar: character.Avatar,
    forename: nameParts[0],
    id: character.ID,
    name: character.Name,
    surname: nameParts[1]
  }
}