import {
    CHANGE_THEME
} from "../actions/";

const initalState = {
    theme: "default"
};

export default function preferencesReducer(state = initalState, action) {
    switch (action.type) {
        case CHANGE_THEME: {
            return {
                ...action.payload
            }
        }
        default:
            return state;
    }
}