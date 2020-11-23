import React from 'react';
import Icon from '@mdi/react';

function InfoTile({name, iconPath, value, color}) {
  return (
    <article className="info-tile">
      <Icon className={`info-tile-icon ${color}`} path={iconPath} size={1} />
      <div className="info-tile-content">
        <span className="info-tile-data title-font"><strong>{value}</strong></span>
        <span>{name}</span>
      </div>
    </article>
  )
}

export default InfoTile;