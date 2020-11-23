import React from 'react';
import Icon from '@mdi/react';
import {mdiStarOutline} from '@mdi/js';

function RepoTile({name, description, stargazers_count, language, html_url}) {
  return (
    <article className="repo-tile">
      <div className="repo-info">
        <a className="repo-link title-font" href={html_url} target="_blank"><strong>{name}</strong></a>
        <span className="repo-desc">{description}</span>
      </div>
      <div className="repo-stats">
        <span className="star-container">
          <strong>{stargazers_count}</strong>
          <Icon className="repo-tile-star" path={mdiStarOutline} size={1} />
        </span>
        <span><strong>{language}</strong></span>
      </div>
    </article>
  )
}

export default RepoTile;