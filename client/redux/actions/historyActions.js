import { HISTORY_FAIL, HISTORY_FINISHED, HISTORY_REQUEST, HISTORY_SUCCESS } from ".";
import axios from '../../axios'

export const getHistory = (userId, token, page, onSuccess) => async (dispatch) => {
    dispatch({ type: HISTORY_REQUEST, payload: {} });

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try {

        const { data } = await axios.get(`/api/trackingSessions/${userId}?page=${page}`, config);

        dispatch({ type: HISTORY_SUCCESS, payload: { ...data.data } });

        onSuccess();

    } catch (error) {
        if(error.response?.data?.data?.finished) dispatch({type: HISTORY_FINISHED});
        else dispatch({ type: HISTORY_FAIL, payload: error.response?.data?.error || error.message });
    }
};