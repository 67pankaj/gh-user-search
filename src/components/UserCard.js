import React from 'react';
import Icon from '@mdi/react';
import { mdiMapMarker, mdiTwitter, mdiWeb } from '@mdi/js';

function UserCard({login, name, avatar_url, bio, html_url, location, twitter_username, blog}) {
  return (
    <article className="user-card">
      <section className="card-header">
        <img className="user-avatar" src={avatar_url} width="64" height="64" />
        <div className="header-text">
          <span className="title-font"><strong>{name}</strong></span>
          <span>@{login}</span>
        </div>
        <div className="profile">
          <a className="profile-link" href={html_url} target="_blank">Profile</a>
        </div>
      </section>
      <section className="card-info">
        <span className="card-info-line">{bio || 'No bio available.'}</span>
        {location && (
          <span className="card-info-line">
            <Icon className="card-info-line-icon" path={mdiMapMarker} size={0.7} />
            <span>{location}</span>
          </span>
        )}
        {twitter_username && (
          <span className="card-info-line">
            <Icon className="card-info-line-icon" path={mdiTwitter} size={0.7} />
            <span>{twitter_username}</span>
          </span>
        )}
        {blog && (
          <span className="card-info-line">
            <Icon className="card-info-line-icon" path={mdiWeb} size={0.7} />
            <span>{blog}</span>
          </span>
        )}
      </section>
    </article>
  )
}

export default UserCard;