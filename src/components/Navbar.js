import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './NavBar.css';
import { selectUsername, selectIsAuthenticated } from '../redux/selectors/authSelectors';
function Navbar() {
  const username = useSelector(selectUsername);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  console.log('Line 9 Navbar Render - Username:', username, 'Is Authenticated:', isAuthenticated);
  return (
    <nav>
      <ul>
        <li>Welcome, {username || 'Guest'}</li>
        {isAuthenticated ? (
          <>
            <li><NavLink to="/songs" activeClassName="active">Songs</NavLink></li>
            <li><NavLink to="/playlists" activeClassName="active">Playlists</NavLink></li>
            <li><NavLink to="/disliked_songs" activeClassName="active">Disliked Songs</NavLink></li>
            <li><NavLink to="/newmusicfeeds" activeClassName="active">New Music Feeds</NavLink></li>
            <li><NavLink to="/favoritepodcasts" activeClassName="active">Favorite Podcasts</NavLink></li>
            <li><NavLink to="/logout" activeClassName="active">Logout</NavLink></li>
          </>
        ) : (
          <>
            <li><NavLink to="/login" activeClassName="active">Login</NavLink></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;