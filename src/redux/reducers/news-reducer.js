const FETCH_NEWS = 'FETCH_NEWS';

const initialState = {
    news: []
}

const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_NEWS:
            return {
                ...state,
                news: [...action.payload]
            };
        default:
            return state;
    }
}

export const fetchNewsAC = (news) => ({
    type: FETCH_NEWS,
    payload: news
})

export const fetchNewsThunk = () => {
    return async (dispatch) => {
        const response = await fetch('https://vintage-wine-shop.onrender.com/api/news')
        const news = await response.json();
        dispatch(fetchNewsAC(news))
    }
}

export default newsReducer;