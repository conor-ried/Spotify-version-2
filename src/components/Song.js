import React, { useEffect, useState } from 'react';  // Make sure to import useState here
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongs } from '../redux/actions/songActions';
import { selectSongs } from '../redux/selectors/songSelectors';
import { Link } from 'react-router-dom';

function Songs() {
    const dispatch = useDispatch();
    const songsData = useSelector(selectSongs);

    // State to hold the filter text
    const [artistFilter, setArtistFilter] = useState('');

    const isLoading = useSelector(state => state.songs.isLoading);
    const error = useSelector(state => state.songs.error);

    useEffect(() => {
        dispatch(fetchSongs());
    }, [dispatch]);

    const actualSongsArray = songsData.songs || [];

    // Filter the songs based on the artist name
    const filteredSongs = artistFilter 
        ? actualSongsArray.filter(song => song.artist.toLowerCase().includes(artistFilter.toLowerCase())) 
        : actualSongsArray;

    // Handler for the input change
    const handleFilterChange = (e) => {
        setArtistFilter(e.target.value);
    };

    return (
        <div className="songsContainer">
            <h2>Songs</h2>
            {/* Input for artist filter */}
            <input 
                type="text" 
                placeholder="Filter by artist..." 
                value={artistFilter} 
                onChange={handleFilterChange} 
            />
            <Link to="/logout">Logout</Link>

            {isLoading && <div>Loading songs...</div>}
            {error && <div>Error: {error}</div>}

            <ul>
                {/* Use filteredSongs here instead of actualSongsArray */}
                {filteredSongs.map(song => (
                    <li key={song.song_id} className="songItem">
                        <h3>{song.title}</h3> 
                        <p>by {song.artist}</p>
                        <p>Duration: {song.duration_seconds} seconds</p>
                        <p>Released in: {song.release_year}</p>
                        {/* Potentially more details here */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Songs;






// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchSongs } from '../redux/actions/songActions';
// import { selectSongs } from '../redux/selectors/songSelectors';
// import { Link } from 'react-router-dom';

// function Songs() {
//     const dispatch = useDispatch();
//     const songsData = useSelector(selectSongs);
//     console.log('Songs Data Line 10 of components Song.js:', songsData);
//     const [artistFilter, setArtistFilter] = useState('');
//     const isLoading = useSelector(state => state.songs.isLoading);
//     const error = useSelector(state => state.songs.error);
//     console.log('Songs Data Line 14 of components Song.js:', songsData);

//     useEffect(() => {
//         dispatch(fetchSongs());
//     }, [dispatch]);

//     const actualSongsArray = songsData.songs || [];
//     const filteredSongs = artistFilter 
//         ? actualSongsArray.filter(song => song.artist.toLowerCase().includes(artistFilter.toLowerCase())) 
//         : actualSongsArray;

//         const handleFilterChange = (e) => {
//             setArtistFilter(e.target.value);
//         };

//     // Determine the data structure of the songs
//     const songsType = Array.isArray(actualSongsArray) ? "array" : typeof actualSongsArray;
//     console.log(`Songs is of type: ${songsType}`);  // This logs the data structure of songs

//     return (
//         <div className="songsContainer">
//             <h2>Songs</h2>
//             <Link to="/logout">Logout</Link>

//             {isLoading && <div>Loading songs...</div>}
//             {error && <div>Error: {error}</div>}

//             <ul>
//                 {songsType === "array" ? (
//                     actualSongsArray.map(song => (
//                         <li key={song.song_id} className="songItem">
//                             <h3>{song.title}</h3> 
//                             <p>by {song.artist}</p>
//                             <p>Duration: {song.duration_seconds} seconds</p>
//                             <p>Released in: {song.release_year}</p>
//                             {/* Potentially more details here */}
//                         </li>
//                     ))
//                 ) : (
//                     <div>Error: Songs data is of unrecognized type: {songsType}</div>
//                 )}
//             </ul>
//         </div>
//     );
// }

// export default Songs;