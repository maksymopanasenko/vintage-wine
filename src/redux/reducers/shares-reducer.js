const FETCH_SHARES = 'FETCH_SHARES';

const initialState = {
    shares: []
};

const catalogReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SHARES:
            return {
                ...state,
                shares: [...action.payload]
            };
        default:
            return state;
    }
};

const fetchCatalogAC = (shares) => ({
    type: FETCH_SHARES,
    payload: shares
});

export const fetchSharesThunk = () => {
    return async (dispatch) => {
        const response = await fetch('https://vintage-wine-shop.onrender.com/api/shares');
        const shares = await response.json();

        dispatch(fetchCatalogAC(shares));
    };
};

export default catalogReducer;