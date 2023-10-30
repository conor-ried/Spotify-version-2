import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/actions/authActions';  // Import loginUser action

function Login() {
    const dispatch = useDispatch();
    const [credentials, setCredentials] = useState({ username: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Directly dispatch the loginUser action
        dispatch(loginUser(credentials.username, credentials.password));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input 
                        type="text"
                        value={credentials.username}
                        onChange={e => setCredentials({ ...credentials, username: e.target.value })}
                    />
                </label>
                <label>
                    Password:
                    <input 
                        type="password"
                        value={credentials.password}
                        onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                    />
                </label>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
export default Login;




// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { loginUser as loginUserAPI } from '../api/apiClient';
// import { loginSuccess, loginFailure } from '../redux/actions/authActions';// Import from the centralized apiClient

// function Login() {
//     const dispatch = useDispatch();
//     const [credentials, setCredentials] = useState({ username: '', password: '' });

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const result = await loginUserAPI(credentials);
//             if (result && result.token) {
//                 localStorage.setItem("token", result.token);
//                 dispatch(loginSuccess(result.token));  // Dispatching the success action
//             }
//         } catch (error) {
//             dispatch(loginFailure(error.message));  // Dispatching the failure action
//         }
//     };

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     Username:
//                     <input 
//                         type="text"
//                         value={credentials.username}
//                         onChange={e => setCredentials({ ...credentials, username: e.target.value })}
//                     />
//                 </label>
//                 <label>
//                     Password:
//                     <input 
//                         type="password"
//                         value={credentials.password}
//                         onChange={e => setCredentials({ ...credentials, password: e.target.value })}
//                     />
//                 </label>
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// }

// export default Login;