import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProductsThunk } from "./redux/reducers/products-reducer";
import { useEffect } from "react";

import Layout from "./pages/Layout/Layout";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Catalog from "./pages/Catalog/Catalog";
import Shop from "./pages/Shop/Shop";
import News from "./pages/News/News";
import DeliveryAndPayment from "./pages/DeliveryAndPayment/DeliveryAndPayment";
import Contact from "./pages/Contact/Contact";
import Cart from "./pages/Cart/Cart";
import Login from "./pages/Login/Login";
import Search from "./pages/Search/Search";
import NoPage from "./pages/NoPage/NoPage";
import SingleCatalog from "./components/SingleCatalog/SingleCatalog";
import SingleProduct from "./pages/SingleProduct/SingleProduct";
import Checkout from "./pages/Checkout/Checkout";
import SingleNews from "./pages/SingleNews/SingleNews";
import Customer from "./pages/Customer/Customer";
import Shares from "./pages/Shares/Shares";
import Dashboard from "./pages/Dashboard/Dashboard";

import "./App.scss";
import Orders from "./pages/Customer/Orders/Orders";
import Overview from "./pages/Overview/Overview";
import Management from "./pages/Management/Management";
import OrdersAdmin from "./pages/OrdersAdmin/OrdersAdmin";
import Reservations from "./pages/Reservations/Reservations";
import ManagementWrapper from "./components/admin-components/ManagementWrapper/ManagementWrapper";
import ContactRequests from "./pages/ContactRequests/ContactRequests";
import SingleOrder from "./pages/SingleOrder/SingleOrder";
import CheckoutSuccess from "./pages/Checkout/CheckoutSuccess/CheckoutSuccess";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductsThunk());
  }, [dispatch]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="catalog/:slug" element={<SingleCatalog />} />
          <Route path="shop" element={<Shop />} />
          <Route path="shop/:id" element={<SingleProduct />} />
          <Route path="news" element={<News />} />
          <Route path="delivery&payment" element={<DeliveryAndPayment />} />
          <Route path="contacts" element={<Contact />} />
          <Route path="cart" element={<Cart />} />
          <Route path="search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="shares/:id" element={<Shares />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/news/:id" element={<SingleNews />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="*" element={<NoPage />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
        </Route>

        <Route path="/dashboard/" element={<Dashboard />}>
          <Route index element={<Overview />} />
          <Route path="management" element={<Management />} />
          <Route path="management/:slug" element={<ManagementWrapper />} />
          <Route path="orders" element={<OrdersAdmin />} />
          <Route path="orders/:id" element={<SingleOrder />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="contacts" element={<ContactRequests />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
