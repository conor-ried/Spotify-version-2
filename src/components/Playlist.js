import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { selectPlaylists } from '../redux/selectors/playlistSelectors';
import { fetchPlaylist, removeSongFromPlaylist, addSongToPlaylist } from '../redux/actions/playlistActions';

function Playlist() {
  // Using useParams to get the playlist title from the URL and useNavigate for navigation
  const { playlistTitle } = useParams();
  const navigate = useNavigate(); // Renamed to 'navigate' for clarity

  // Setting up Redux dispatch
  const dispatch = useDispatch();

  // Accessing the specific playlist from the global state
  const playlist = useSelector((state) => selectPlaylists(state, playlistTitle));

  // Local state for handling the song ID to add
  const [songIdToAdd, setSongIdToAdd] = useState("");

  // useEffect to handle fetching the playlist on component mount
  useEffect(() => {
    if (playlistTitle) { // Ensure playlistTitle is available
      dispatch(fetchPlaylist(decodeURIComponent(playlistTitle)));
    }
  }, [dispatch, playlistTitle]); // Dependencies for useEffect

  // Function to handle removing a song from the playlist
  const handleRemoveSong = async (songId) => {
    try {
      await dispatch(removeSongFromPlaylist(songId, playlistTitle));
      alert("Song removed from playlist successfully.");
      // Consider state management for removed song or refetch the playlist
    } catch (error) {
      alert("Could not remove song: " + error.message);
    }
  };

  // Function to handle adding a song to the playlist
  const handleAddSong = async () => {
    if (!songIdToAdd.trim()) { // Validate input for non-empty content
      alert("Please enter a valid song ID.");
      return;
    }
    try {
      await dispatch(addSongToPlaylist(songIdToAdd, playlistTitle));
      alert("Song added successfully.");
      setSongIdToAdd(""); // Reset the input field
      // Consider state management for added song or refetch the playlist
    } catch (error) {
      alert("Error adding song: " + error.message);
    }
  };

  // Rendering component UI
  return (
    <div>
      <h1>{playlist?.title || "Playlist"}</h1> {/* Defensive approach, avoiding potential crash */}
      {/* Iterating over songs in the playlist */}
      {playlist?.songs?.map((song) => (
        <div key={song.id}>
          <span>{song.title} by {song.artist}</span>
          <button onClick={() => handleRemoveSong(song.id)}>Remove</button>
        </div>
      ))}

      {/* Input field and button for adding new songs */}
      <input 
        type="text" 
        value={songIdToAdd} 
        onChange={(e) => setSongIdToAdd(e.target.value)} 
        placeholder="Enter song ID" 
      />
      <button onClick={handleAddSong}>Add Song</button>

      {/* Button to navigate back to all playlists */}
      <button onClick={() => navigate('/playlists')}>Back to Playlists</button>
    </div>
  );
}

export default Playlist;