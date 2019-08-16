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
    links: {
      lodestone: 'https://eu.finalfantasyxiv.com/lodestone',
      lodestoneProfileEdit: 'https://eu.finalfantasyxiv.com/lodestone/my/setting/profile'
    },
    common: {
      achievements: 'Achievements',
      barding: 'Chocobo Barding',
      clickForHelp: 'Click for help',
      close: 'Close',
      connectWithPatreon: 'Connect with Patreon',
      discordServer: 'Discord server',
      donate: 'Donate',
      emotes: 'Emotes',
      european: 'European',
      japanese: 'Japanese',
      minions: 'Minions',
      mounts: 'Mounts',
      northAmerican: 'North American',
      orchestrionRolls: 'Orchestrion Rolls',
      patreonBlog: 'Patreon blog',
      promotional: 'Promotional',
      titles: 'Titles',
      unavailable: 'Unavailable'
    },
    actions: {
      changeCharacter: 'Change character',
      checkForVerificationCode: 'Check for Verification Code',
      iconsMode: 'Icons mode',
      listMode: 'List mode',
      search: 'Search',
      selectACharacter: 'Search for a character to track',
      signInOrCreateAccount: 'Sign In or Create an Account'
    },
    labels: {
      darkMode: 'Dark mode'
    },
    info: {
      copied: 'Copied to clipboard.',
      fetchingList: 'Fetching {0} list...',
      loading: 'Loading...',
      lodestoneDelay: 'Due to recent Lodestone changes, this may take a while.',
      noKnownObtainMethod: 'Oops! Tweet us at @ApkalluFalls if you know how to obtain this.',
      searching: 'Searching...',
      talkingToFirebase: 'Talking to Firebase',
      trackingRequiresSignIn: 'Manual tracking requires an Apkallu Falls account'
    },
    components: {
      language: {
        change: 'Change language'
      },
      patreonSettings: {
        about: 'If you\'re a supporter of Apkallu Falls you can connect your Patreon account below to access supporter perk settings like custom URLs and character badges for everyone else to use and see. If you\'re not already a supporter, hit the "Become a Patron" button in the bottom left of the site to find out more.' 
      },
      progress: {
        nOfN2: '{n0} of {n1}'
      },
      userCharacters: {
        loading: 'Fetching your verified characters...',
        noVerifiedCharacters: 'You have no verified characters. To verify ownership of a character, visit the profile page of the character you wish to verify and click on the "Verify Ownership" button.',
        verifyMoreCharacters: 'To verify ownership of another character, visit the profile page of the character you wish to verify and click on the "Verify Ownership" button.'
      }
    },
    content: {
      caitSithDoll: 'Cait Sith Doll'
    },
    pages: {
      error404: {
        heading: 'Page Not Found',
        about: 'The page you were looking for could not be found.'
      },
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
      account: {
        heading: 'My Account',
        about: 'On this page you can claim ownership of your characters and modify site-related settings.',
        title: 'Account',
        signOut: 'Sign out',
        yourCharacters: 'Your characters',

        settings: {
          lookAndFeel: {
            heading: 'Look and Feel Settings',
            help: 'With these settings you can change the way the site displays.'
          },
          manualTracking: {
            heading: 'Manually-tracked content',
            help: 'Here you can toggle which pieces of content you wish to enable manual tracking for. Disabled content will still appear in the sidebar as usual, but progress bars and checkboxes related to the content will no longer be displayed. Disabling these will not reset any of the entries you have already checked off for your characters.',
            emotes: 'Emotes'
          },
          temporaryOrOldContent: {
            heading: 'Reveal hidden content',
            help: 'Apkallu Falls by default hides anything which isn\'t actively available in the game. Overriding these settings will increase the total counts for each piece of content which is affected and will apply to all characters you track, not only the ones you\'ve claimed ownership of.'
          }
        }
      },
      authentication: {
        heading: 'Log in or Create an Account',
        about: 'Creating an account will allow you to manually track content which isn\'t exposed by the Lodestone like Emotes and Orchestrion Rolls. It also allows you to claim ownership of your character(s), allowing you to switch between devices without having to search for your character multiple times.',
        title: 'Sign in',
        alternativeMethods: 'Alternatively, you can connect to Apkallu Falls with any of these other services:',
        emailAddress: 'Email address',
        emailAddressInvalid: 'The email address you have provided is not valid.',
        emailResetSent: 'An email with steps on how to reset your password has been sent to the provided email address.',
        password: 'Password',
        passwordMismatch: 'The passwords you have entered do not match.',
        passwordTooShort: 'Your password must have at least 8 characters.',
        confirmPassword: 'Confirm password',
        createAccount: 'Create account',
        forgottenPassword: 'I\'ve forgotten my password...',
        signIn: 'Sign in',

        // Validation errors.
        authenticationPopupClosed: 'The authentication popup was closed unexpectedly. Please try again.',
        incorrectLoginDetails: 'The login details you have provided are incorrect. Please try again.',
        unhandledFirebaseError: 'An unknown Firebase error occurred.'
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
      },
      character: {
        accountRequired: 'You\'ll need to sign in or create an Apkallu Falls account before you can begin the character verification process.',
        communicatingWithXIVAPI: 'Communicating with XIVAPI...',
        fetchingCharacterAchievements: 'Fetching character achievements...',
        howToVerifyOwnership: 'To verify that this character is yours, please follow the below steps:',
        lodestoneBio: 'Lodestone bio',
        lodestoneEditProfile: 'Navigate to your character\'s profile page, scroll down and click to edit your bio (Character Profile).',
        lodestoneSignIn: 'Sign in to your account on the official Final Fantasy XIV website.',
        lodestoneVerificationCode: 'Copy the unique code below anywhere into the edit box and click Confirm twice to save it.',
        setActive: 'Set Active',
        signedOutNotice: 'If you have an Apkallu Falls account you can then verify ownership of the character and start manually checking off the content you\'ve unlocked.',
        verifyOwnership: 'Verify ownership',
        whyVerifyOwnership: 'If this is your character you can verify ownership of it and unlock all of Apkallu Falls tracking abilities.'
      },
      characterSearch: {
        heading: 'Search for a Character',
        about: 'Searching for a character will allow you to see tracking data and statistics associated with them.',
        title: 'Character Search',
        enterCharacterName: 'What is the character\'s name?',
        noCharactersFound: 'No characters were be found.',
        placeholderCharacterName: 'Tequila Mockingbird',
        searchByServer: 'Search by server',
        selectADataCenterFirst: 'Server selection will appear here after first selecting a data center from the choices above.',
        selectDataCenter: 'Which data center is the character on?',
        selectServer: 'Which server is the character on?'
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