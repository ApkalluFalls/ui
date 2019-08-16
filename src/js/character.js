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
   * Get Character data from XIVAPI.
   */
  async getData() {
    if (!this.id) {
      throw new Error('Cannot call getData without an ID being specified.');
    }

    const characterInfo = await fetch(
      `https://xivapi.com/character/${this.id}?data=FC&columns=Character.Avatar,Character.Bio,Character.DC,Character.ID,Character.Name,Character.Server,FreeCompany.Name,FreeCompany.Crest,FreeCompany.Tag&af=${+new Date()}`
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

    const {
      Character,
      FreeCompany
    } = characterInfo;

    const response = {
      ...this.parseRawCharacterData(Character),
      bio: Character.Bio,
      claimed: !!this.timeClaimed,
      dc: Character.DC,
      world: Character.Server
    }

    if (FreeCompany) {
      response.freeCompany = {
        crestParts: FreeCompany.Crest,
        name: FreeCompany.Name,
        tag: FreeCompany.Tag
      }
    }

    return response;
  }

  /**
   * Normalise the raw Character object returned by XIVAPI.
   * @param {Object} character - A Character object as returned by XIVAPI.
   */
  parseRawCharacterData(character) {
    const nameParts = character.Name.split(' ');

    return {
      avatar: character.Avatar,
      forename: nameParts[0],
      id: character.ID,
      name: character.Name,
      surname: nameParts[1]
    }
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

    return response.Results.map(this.parseRawCharacterData);
  }
}