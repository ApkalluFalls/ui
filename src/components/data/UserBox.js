import React, { useContext, useEffect, useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { UserContext } from "contexts/user";
import { ThemeContext } from 'contexts/theme';
import { paths } from 'js/routes';

// Theme.
import { createUseStyles } from 'react-jss'
import style from 'styles/data/UserBox';

function UserBox() {
  const classes = createUseStyles(style(useContext(ThemeContext)))();
  const user = useContext(UserContext);

  console.warn(user);

  if (user.loading) {
    return (
      <div className={classes.wrapper}>
        <div className={`${classes.userBox} ${classes.userBoxLoading}`}>
          <span class={`fas fa-cog fa-spin ${classes.icon}`} />
        </div>
      </div>
    );
  }

  if (!user.data) {
    return (
      <div className={classes.wrapper}>
        <NavLink
          className={`${classes.userBox} ${classes.userBoxAnonymous}`}
          activeClassName={classes.pageActive}
          to={paths.authentication}
        >
          <span class={`fal fa-user-plus ${classes.icon}`} />
        </NavLink>
      </div>
    );
  }

  const { avatar } = user.data;

  return (
    <div className={classes.wrapper}>
      <NavLink
        className={classes.userBox}
        activeClassName={classes.pageActive}
        to={paths.account}
        style={avatar && {
          backgroundImage: `url(${avatar})`
        }}
      >
        {!avatar && (
          <span class={`fas fa-user ${classes.icon}`} />
        )}
      </NavLink>
    </div>
  );
}

export default withRouter(UserBox);