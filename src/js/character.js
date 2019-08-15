/**
 * @class Character
 */
export default class Character {
  constructor({
    '@': timeClaimed,
    id,
    main: isActive
  }) {
    this.id = id;
    this.isActive = isActive;
    this.timeClaimed = timeClaimed;
  }

  async getData() {
    const characterInfo = await fetch(
      `https://xivapi.com/character/${this.id}?data=FC&columns=Character.Avatar,Character.Bio,Character.DC,Character.Name,Character.Server,FreeCompany.Name,FreeCompany.Crest,FreeCompany.Tag&af=${+new Date()}`
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

    const nameParts = Character.Name.split(' ');

    const response = {
      avatar: Character.Avatar,
      bio: Character.Bio,
      claimed: !!this.timeClaimed,
      dc: Character.DC,
      forename: nameParts[0],
      id: this.id,
      name: Character.Name,
      surname: nameParts[1],
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
}