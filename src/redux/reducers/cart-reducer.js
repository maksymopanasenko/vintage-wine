import axios from "axios";

const UPDATE_PRODUCTS = "UPDATE_PRODUCTS";
const ADD_PRODUCTS = "ADD_PRODUCTS";
const REMOVE_PRODUCT = "REMOVE_PRODUCT";
const REMOVE_ALL = "REMOVE_ALL";
const ADD_ONE_TO_CART = "ADD_ONE_TO_CART";
const CLEAR_CART = "CLEAR_CART";
const FETCH_CARTS = "FETCH_CARTS";

const initialState = {
  carts: [],
};

const cartsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCTS:
      return {
        ...state,
        carts: action.payload,
      };
    case UPDATE_PRODUCTS:
      return {
        ...state,
        carts: [...state.carts, ...action.payload],
      };
    case REMOVE_PRODUCT:
      return {
        ...state,
        carts: state.carts.map(({ quantity, instance }) => {
          if (instance._id === action.payload) {
            return {
              quantity: quantity - 1,
              instance,
            };
          }
          return { quantity, instance };
        }),
      };
    case REMOVE_ALL:
      return {
        ...state,
        carts: state.carts.filter(
          (item) => item.instance._id !== action.payload,
        ),
      };
    case CLEAR_CART:
      return {
        ...state,
        carts: [],
      };
    case ADD_ONE_TO_CART:
      return {
        ...state,
        carts: state.carts?.map(({ quantity, instance }) => {
          if (instance._id === action.payload) {
            return {
              quantity: quantity + 1,
              instance,
            };
          }
          return { quantity, instance };
        }),
      };
    case FETCH_CARTS:
      return {
        ...state,
        carts: action.payload.products,
      };
    default:
      return state;
  }
};

export const addToCarts = (product) => ({
  type: ADD_PRODUCTS,
  payload: product,
});

export const updateCarts = (product) => ({
  type: UPDATE_PRODUCTS,
  payload: product,
});

export const removeFromCarts = (id) => ({
  type: REMOVE_PRODUCT,
  payload: id,
});

export const removeAll = (id) => ({
  type: REMOVE_ALL,
  payload: id,
});

export const addOneToExistedProduct = (id) => ({
  type: ADD_ONE_TO_CART,
  payload: id,
});

export const clearCartAC = () => ({
  type: CLEAR_CART,
});

export const fetchCarts = (cart) => ({
  type: FETCH_CARTS,
  payload: cart,
});

export const fetchNewsThunk = () => {
  return async (dispatch, getState) => {
    const curentState = getState();
    const response = await fetch("https://vintage-wine-shop.onrender.com/api/cart", {
      method: "GET",
      headers: { Authorization: curentState.user.token },
    });
    const carts = await response.json();
    dispatch(fetchCarts(carts));
  };
};

export const removeCartThunk = () => {
  return (dispatch, getState) => {
    const {
      user: { token },
    } = getState();
    dispatch(clearCartAC());

    if (token) {
      axios
        .delete(`https://vintage-wine-shop.onrender.com/api/cart`, {
          headers: {
            Authorization: token,
          },
        })
        .catch((err) => console.error(err));
    }
  };
};

export const addToCartThunk = (item) => (dispatch, getState) => {
  const {
    carts: { carts },
    user: { token },
  } = getState();

  const isItemInCart = carts?.find(({ instance }) => instance._id === item._id);

  if (isItemInCart) {
    dispatch(addOneToExistedProduct(item._id));
  } else {
    dispatch(updateCarts([{ quantity: 1, instance: item }]));
  }

  if (token) {
    axios
      .put(`https://vintage-wine-shop.onrender.com/api/cart/${item._id}`, item, {
        headers: {
          Authorization: token,
        },
      })
      .catch((err) => console.log(err));
  }
};

export default cartsReducer;
