import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_USER } from '../actions/authActions';

// Defining initial 
const initialState = {
    token: null, //   token.
    user: null,  // To store user data.
    error: null  //messages.
};

// Defining auth reducer
const authReducer = (state = initialState, action) => {
    // Logging the action object received 
    console.log('Auth Reducer:', action);
    
    // Using switch to handle different action
    switch (action.type) {
        // loggin
        case LOGIN_SUCCESS:
            // Creating a new state object by spreading the existing state and updating the token and user toooo
            const newState = { 
                ...state, 
                token: action.payload.token, 
                user: action.payload.user, 
                error: null 
            };
            // Logging the new state object for debugging.
            console.log('Line 21 Login Success, New State:', newState);
            // Returning the new state object which will update the Redux store.
            return newState;
        
        // Handling the case where login fails.
        case LOGIN_FAILURE:
            // Creating a new state object by spreading the existing state and updating error, token, and user.
            return { 
                ...state, 
                error: action.payload, 
                token: null,
                user: null 
            };
        
        // Handling user logout.
        case LOGOUT_USER:
            // Logging logout action for debugging.
            console.log('Logout, Reverting to Initial State');
            // Returning the initial state, effectively "resetting" this slice of the Redux store.
            return { ...initialState };
        
        // Handling the case where the action type does not match any predefined types.
        default:
            // Returning the existing state without making any changes.
            return state;
    }
};

// Exporting the reducer function as the default export of this module.
export default authReducer;



// const initialState = {
//     token: null,
//     error: null
// };

// const authReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case LOGIN_SUCCESS:
//             return { ...state, token: action.payload.token, user: action.payload.user, error: null };
//         case LOGIN_FAILURE:
//             return { ...state, error: action.payload, token: null };
//         case LOGOUT_USER:
//                 return { ...initialState };
//         default:
//             return state;
//     }
// };

// export default authReducer;