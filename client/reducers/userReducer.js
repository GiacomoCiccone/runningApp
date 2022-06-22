import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    REGISTER_REQUEST,
    RESET_ERROR_USER,
    UPDATE_REQUEST,
    UPDATE_SUCCESS,
    UPDATE_FAIL,
    DELETE_REQUEST,
    DELETE_SUCCESS,
    DELETE_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_UPDATED
} from "../actions/";

const initalState = {
    authToken: null,
    isLoading: false,
    userInfo: null,
    error: null,
    updated: []
};

export default function userReducer(state = initalState, action) {
    switch (action.type) {
        case RESET_UPDATED:
            return {
                ...state,
                updated: []
            }
        case RESET_ERROR_USER:
        case FORGOT_PASSWORD_SUCCESS:
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                error: null,
                isLoading: false,
            };
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case FORGOT_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                authToken: null,
                userInfo: null,
                isLoading: true,
                error: null,
                updated: []
            };
        case UPDATE_REQUEST:
        case DELETE_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return {
                ...state,
                authToken: action.payload.authToken,
                userInfo: action.payload.userInfo,
                isLoading: false,
                error: null,
            };
        case LOGOUT:
        case DELETE_SUCCESS:
            return {
                ...state,
                authToken: null,
                userInfo: null,
                isLoading: false,
            };
        case UPDATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                updated: action.payload.updated,
                userInfo: action.payload.userInfo,
            };
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case FORGOT_PASSWORD_FAIL:
        case RESET_PASSWORD_FAIL:
            return {
                ...state,
                authToken: null,
                userInfo: null,
                isLoading: false,
                error: action.payload,
                updated: []
            };
        case UPDATE_FAIL:
        case DELETE_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                updated: []
            };
        default:
            return state;
    }
}