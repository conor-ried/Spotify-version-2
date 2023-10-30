import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import { selectIsAuthenticated } from './redux/selectors/authSelectors';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Songs from './components/Song';
import Logout from './components/Logout';
import Playlists from './components/Playlists';
import Playlist from './components/Playlist';
import Home from './components/Home';
function AppRoutes() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <Router>
      <div className="App">
        <Navbar isAuthenticated={isAuthenticated} username="User" />
        <Routes>
          { isAuthenticated ? (
            <>
              <Route path="/songs" element={<Songs />} />
              <Route path="/playlists" element={<Playlists />} /> {/* New route for all playlists */}
              <Route path="/playlists/:playlistTitle" element={<Playlist />} /> {/* New route for a specific playlist */}
              <Route path="/logout" element={<Logout />} />
              <Route path="*" element={<Navigate to="/songs" />} />
              {/* <Route path="/songs" element={<Songs />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="*" element={<Navigate to="/songs" />} /> */}
            </>
          ) : (
            // <>
            //   <Route path="/login" element={<Login />} />
            //   <Route path="*" element={<Navigate to="/login" />} />
            // </>
            <>

            <Route path="/" element={<Home />} />  {/* New route for the landing page */}
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/" />} />  {/* Redirects users to the home page */}
          </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default AppRoutes;