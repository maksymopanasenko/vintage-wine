const FETCH_EXCURSIONS = 'FETCH_EXCURSIONS';
const DELETE_EXCURSION = 'DELETE_EXCURSION';
const ADD_EXCURSION = 'ADD_EXCURSION';

const initialState = {
    excursions: []
};

const excursionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_EXCURSIONS:
            return {
                ...state,
                excursions: [...action.payload]
            };
        case ADD_EXCURSION:
            return {
                ...state,
                excursions: [...state.excursions, action.payload]
            };
        case DELETE_EXCURSION:
            return {
                ...state,
                excursions: state.excursions.filter(item => item._id !== action.payload)
            };
        default:
            return state;
    }
};

const fetchExcursionsAC = (excursions) => ({
    type: FETCH_EXCURSIONS,
    payload: excursions
});

export const addExcursionAC = (excursion) => ({
    type: ADD_EXCURSION,
    payload: excursion
});

export const deleteExcursionAC = (id) => ({
    type: DELETE_EXCURSION,
    payload: id
});

export const fetchExcursionsThunk = () => {
    return async (dispatch) => {
        const response = await fetch('https://vintage-wine-shop.onrender.com/api/excursions');
        const excursions = await response.json();

        dispatch(fetchExcursionsAC(excursions));
    };
};

export default excursionsReducer;