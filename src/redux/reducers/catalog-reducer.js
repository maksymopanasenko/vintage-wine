const FETCH_CATALOG = 'FETCH_CATALOG';

const initialState = {
    catalog: []
};

const catalogReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CATALOG:
            return {
                ...state,
                catalog: [...action.payload]
            };
        default:
            return state;
    }
};

const fetchCatalogAC = (catalog) => ({
    type: FETCH_CATALOG,
    payload: catalog
});

export const fetchCatalogThunk = () => {
    return async (dispatch) => {
        const response = await fetch('https://vintage-wine-nyw6.onrender.com/api/catalog');
        const catalog = await response.json();

        dispatch(fetchCatalogAC(catalog));
    };
};

export default catalogReducer;