const FETCH_PRODUCTS = "FETCH_PRODUCTS";
const FILTER_PRODUCTS = "FILTER_PRODUCTS";

const initialState = {
  products: [],
  filteredProducts: [],
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: [...action.payload],
      };
    case FILTER_PRODUCTS:
      const searchTerm = action.payload;
      const filteredProducts = state.products.filter((product) => {
        return product.name.toLowerCase().includes(searchTerm.toLowerCase());
      });

      return {
        ...state,
        filteredProducts,
      };
    default:
      return state;
  }
};

const fetchProductsAC = (products) => ({
  type: FETCH_PRODUCTS,
  payload: products,
});

export const filterProducts = (searchTerm) => ({
  type: FILTER_PRODUCTS,
  payload: searchTerm,
});

export const fetchProductsThunk = () => {
  return async (dispatch) => {
    const response = await fetch("https://vintage-wine-shop.onrender.com/api/products");
    const products = await response.json();

    dispatch(fetchProductsAC(products));
  };
};

export default productsReducer;
