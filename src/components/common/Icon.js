/**
 * The `<Icon />` component renders an icon (image).
 * This component assumes the various icon spritesheets from https://api.apkallufalls.com have already been stored in localStorage (which happens when the app loads).
 * @module [{components/common}Icon]
 * @prop {String} props.caption - The text to be displayed on hover (used within the rendered component's `title` attribute and `<figcaption>` element).
 * @prop {number} [props.iconId] - An icon ID used to generate the image URL. This is used to fetch the X and Y co-ordinates from the resource's spritesheet JSON. Necessary if `props.url` is not specified.
 * @prop {String} [props.resource] - The resource the icon belongs to. Used to fetch the spritesheet JSON for the icon. Can be one of the following: achievements, chocoboBardings, emotes, minions, mounts, orchestrionRolls or titles. Necessary if `props.url` is not specified.
 * @prop {String} [props.url] - A qualified image URL to use. Necessary if `props.iconId` is not specified.
 * @example
 * // This renders an icon with a qualified URL.
 * <Icon caption="Test" url="example.png" />
 * @example
 * // This renders an icon from a content spritesheet.
 * <Icon caption="Test" iconId={4501} resource="minions" />
 * @example
 * // This icon ID is invalid and there's no resource specified.
 * // This will return the Example Self emote as it looks like a generic 'not found' image.
 * <Icon caption="Test" iconId={9999} />
 */
import React from "react";
import AFComponent from "components/AFComponent";

import style from "styles/common/Icon";

const Icon = ({
  classes,
  caption,
  iconId,
  resource,
  url,
}) => {
  let computedStyle;

  if (url)
    computedStyle = {
      backgroundImage: `url(${url})`
    };
  else {
    computedStyle = (() => {
      const spritesheet = localStorage.getItem(`icons/${resource}`);

      if (!spritesheet) {
        console.warn(`Unable to locate spritesheet for resource "${resource}".`);
        return {
          backgroundImage: 'url(https://api.apkallufalls.com/icons/emote/64044.png)'
        }
      }

      const iconPosition = spritesheet[iconId];

      if (!iconPositions) {
        console.warn(`Unable to find icon ID ${iconId} within spritesheet for resource "${resource}".`);
        return {
          backgroundImage: 'url(https://api.apkallufalls.com/icons/emote/64044.png)'
        }
      }

      return {
        backgroundImage: `url(https://api.apkallufalls.com/icons/${resource}.png)`,
        backgroundPosition: `${iconPosition[0]}px ${iconPosition[1]}px`
      }
    })();
  }

  return (
    <figure
      className={classes.icon}
      style={computedStyle}
      title={caption}
    >
      <figcaption className={classes.caption}>
        {caption}
      </figcaption>
    </figure>
  );
}

export default (props) => (
  <AFComponent style={style} {...props}>
    <Icon />
  </AFComponent>
)