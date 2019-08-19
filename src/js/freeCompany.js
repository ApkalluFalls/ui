import { parseRawCharacterData} from 'js/character';

/**
 * @class FreeCompany
 */
export default class Character {
  /**
   * This class allows for the easy fetching of known free company data.
   * @param {Number} id - Raw free company data.
   */
  constructor(id) {
    if (!id) {
      throw new Error('FreeCompany constructor expects an ID but was passed none.');
    }

    this.id = id;
  }

  /**
   * Get Free Company data from XIVAPI or returned cached data.
   * This function caches retrieved data within session storage with an expiry of 6 hours.
   * @param {Boolean} [bypassCache] - If true this will ignore cached data and pull fresh data from the API.
   */
  async getData(bypassCache) {
    if (!this.id) {
      throw new Error('Cannot call getData without an ID being specified.');
    }

    const cacheKey = `free-company/${this.id}`;
    const fromCache = JSON.parse(sessionStorage.getItem(cacheKey));

    if (!bypassCache && fromCache && fromCache.cacheExpires > Number(new Date())) {
      return fromCache;
    }

    const freeCompanyInfo = await fetch(
      `https://xivapi.com/freecompany/${this.id}?data=FCM&columns=FreeCompany.Crest,FreeCompany.DC,FreeCompany.Estate,FreeCompany.Focus,FreeCompany.Formed,FreeCompany.Name,FreeCompany.Ranking,FreeCompany.Reputation,FreeCompany.Server,FreeCompany.Slogan,FreeCompany.Tag,FreeCompanyMembers&af=${+new Date()}`
    )
      .then(response => response.json())
      .catch((error) => {
        console.error(error);
        return {
          error: true
        }
      });

    if (freeCompanyInfo.error) {
      return freeCompanyInfo;
    }

    // If an exception was thrown with a status of 200, pass that back to the callee.
    if (freeCompanyInfo.Ex) {
      return {
        error: true,
        errorCode: freeCompanyInfo.ExCode
      };
    }

    console.info(freeCompanyInfo);

    const {
      FreeCompany,
      FreeCompanyMembers
    } = freeCompanyInfo;

    const response = {
      cacheExpires: Number(new Date()) + 21600000,
      crest: FreeCompany.Crest,
      dc: FreeCompany.DC,
      formed: Number(`${FreeCompany.Formed}000`),
      id: this.id,
      name: FreeCompany.Name,
      slogan: FreeCompany.Slogan,
      tag: FreeCompany.Tag,
      world: FreeCompany.Server
    }

    const { Estate } = FreeCompany;
    if (Estate && Estate.Plot) {
      response.estate = {
        name: Estate.Name,
        plot: Estate.Plot
      }
    }

    /**
     * Convert the members array into an array separated by member rank.
     */
    if (Array.isArray(FreeCompanyMembers) && FreeCompanyMembers.length) {
      const memberRanks = [];
  
      FreeCompanyMembers.forEach(member => {
        const {
          RankIcon: icon,
          Rank: name
        } = member;

        if (memberRanks.find(rank => rank.name === name && rank.icon === icon)) {
          return;
        }

        memberRanks.push({
          icon,
          name
        });
      });

      response.memberRanks = memberRanks.map(rank => ({
        icon: rank.icon,
        members: FreeCompanyMembers.filter((
          member => member.Rank === rank.name && member.RankIcon === rank.icon
        )).map(parseRawCharacterData),
        name: rank.name
      }))
    }

    sessionStorage.setItem(cacheKey, JSON.stringify(response));

    return response;
  }
}