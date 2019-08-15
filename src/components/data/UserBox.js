import React, { useContext, useEffect, useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { UserContext } from "contexts/user";
import { ThemeContext } from 'contexts/theme';
import { paths } from 'js/routes';

// Theme.
import { createUseStyles } from 'react-jss'
import style from 'styles/data/UserBox';

const useStyles = createUseStyles(style);

function UserBox() {
  const classes = useStyles(useContext(ThemeContext));
  const user = useContext(UserContext);

  console.warn(user);

  if (user.loading) {
    return (
      <div className={classes.wrapper}>
        <div className={`${classes.userBox} ${classes.userBoxLoading}`}>
          <span className={`fas fa-cog fa-spin ${classes.icon}`} />
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
          <span className={`fal fa-user-plus ${classes.icon}`} />
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
          <span className={`fas fa-user ${classes.icon}`} />
        )}
      </NavLink>
    </div>
  );
}

export default withRouter(UserBox);