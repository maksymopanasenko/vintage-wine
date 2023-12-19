const FETCH_VIEWED_PRODUCTS = "FETCH_VIEWED_PRODUCTS";

const viewedFromDB = JSON.parse(localStorage.getItem("viewedProductsDB"));
const initialState = {
  viewedProducts: viewedFromDB || [],
};

const fetchViewedProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VIEWED_PRODUCTS:
      return {
        ...state,
        viewedProducts: [...action.payload],
      };
    default:
      return state;
  }
};

const fetchViewedProductsAC = (viewedProducts) => ({
  type: FETCH_VIEWED_PRODUCTS,
  payload: viewedProducts,
});

export const fetchViewedProductsThunk = () => {
  return async (dispatch) => {
    const response = await fetch(
      "https://vintage-wine-nyw6.onrender.com/api/last-viewed-products"
    );
    const viewedProducts = await response.json();
    dispatch(fetchViewedProductsAC(viewedProducts));
  };
};

export default fetchViewedProductsReducer;
