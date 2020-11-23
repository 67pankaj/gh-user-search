import React, {useState, useEffect} from 'react';
import {UserCard, RepoTile, InfoTile} from '.';
import {userAction, repoAction} from '../store/action';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import Icon from '@mdi/react';
import {mdiAccountGroup, mdiAccountSearchOutline, mdiAlertCircleOutline, mdiGithub, mdiReload, mdiSourceRepository} from '@mdi/js';
import '../styles/Home.css';

function Home() {
  const baseUrl = 'https://api.github.com/users/';
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const [repos, setRepos] = useState();
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [search, setSearch] = useState('');
  const [userUrl, setUserUrl] = useState('');
  const [storeUser, storeRepos] = useSelector(state => {
    return [state?.user, state?.repos];
  });
  useEffect(() => {
    setUser(storeUser);
  }, [storeUser]);

  useEffect(() => {
    setRepos(storeRepos);
  }, [storeRepos]);

  useEffect(() => {
    if(userUrl?.trim()) {
      resetState();
      try{
        axios(userUrl).then(response => {
          let data = response.data;
          if(data.id && data.type?.toLowerCase() === 'user') {
            if(data.public_repos > 0) fetchRepos(data.public_repos, data.repos_url);
            dispatch(userAction(data));
          }else {
            setNotFound(true);
          }
          setLoading(false);
        }).catch(err => {
          if(err.response?.data) {
            setNotFound(true);
          }else {
            setIsError(true);
            setUserUrl('');
          }
          setLoading(false);
        });
      } catch(err) {
        setIsError(true);
        setLoading(false);
        setUserUrl('');
      }
    }
  }, [userUrl]);

  function fetchRepos(num_repos, repoBaseUrl) {
    let repoRequests = [];
    let repoUrl = '';
    if(num_repos <= 100) {
      repoUrl = `${repoBaseUrl}?per_page=100`;
      repoRequests.push(axios(repoUrl));
    }else {
      let pages = parseInt(num_repos/100);
      if(num_repos % 100 > 0) pages++;
      for(let i = 1; i <= pages; ++i) {
        repoUrl = `${repoBaseUrl}?per_page=100&page=${i}`;
        repoRequests.push(axios(repoUrl));
      }
    }
    try{
      Promise.all(repoRequests).then(responses => {
        let repos = [].concat(...responses.map(response => response.data));
        repos.sort((a,b) => {
          if (a.stargazers_count > b.stargazers_count) return -1;
          if (a.stargazers_count < b.stargazers_count) return 1;
          return 0;
        })
        dispatch(repoAction(repos));
      }).catch(err => {
        dispatch(repoAction([]));
      });
    } catch(err) {
      dispatch(repoAction([]));
    }
  }

  function fetchUser() {
    let searchTerm = search.trim();
    if(searchTerm === '') return;
    let fetchUrl = `${baseUrl}${searchTerm}`;
    if(fetchUrl !== userUrl) setUserUrl(fetchUrl);
  }

  function resetState() {
    dispatch(userAction(undefined));
    dispatch(repoAction(undefined));
    setLoading(true);
    setNotFound(false);
    setIsError(false);
  }
  return (
    <div id="home-comp">
      <section className="search-section">
        <div className="search-bar">
          <Icon className="search-icon" path={mdiAccountSearchOutline} size={1} />
          <input id="search-input" type="text" value={search} 
          placeholder="Search GitHub user" 
          onChange={event => setSearch(event.target.value)} 
          onKeyPress={event => event.key === 'Enter' && fetchUser()} />
          <button id="search-btn" onClick={fetchUser}>Search</button>
        </div>
      </section>
      <section className="result-section">
        {loading && (
          <div className="response-state-container">
            <Icon path={mdiReload} size={1} spin={true} />
            <span>searching <strong>GitHub</strong></span>
          </div>
        )}
        {notFound && (
          <div className="response-state-container">
            <Icon path={mdiGithub} size={2} />
            <span>User not found.</span>
          </div>
        )}
        {isError && (
          <div className="response-state-container">
            <Icon path={mdiAlertCircleOutline} size={2} />
            <span>Couldn't fetch data.</span>
          </div>
        )}
        {user && (
          <>
            <div className="user-details">
              <UserCard {...user} />
              <div className="info-tiles-container">
                <InfoTile name="Followers" value={user.followers} iconPath={mdiAccountGroup} color="follow_color" />
                <InfoTile name="Repos" value={user.public_repos} iconPath={mdiSourceRepository} color="repo_color" />
              </div>
            </div>
            <div className="repo-details">
                {repos?.map((repo) => (
                  <RepoTile key={repo.id} {...repo} />
                ))}
            </div>
          </>
        )}
      </section>
    </div>
  )
}

export default Home;