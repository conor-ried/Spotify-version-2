
import { loginUser as loginUserAPI } from '../../api/apiClient';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_USER = 'LOGOUT_USER';

// Action Creators
export const loginSuccess = (token, user) => ({
    type: LOGIN_SUCCESS,
    payload: { token, user },
});

export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error,
});

export const logoutUser = () => ({
    type: LOGOUT_USER,
});

// Thunk Action
export const loginUser = (username, password) => async (dispatch) => {
    try {
        const response = await loginUserAPI({ username, password });
        console.log('API Response:', response);

        if (response.user && response.token) {
            // If both the token and user are present in the response, proceed with the login process

            // Store the token in localStorage for subsequent API requests
            localStorage.setItem('token', response.token);

            // Dispatch the loginSuccess action with the token and user data
            dispatch(loginSuccess(response.token, response.user));
        } else {
            // If either the token or user is missing from the response, handle it as an error
            console.error("Incomplete response - user or token is missing", response);
            dispatch(loginFailure("Incomplete response received from the API"));
        }
    } catch (error) {
        // If an exception occurs during the API request, handle it by dispatching the loginFailure action
        console.error('Login API Error:', error);
        dispatch(loginFailure(error.toString()));
    }
};

