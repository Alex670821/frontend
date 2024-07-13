import { GET_POINTS_SUCCESS, GET_POINTS_FAIL } from '../actions/types';

const initialState = {
    points: 0
};

export default function pointsReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_POINTS_SUCCESS:
            return {
                ...state,
                points: payload.points
            };
        case GET_POINTS_FAIL:
            return {
                ...state,
                points: 0
            };
        default:
            return state;
    }
}
