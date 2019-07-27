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
      barding: 'Chocobo Barding',
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
    actions: {
      changeCharacter: 'Change character',
      iconsMode: 'Icons mode',
      listMode: 'List mode',
      selectACharacter: 'Select a character to track'
    },
    labels: {
      darkMode: 'Dark mode'
    },
    info: {
      fetchingList: 'Fetching {0} list...',
      noKnownObtainMethod: 'Oops! Tweet us at @ApkalluFalls if you know how to obtain this.',
      reloadsPage: 'reloads page'
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
        aboutExtra: 'For website-specific updates and notices, keep an eye on our {a0}, join our {a1} or click on the button below to follow us on Twitter!',
        whatIsHidden: {
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
        },
        title: 'Home'
      },
      barding: {
        title: 'Chocobo Barding'
      },
      emotes: {
        title: 'Emotes'
      },
      minions: {
        title: 'Minions'
      },
      mounts: {
        title: 'Mounts'
      },
      orchestrion: {
        title: 'Orchestrion Rolls'
      }
    },
    obtainMethods: {
      // Achievements
      achievement: 'Unlock the {i0} achievement',

      // Crafting and gathering
      craft: 'Crafted by a level {n0} {i1} {2}',
      gather: 'Gathered from a level {n0} {i1} node {2}',

      // FATEs
      fate: 'Achieve gold in the level {0} FATE {i1} in {2} (x: {3}, y: {4})',
      instancedFATE: 'Achieve gold in the level {0} FATE {i1} within {2}',

      // Shops
      gilAfterFate: 'Purchase for {n0} {i1} from {2} after completing the level {3} FATE {i4} in {5} (x: {6}, y: {7})',
      gilShop: 'Purchase for {n0} {i1} from {2} in {3} (x: {4}, y: {5})',
      specialShop: 'Exchange for {n0} {i1} from {2} in {3} (x: {4}, y: {5})',

      // Quests
      eventQuest: 'Complete the level {n0} event quest {i1}',
      msq: 'Complete the level {n0} main scenario quest {i1}',
      quest: 'Complete the level {n0} quest {i1} ({2})',
      questInstant: 'Automatically unlocked after completing the level {n0} quest {i1} ({2})',

      // Misc
      collectorsEdition: 'Purchase the Collectors Edition of {i0}',
      byDefault: 'Available by default',
      fanFest: 'Attend the {i0} {i1} Fan Festival',
      fanFestStream: 'Purchase access to the {i0} {i1} Fan Festival live stream',
      generic: '{0}',
      instance: 'Awarded randomly from {i1}',
      itemExchange: 'Randomly awarded when exchanging 1 {i0} with {1} in {2} (x: {3}, y: {4})',
      legacyLevelGoal: 'Awarded for reaching level {i0} during {1}',
      legacyStatus: 'Awarded for having at least {i0} cumulative days of subscription within the last {1} months of {2}',
      mogStation: 'Purchase from the Mog Station',
      promo: 'Promotion: "{i0}"',
      recruitAFriend: 'Have a friend subscribe for at least {i0} days during the Recruit A Friend campaign',
      treasureHunt: 'Randomly awarded from {i0}',
      venture: 'Randomly awarded from the level {0} {i1} retainer venture'
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
export const LocalisationContext = React.createContext({
  lang: 'en',
  locale: localisation.en
});