import axios from "axios"
import {
    ALL_USERS_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    CLEAR_ERRORS,
    DELETE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS
} from "../constant/userConstant"


// login function 
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST })
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        const { data } = await axios.post(`https://farming-assistant-backend.vercel.app/api/v1/login`, { email, password }, config)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user,
        })
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }

};

// register new user 

export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_REQUEST })
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        const { data } = await axios.post(`https://farming-assistant-backend.vercel.app/api/v1/register`, userData, config)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: data.user,
        })
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: error.response.data.message
        })

    }
}

// load logged user 
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST })
        const { data } = await axios.get(`https://farming-assistant-backend.vercel.app/api/v1/me`)
        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user,
        })

    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

// logout user 
export const logout = () => async (dispatch) => {

    try {
        await axios.get(`https://farming-assistant-backend.vercel.app/api/v1/logout`);
        dispatch({
            type: LOGOUT_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message,
        })
    }

}
// get all user by admin 
export const getAllUser = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_USERS_REQUEST })

        const { data } = await axios.get(`https://farming-assistant-backend.vercel.app/api/v1/admin/users`);

        dispatch({
            type: ALL_USERS_SUCCESS,
            payload: data.users
        })


    } catch (error) {

        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.message
        })

    }
}
// delete user  by admin 
export const deleteUser = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_USER_REQUEST })
        const { data } = await axios.delete(`https://farming-assistant-backend.vercel.app/api/v1/admin/user/${id}`);

        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

// update user role and details by admin 
export const updateUser = (id, userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST });

        //   const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.put(`https://farming-assistant-backend.vercel.app/api/v1/admin/user/${id}`, userData,);

        dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};
//  get user details by admin 
export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST });
        const { data } = await axios.get(`https://farming-assistant-backend.vercel.app/api/v1/admin/user/${id}`);

        dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
    }
};

export const updateProfile = (myForm) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST })
        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const data = await axios.put(`https://farming-assistant-backend.vercel.app/api/v1/update-profile`, myForm, config);
        console.log(data);
        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data?.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message,
        })
    }
}

// update password 
export const updatePassword = (password) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PASSWORD_REQUEST })

        const config = { headers: { "Content-type": "application/json" } };
        const { data } = await axios.put(
            `https://farming-assistant-backend.vercel.app/api/v1/update-password`,
            password,
            config
        );
        dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error?.response?.message,
        })
    }
};


// clear errors 
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}