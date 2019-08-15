import React, { useContext, useState } from 'react';
import { LocalisationContext } from 'contexts/localisation';
import { ThemeContext } from 'contexts/theme';
import CharacterCard from 'components/content/CharacterCard';
import Panel from 'components/content/Panel';
import InlineLoader from 'components/content/InlineLoader';
import Character from 'js/character';

// Theme.
import { createUseStyles } from 'react-jss'
import style from 'styles/pages/CharacterSearch';

const useStyles = createUseStyles(style);

const dataCenters = [{
  region: 'Japan',
  name: 'Elemental',
  servers: [
    'Aegis', 'Atomos', 'Carbuncle', 'Garuda', 'Gungir', 'Kujata', 'Ramuh', 'Tonberry', 'Typhon',
    'Unicorn'
  ]
}, {
  region: 'Japan',
  name: 'Gaia',
  servers: [
    'Alexander', 'Bahamut', 'Durandal', 'Fenrir', 'Ifrit', 'Ridill', 'Tiamat', 'Ultima', 'Valefor',
    'Yojimbo', 'Zeromus'
  ]
}, {
  region: 'Japan',
  name: 'Mana',
  servers: [
    'Anima', 'Asura', 'Belias', 'Chocobo', 'Hades', 'Ixion', 'Mandragora', 'Masamune',
    'Pandaemonium', 'Shinryu', 'Titan'
  ]
}, {
  region: 'America',
  name: 'Aether',
  servers: [
    'Adamantoise', 'Cactuar', 'Faerie', 'Gilgamesh', 'Jenova', 'Midgardsormr', 'Sargatanas',
    'Siren'
  ]
}, {
  region: 'America',
  name: 'Primal',
  servers: [
    'Behemoth', 'Excalibur', 'Exodus', 'Famfrit', 'Hyperion', 'Lamia', 'Leviathan', 'Ultros'
  ]
}, {
  region: 'America',
  name: 'Crystal',
  servers: [
    'Balmung', 'Brynhildr', 'Coeurl', 'Diabolos', 'Goblin', 'Malboro', 'Mateus', 'Zalera'
  ]
}, {
  region: 'Europe',
  name: 'Chaos',
  servers: [
    'Cerberus', 'Louisoix', 'Moogle', 'Omega', 'Ragnarok', 'Spriggan'
  ]
}, {
  region: 'Europe',
  name: 'Light',
  servers: [
    'Lich', 'Odin', 'Phoenix', 'Shiva', 'Twintania', 'Zodiark'
  ]
}];

function CharacterSearch() {
  const classes = useStyles(useContext(ThemeContext));
  const { locale } = useContext(LocalisationContext);
  const { characterSearch: pageLocale } = locale.pages;

  const [characterName, setCharacterName] = useState('Tequila');
  const [activeDataCenter, setActiveDataCenter] = useState('Light');
  const [activeServer, setActiveServer] = useState('Zodiark');
  const [searching, setSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState([]);

  /**
   * Search for the character.
   */
  async function handleSearch() {
    setSearching(true);
    setResults([]);

    const results = await new Character({}, {
      name: characterName,
      server: activeServer
    }).search();

    setHasSearched(true);
    setResults(results);
    setSearching(false);
  }

  return (
    <React.Fragment>
      <h1>{pageLocale.heading}</h1>
      <p>{pageLocale.about}</p>
      <Panel>
        <form
          className={classes.form}
          onSubmit={handleSearch}
        >
          <section className={classes.section}>
            <p className={classes.help}>
              {pageLocale.enterCharacterName}
            </p>
            <article className={classes.buttonsWrapper}>
              <div className={classes.buttonsLabel}>
                <span className={`fas fa-user ${classes.buttonsIcon}`} />
              </div>
              <div className={classes.inputField}>
                <input
                  type="text"
                  className={classes.input}
                  placeholder={pageLocale.placeholderCharacterName}
                  disabled={searching}
                  autoFocus
                  onChange={(event) => setCharacterName(event.currentTarget.value)}
                />
              </div>
            </article>
          </section>
          <section className={classes.section}>
            <p className={classes.help}>
              {pageLocale.selectDataCenter}
            </p>
            <article className={classes.buttonsWrapper}>
              <div className={classes.buttonsLabel}>
                <span className={`fas fa-globe-asia ${classes.buttonsIcon}`} />
              </div>
              <div className={classes.buttons}>
                {dataCenters
                  .filter(dataCenter => dataCenter.region === 'Japan')
                  .map(({ name }) => (
                    <div
                      className={classes.buttonWrapper}
                      key={name}
                    >
                      <button
                        className={`${classes.button} ${activeDataCenter === name ? classes.buttonActive : ''}`}
                        type="button"
                        disabled={searching}
                        onClick={() => setActiveDataCenter(name)}
                        onKeyDown={(event) => event.which === 13 && setActiveDataCenter(name)}
                      >
                        {name}
                      </button>
                    </div>
                  ))
                }
              </div>
            </article>
            <article className={classes.buttonsWrapper}>
              <div className={classes.buttonsLabel}>
                <span className={`fas fa-globe-americas ${classes.buttonsIcon}`} />
              </div>
              <div className={classes.buttons}>
                {dataCenters
                  .filter(dataCenter => dataCenter.region === 'America')
                  .map(({ name }) => (
                    <div
                      className={classes.buttonWrapper}
                      key={name}
                    >
                      <button
                        className={`${classes.button} ${activeDataCenter === name ? classes.buttonActive : ''}`}
                        type="button"
                        disabled={searching}
                        onClick={() => setActiveDataCenter(name)}
                        onKeyDown={(event) => event.which === 13 && setActiveDataCenter(name)}
                      >
                        {name}
                      </button>
                    </div>
                  ))
                }
              </div>
            </article>
            <article className={classes.buttonsWrapper}>
              <div className={classes.buttonsLabel}>
                <span className={`fas fa-globe-europe ${classes.buttonsIcon}`} />
              </div>
              <div className={classes.buttons}>
                {dataCenters
                  .filter(dataCenter => dataCenter.region === 'Europe')
                  .map(({ name }) => (
                    <div
                      className={classes.buttonWrapper}
                      key={name}
                    >
                      <button
                        className={`${classes.button} ${activeDataCenter === name ? classes.buttonActive : ''}`}
                        type="button"
                        disabled={searching}
                        onClick={() => setActiveDataCenter(name)}
                        onKeyDown={(event) => event.which === 13 && setActiveDataCenter(name)}
                      >
                        {name}
                      </button>
                    </div>
                  ))
                }
              </div>
            </article>
          </section>
          <section className={classes.section}>
            <p className={classes.help}>
              {pageLocale.selectServer}
            </p>
            {activeDataCenter
              ? (
                <article className={classes.buttonsWrapper}>
                  <div className={classes.buttonsLabel}>
                    <span className={`fas fa-globe-stand ${classes.buttonsIcon}`} />
                  </div>
                  <div className={classes.buttons}>
                    {dataCenters
                      .find(dataCenter => dataCenter.name === activeDataCenter)
                      .servers
                      .map(server => (
                        <div
                          className={classes.buttonWrapper}
                          key={server}
                        >
                          <button
                            className={`${classes.button} ${activeServer === server ? classes.buttonActive : ''}`}
                            type="button"
                            disabled={searching}
                            onClick={() => setActiveServer(server)}
                            onKeyDown={(event) => event.which === 13 && setActiveServer(server)}
                          >
                            {server}
                          </button>
                        </div>
                      ))
                    }
                  </div>
                </article>
              ) : (
                <p className={classes.helpIndented}>
                  <span className="fal fa-info-circle" />
                  {' '}
                  {pageLocale.selectADataCenterFirst}
                </p>
              )
            }
          </section>
          <section className={classes.section}>
            <div className={classes.control}>
              <button
                className={classes.button}
                disabled={searching || !characterName || !activeDataCenter || !activeServer}
                onClick={handleSearch}
                onKeyDown={(event) => event.which === 13 && handleSearch()}
              >
                {locale.actions.search}
              </button>
            </div>
          </section>
        </form>
        <section className={`${classes.results} ${searching || (hasSearched && !results.length) ? classes.resultsSearchingOrNoMatches : ''} ${!searching && results.length ? classes.resultsWithMatches : ''}`}>
          {searching && (
            <InlineLoader text={locale.info.searching} />
          )}
          {!searching && hasSearched && (
            results.length
              ? results.map(character => (
                <CharacterCard
                  key={character.id}
                  setActiveOnClick={true}
                  {...character}
                />
              )) : (
                <p className={classes.noResultsFound}>
                  {pageLocale.noCharactersFound}
                </p>
              )
          )}
        </section>
      </Panel>
    </React.Fragment>
  )
}

export default CharacterSearch;