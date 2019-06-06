/**
 * The localisation context controls the text language throughout the site.
 * @module [{contexts}localisation]
 * @default localisation.en
 * @example import { LocalisationContext, localisation } from 'context/localisation';
 */
import React from "react";

const shared = {
  copyright: '© Apkallu Falls',
  footerLinks: '⟶ {a0} · {a1} · {a2} · {a3} · {a4}'
}

/**
 * The `localisation` object contains localised strings.
 */
export const localisation = {
  en: {
    shared,
    common: {
      achievements: 'Achievements',
      chocoboBarding: 'Chocobo Barding',
      clickForHelp: 'Click for help',
      close: 'Close',
      discordServer: 'Discord server',
      donate: 'Donate',
      emotes: 'Emotes',
      minions: 'Minions',
      mounts: 'Mounts',
      orchestrionRolls: 'Orchestrion Rolls',
      patreonBlog: 'Patreon blog',
      promotional: 'Promotional',
      titles: 'Titles',
      unavailable: 'Unavailable'
    },
    info: {
      fetchingList: 'Fetching {0} list...'
    },
    components: {
      language: {
        change: 'Change language'
      },
      progress: {
        nOfN2: '{n0} of {n1}'
      }
    },
    content: {
      caitSithDoll: 'Cait Sith Doll'
    },
    pages: {
      home: {
        heading: 'Welcome to Apkallu Falls',
        about: 'Apkallu Falls is a character content tracking website which by default hides anything which is unobtainable, time-limited or promotional. It also provides details of how to obtain everything it tracks.',
        whatIsHidden: 'What is hidden?',
        aboutExtra: 'For website-specific updates and notices, keep an eye on our {a0}, join our {a1} or click on the button below to follow us on Twitter!',
        whatIsHiddenPopup: {
          heading: 'What content does Apkallu Falls hide?',
          intro: 'By default, Apkallu Falls hides any content which is unobtainable, time-limited or promotional. This is split into two categories, {i0} and {i1}, and includes:',
          li1: 'In-game events',
          li2: 'The Feast season rewards',
          li3: 'Marketing campaigns and fan festivals',
          li4: 'Lodestone contest rewards',
          li5: 'Mog Station and Square Enix Store purchases',
          li6: 'Disused Legacy (1.0) content',
          li7: 'Starting city achievements',
          outro: 'This content is still accessible, take the {a0} for example, it just doesn\'t display within the content lists without first applying a filter, nor does this hidden content count towards character progress displayed in the sidebar when tracking a character.'
        }
      }
    },
    obtainMethods: {
      achievementShort: 'Achievement',
      craftShort: 'Craft',
      gatherShort: 'Gather',

      // Shops
      gilShopShort: 'Gil shop',
      specialShopShort: 'Special shop',

      // Quests
      eventQuestShort: 'Event quest',
      msqShort: 'MSQ',
      questShort: 'Quest'
    }
  }
};

/**
 * `localeInject` injects arguments into a given string.
 * @param {string} string - The base string to apply injection to.
 * @param  {...any} args - The content to inject into the base string.
 * @prop {string} \{0\} - Zero-indexed argument replacement position within string.
 * @prop {string} \{a0\} - Converts match to a hyperlink, provided passed-in arg is an object containing usual hyperlink properties.
 * @prop {string} \{i0\} - Wraps match in `<strong>` tags.
 * @prop {string} \{n0\} - Converts match to number and executes `toLocaleString` on it.
 * @example localeInject('The {0} is {1}', 'minion ID', 40)
 */
export const localeInject = (string, ...args) => {
  if (!args.length)
    return console.warn(`localeInject called with no args on string "${string}"`);

  console.info(string, [args]);

  return string.replace(/{([a-z]+)?(\d+)}/g, (match, important, group) => {
    const arg = args[group];

    if (arg === '')
      return '';

    switch (important) {
      case 'a': {
        if (!arg || typeof arg !== 'object')
          return console.warn(`Expected object to be passed to {aN}, instead found ${arg} for "${string}".`);
        const elem = document.createElement('a');
        Object.keys(arg).forEach(prop => elem[prop] = arg[prop]);
        return elem.outerHTML;
      };

      case 'i':
        return `<strong>${arg}</strong>`;

      case 'n':
        return Number(arg).toLocaleString()
    }

    return arg || '';
  })
}

/**
 * `LocalisationContext` is the context API for localisation.
 */
export const LocalisationContext = React.createContext(
  localisation.en
);