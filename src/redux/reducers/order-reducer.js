import axios from "axios";
import { removeCartThunk } from "./cart-reducer";
import { createOrderLetter } from "../../helpers/createLetterHtml";
import { hideLoadingAC, showLoadingAC } from "./loading-reducer";

export const DataStatus = {
  IDLE: "idle",
  PENDING: "pending",
  FULFILLED: "fulfilled",
};

const SET_ORDER_INFO = "SET_ORDER_INFO";
const SET_PLACE_ORDER_DATA_STATUS = "SET_PLACE_ORDER_DATA_STATUS";
const SET_GET_ORDERS_DATA_STATUS = "SET_GET_ORDERS_DATA_STATUS";
const SET_CREATE_CHECKOUT_SESSION_DATA_STATUS =
  "SET_CREATE_CHECKOUT_SESSION_DATA_STATUS";
const SET_ORDER_HISTORY = "SET_ORDER_HISTORY";

const initialState = {
  info: null,
  placeOrderDataStatus: DataStatus.IDLE,
  getOrderDataStatus: DataStatus.IDLE,
  createCheckoutSessionDataStatus: DataStatus.IDLE,
  orderHistory: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER_INFO: {
      return {
        ...state,
        info: action.payload,
      };
    }
    case SET_PLACE_ORDER_DATA_STATUS: {
      return {
        ...state,
        placeOrderDataStatus: action.payload,
      };
    }
    case SET_GET_ORDERS_DATA_STATUS: {
      return {
        ...state,
        getOrderDataStatus: action.payload,
      };
    }
    case SET_CREATE_CHECKOUT_SESSION_DATA_STATUS: {
      return {
        ...state,
        createCheckoutSessionDataStatus: action.payload,
      };
    }
    case SET_ORDER_HISTORY: {
      return {
        ...state,
        orderHistory: action.payload,
      };
    }
    default:
      return state;
  }
};

const setOrderInfoAC = (orderInfo) => ({
  type: SET_ORDER_INFO,
  payload: orderInfo,
});

export const setInfoDataStatusAC = (infoDataStatus) => ({
  type: SET_PLACE_ORDER_DATA_STATUS,
  payload: infoDataStatus,
});

export const setOrderHistoryAC = (orderHistory) => ({
  type: SET_ORDER_HISTORY,
  payload: orderHistory,
});

export const setOrderDataStatusAC = (orderDataStatus) => ({
  type: SET_GET_ORDERS_DATA_STATUS,
  payload: orderDataStatus,
});

const setCreateCheckoutSessionDataStatusAC = (orderDataStatus) => ({
  type: SET_CREATE_CHECKOUT_SESSION_DATA_STATUS,
  payload: orderDataStatus,
});

export const createCheckoutSessionThunk =
  (orderInfo) => async (dispatch, getState) => {
    const {
      carts: { carts },
      user: { token, userId },
    } = getState();

    const customerInfo = {};

    if (!token) {
      customerInfo.products = carts;
    } else {
      customerInfo.customerId = userId;
    }

    dispatch(setOrderInfoAC(orderInfo));
    dispatch(setCreateCheckoutSessionDataStatusAC(DataStatus.PENDING));
    const { data } = await axios.post(
      "https://vintage-wine-nyw6.onrender.com/api/orders/checkout-session",
      customerInfo,
    );
    dispatch(setCreateCheckoutSessionDataStatusAC(DataStatus.FULFILLED));
    window.location.href = data.url;
  };

export const placeOrderThunk = () => async (dispatch, getState) => {
  const {
    carts: { carts },
    user: { token, userId },
    order: { info },
  } = getState();

  const newOrder = {
    deliveryAddress: {
      city: info.city,
      country: info.country,
      address: info.address,
    },
    mobile: info.phone,
    email: info.email,
    customerName: info.customerName,
    shipping: `${info.city} 50UAH`,
    letterHtml: createOrderLetter(info, carts),
  };

  if (!token) {
    newOrder.products = carts;
  } else {
    newOrder.customerId = userId;
  }

  dispatch(setInfoDataStatusAC(DataStatus.PENDING));
  dispatch(showLoadingAC());
  await axios.post("https://vintage-wine-nyw6.onrender.com/api/orders", newOrder);

  dispatch(setInfoDataStatusAC(DataStatus.FULFILLED));
  dispatch(hideLoadingAC());
  dispatch(setOrderInfoAC(null));
  dispatch(removeCartThunk());
};

export const getOrderInfoThunk = () => async (dispatch, getState) => {
  const {
    user: { token },
  } = getState();

  dispatch(setOrderDataStatusAC(DataStatus.PENDING));

  const { data } = await axios.get("https://vintage-wine-nyw6.onrender.com/api/orders", {
    headers: {
      Authorization: token,
    },
  });

  dispatch(setOrderDataStatusAC(DataStatus.FULFILLED));
  dispatch(setOrderHistoryAC(data));
};

export default orderReducer;
