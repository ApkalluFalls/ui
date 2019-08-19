import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from 'contexts/theme';
import { paths } from 'js/routes';

// Theme.
import { createUseStyles } from 'react-jss'
import style from 'styles/content/FreeCompanyName';

const useStyles = createUseStyles(style);

function FreeCompanyName({
  crestParts,
  id,
  name,
  tag
}) {
  const classes = useStyles(useContext(ThemeContext));

  return (
    <span className={classes.freeCompanyName}>
      <span className={classes.icon}>
        {crestParts.map(part => (
          <span
            key={part}
            className={classes.iconPart}
            style={{
              backgroundImage: `url(${part})`
            }}
          />
        ))}
      </span>
      <span className={classes.name}>
        <Link
          to={paths.freeCompany(id)}
          className={classes.hyperlink}
        >
          {name}
        </Link>
        {' '}
        <span className={classes.tag}>
          «{tag}»
        </span>
      </span>
    </span>
  )
}

export default FreeCompanyName;