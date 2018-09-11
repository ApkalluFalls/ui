/**
 * The `<Home />` page component controls https://apkallufalls.com (route: `'/'`).
 * @module [{components/pages}Home]
 */
import React from "react";
import AFComponent from "components/AFComponent";

import style from "styles/pages/Home";

// Components.
import Icon from "components/common/Icon";
import Panel from "components/common/Panel";
import Progress from "components/common/Progress";
import Popup from "components/common/Popup";

const Home = ({ classes, locale, localeInject }) => (
  <section className={classes.page}>
    <h2 className={classes.heading}
    >
      {locale.pages.home.heading}
    </h2>
    <div className={classes.popupWrapper}>
      {locale.pages.home.about}
      {' '}
      <p>
      <Popup
        openerCaption={locale.pages.home.whatIsHidden}
        openerDescription={locale.common.clickForHelp}
      >
        <h1>{locale.pages.home.whatIsHiddenPopup.heading}</h1>
        <p dangerouslySetInnerHTML={{
          __html: localeInject(
            locale.pages.home.whatIsHiddenPopup.intro,
            locale.common.promotional,
            locale.common.unavailable
          )
        }} />
        <ul>
          <li>{locale.pages.home.whatIsHiddenPopup.li1}</li>
          <li>{locale.pages.home.whatIsHiddenPopup.li2}</li>
          <li>{locale.pages.home.whatIsHiddenPopup.li3}</li>
          <li>{locale.pages.home.whatIsHiddenPopup.li4}</li>
          <li>{locale.pages.home.whatIsHiddenPopup.li5}</li>
          <li>{locale.pages.home.whatIsHiddenPopup.li6}</li>
          <li>{locale.pages.home.whatIsHiddenPopup.li7}</li>
        </ul>
        <p dangerouslySetInnerHTML={{
          __html: localeInject(
            locale.pages.home.whatIsHiddenPopup.outro,
            {
              href: '/minion/4',
              innerText: locale.content.caitSithDoll
            }
          )
        }} />
      </Popup>
      </p>
    </div>
    <p dangerouslySetInnerHTML={{
      __html: localeInject(
        locale.pages.home.aboutExtra,
        {
          href: 'https://patreon.com/apkallufalls/posts',
          innerText: locale.common.patreonBlog,
          rel: 'noopener noreferrer',
          target: '_blank'
        },
        {
          href: 'https://discord.gg/VZ9BhKy',
          innerText: locale.common.discordServer,
          rel: 'noopener noreferrer',
          target: '_blank'
        }
      )
    }} />
    <Panel>
      <Progress caption="Example" value={4} total={7} />
      <Icon caption="Example" url="https://api.apkallufalls.com/icons/item/10.png" />
      <Icon caption="Example" iconId={4501} resource="minions" />
      <Icon caption="Example 'no spritesheet found'" />
      <Icon caption="Example 'unable to find icon'" resource="minions" />
    </Panel>
  </section>
);

export default () => (
  <AFComponent style={style}>
    <Home />
  </AFComponent>
);