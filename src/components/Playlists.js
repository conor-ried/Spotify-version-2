import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlaylists } from '../redux/actions/playlistActions';
import { selectPlaylists } from '../redux/selectors/playlistSelectors';
import { Link } from 'react-router-dom';
function groupSongsByPlaylist(playlists) {
  const groupedPlaylists = {};

  playlists.forEach((song) => {
    const { playlist_title, ...songDetails } = song;

    if (!groupedPlaylists[playlist_title]) {
      groupedPlaylists[playlist_title] = [];
    }

    groupedPlaylists[playlist_title].push(songDetails);
  });

  return groupedPlaylists;
}
function Playlists() {
  const dispatch = useDispatch();
  const { playlists = [], loading = false, error = null } = useSelector(selectPlaylists) || {};

  // Transform the data once it's loaded
  const groupedPlaylists = !loading && !error ? groupSongsByPlaylist(playlists) : {};

  useEffect(() => {
    dispatch(fetchPlaylists());
  }, [dispatch]);

  if (loading) return <p>Loading playlists...</p>;
  if (error) return <p>Error loading playlists: {error}</p>;

  // Rendering the grouped playlists with their songs
  return (
    <div>
    <h1>Playlists</h1>
    {Object.keys(groupedPlaylists).length === 0 ? (
      <p>No playlists available</p>
    ) : (
      Object.entries(groupedPlaylists).map(([playlistTitle, songsInPlaylist]) => (
        <div key={playlistTitle}>
          <h2>
            <Link to={`/playlists/${encodeURIComponent(playlistTitle)}`}>{playlistTitle}</Link>
          </h2>
          {songsInPlaylist.map((song, index) => (
            <div key={song.song_title || index}>
              {song.song_title} by {song.song_artist}
            </div>
          ))}
        </div>
      ))
    )}
  </div>
  );
}

export default Playlists;
