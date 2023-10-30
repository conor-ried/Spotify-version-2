
import React from 'react';
import { Provider } from 'react-redux'; 
import store from './redux/store';
import AppRoutes from './AppRoutes'; 

function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}

export default App;






// import React from 'react';
// import './App.css';
// import Login from './components/Login';
// import Songs from './components/Song';
// import Logout from './components/Logout';
// import Navbar from './components/Navbar';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import { Provider, useSelector } from 'react-redux'; 
// import store from './redux/store';
// import { selectIsAuthenticated, selectUsername } from './redux/selectors/authSelectors';

// function AppRoutes() {
//   const isAuthenticated = useSelector(selectIsAuthenticated);
//   const username = useSelector(selectUsername);  // Assuming you create this selector

//   return (
//     <Router>
//       <div className="App">
//         <Navbar isAuthenticated={isAuthenticated} username={username} />
//         <Routes>
//           { isAuthenticated ? (
//             <>
//               <Route path="/songs" element={<Songs />} />
//               <Route path="/logout" element={<Logout />} />
//               <Route path="*" element={<Navigate to="/songs" />} />
//             </>
//           ) : (
//             <>
//               <Route path="/login" element={<Login />} />
//               <Route path="*" element={<Navigate to="/login" />} />
//             </>
//           )}
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// function App() {
//   return (
//     <Provider store={store}>
//       <AppRoutes />
//     </Provider>
//   );
// }

// export default App;




// import React from 'react';
// import './App.css';
// import Login from './components/Login';
// import Songs from './components/Song';
// import Logout from './components/Logout';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import { Provider, useSelector } from 'react-redux'; 
// import store from './redux/store';
// import { selectIsAuthenticated } from './redux/selectors/authSelectors';
// import Navbar from './components/Navbar';

// function AppRoutes() {
//   const isAuthenticated = useSelector(selectIsAuthenticated);

//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           { isAuthenticated ? (
//             <>
//               <Route path="/songs" element={<Songs />} />
//               <Route path="/logout" element={<Logout />} />
//               <Route path="*" element={<Navigate to="/songs" />} />
//             </>
//           ) : (
//             <>
//               <Route path="/login" element={<Login />} />
//               <Route path="*" element={<Navigate to="/login" />} />
//             </>
//           )}
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// function App() {
//   return (
//     <Provider store={store}>
//       <AppRoutes />
//     </Provider>
//   );
// }

// export default App;
