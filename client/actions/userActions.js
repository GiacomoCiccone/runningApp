import axios from "../axios/";
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    REGISTER_REQUEST,
    UPDATE_REQUEST,
    UPDATE_SUCCESS,
    UPDATE_FAIL,
    DELETE_REQUEST,
    DELETE_SUCCESS,
    DELETE_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_SUCCESS,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_UPDATED,
} from "./";

export const registerAction = (userInfo) => async (dispatch) => {
    //inizia la richiesta di registrazione
    dispatch({ type: REGISTER_REQUEST, payload: {} });

    try {
        const { data } = await axios.post("/api/auth/register", userInfo);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: data.data,
        });
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: error.response?.data?.error || error.response._response,
        });
    }
};

export const loginAction = (email, password) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST, payload: {} });

    try {
        const { data } = await axios.post("/api/auth/login", {
            email,
            password,
        });

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.data,
        });
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response?.data?.error || error.response._response,
        });
    }
};

export const forgotPasswordAction = (email, onSuccess) => async (dispatch) => {
    dispatch({ type: FORGOT_PASSWORD_REQUEST, payload: {} });
    try {
        await axios.post("/api/auth/forgotPassword", {
            email,
        });

        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: {},
        });

        onSuccess(email);
    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response?.data?.error || error.response._response,
        });
    }
};

export const resetPasswordAction =
    (password, token, onSuccess) => async (dispatch) => {
        dispatch({ type: RESET_PASSWORD_REQUEST, payload: {} });
        try {
            await axios.put(`/api/auth/resetPassword/${token}`, {
                password,
            });

            dispatch({
                type: RESET_PASSWORD_SUCCESS,
                payload: {},
            });

            onSuccess();
        } catch (error) {
            dispatch({
                type: RESET_PASSWORD_FAIL,
                payload:
                    error.response?.data?.error || error.response._response,
            });
        }
    };

export const updateAction = (userInfo, userId, token) => async (dispatch) => {
    //inizia la richiesta di update
    dispatch({ type: UPDATE_REQUEST, payload: {} });

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const { data } = await axios.put(
            `/api/users/${userId}${
                userInfo.oldPassword ? "?password=true" : ""
            }`,
            userInfo,
            config
        );

        const updated = Object.keys(userInfo).filter(
            (key) => key !== "oldPassword"
        );

        console.log(updated)
        dispatch({ type: UPDATE_SUCCESS, payload: { ...data.data, updated } });

        setTimeout(() => {
            dispatch({ type: RESET_UPDATED });
        }, 2000);
        return true;
    } catch (error) {
        dispatch({
            type: UPDATE_FAIL,
            payload: error.response.data.error,
        });
        return false;
    }
};

export const deleteAction = (userId, token) => async (dispatch) => {
    //inizia la richiesta di update
    dispatch({ type: DELETE_REQUEST, payload: {} });

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        await axios.delete(`/api/users/${userId}`, config);

        dispatch({ type: DELETE_SUCCESS });
    } catch (error) {
        dispatch({
            type: DELETE_FAIL,
            payload: error.response.data.error,
        });
    }
};
