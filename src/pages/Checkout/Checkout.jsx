import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Navigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Container from "../../components/Container/Container";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import useBreadcrumbs from "../../hooks/useBreadcrumbs";
import styles from "./Checkout.module.scss";
import Button from "../../components/Button/Button";
import CheckoutItem from "../../components/CartItem/CheckoutItem/CheckoutItem";
import TotalPrice from "../../components/TotalPrice/TotalPrice";
import {
  DataStatus,
  createCheckoutSessionThunk,
  setInfoDataStatusAC,
} from "../../redux/reducers/order-reducer";
import Plus from './icons/plus.svg?react';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const options = {
  mode: "payment",
  amount: 1099,
  currency: "uah",
  appearance: {},
};

const Checkout = () => {
  const [showComment, setShowComment] = useState(false);
  const cartItems = useSelector((state) => state.carts.carts);
  const { createCheckoutSessionDataStatus } = useSelector(
    (state) => state.order,
  );
  const dispatch = useDispatch();
  const pathParts = useBreadcrumbs();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(
        /^\+380[0-9]{9}$/,
        "Phone number must be in the format +380123456789",
      )
      .required("Phone number is required"),
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),
    address: Yup.string().required("Address is required"),
    comment: Yup.string().optional(),
    toggle: Yup.bool().oneOf(
      [true],
      "You must accept the terms and conditions",
    ),
  });

  const isOrderLoading = createCheckoutSessionDataStatus === DataStatus.PENDING;

  useEffect(() => {
    return () => {
      dispatch(setInfoDataStatusAC(DataStatus.IDLE));
    };
  }, [dispatch]);

  if (cartItems.length === 0) {
    return <Navigate to="/" />;
  }

  return (
    <section className={styles.CheckoutInfo}>
      <Container>
        <h3 className="vvPageTitle">Checkout </h3>
        <Breadcrumbs pathParts={pathParts} />
        <div className={styles.CheckoutWrapper}>
          <Formik
            initialValues={{
              toggle: false,
              name: "",
              lastName: "",
              email: "",
              phone: "",
              country: "",
              city: "",
              address: "",
              comment: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              const { name, lastName, ...rest } = values;
              const body = { ...rest, customerName: name + " " + lastName };
              dispatch(createCheckoutSessionThunk(body));
            }}
          >
            <Elements stripe={stripePromise} options={options}>
              <Form className={styles.ContentWrapper}>
                <div className={styles.ClientInfo}>
                  <h2 className={styles.ClientInfoTitle}>Your order</h2>
                  <div className={styles.PersonalData}>
                    <p>Personal data</p>
                    <div className={styles.Fields}>
                      <div>
                        <Field type="text" name="name" placeholder="Name" />
                        <ErrorMessage name="name" component="div" />
                      </div>
                      <div>
                        <Field
                          type="text"
                          name="lastName"
                          placeholder="Last Name"
                        />
                        <ErrorMessage name="lastName" component="div" />
                      </div>
                      <div>
                        <Field type="email" name="email" placeholder="Email" />
                        <ErrorMessage name="email" component="div" />
                      </div>
                      <div>
                        <Field type="text" name="phone" placeholder="Phone" />
                        <ErrorMessage name="phone" component="div" />
                      </div>
                    </div>
                  </div>
                  <div className={styles.Delivery}>
                    <p>Delivery</p>
                    <div className={styles.Fields}>
                      <div>
                        <Field
                          type="text"
                          name="country"
                          placeholder="Country"
                        />
                        <ErrorMessage name="country" component="div" />
                      </div>
                      <div>
                        <Field type="text" name="city" placeholder="City" />
                        <ErrorMessage name="city" component="div" />
                      </div>
                      <div>
                        <Field
                          type="text"
                          name="address"
                          placeholder="Address"
                        />
                        <ErrorMessage name="address" component="div" />
                      </div>
                    </div>
                  </div>
                  <div className={styles.PaymentMethods}>
                    <div className={styles.PaymentMethodsTitle}>
                      <p>Payment methods</p>
                    </div>
                    <div className={styles.PaymentMethodsImages}>
                      <div className={styles.CardsImagesContainer}>
                        <div className={styles.CardsImages}>
                          <img
                            src="https://res.cloudinary.com/dhpukux5x/image/upload/v1698006680/t5uxihhb8xppi3kiztfi.png"
                            alt="smallCards"
                          />
                        </div>
                        <div className={styles.MobilePay}>
                          <img
                            src="https://res.cloudinary.com/dhpukux5x/image/upload/v1698006680/n3mml70fccu3rmfmne4p.png"
                            alt="mobile-pay"
                          />
                        </div>
                      </div>
                      <div className={styles.CardsImagesBig}>
                        <img
                          src="https://res.cloudinary.com/dhpukux5x/image/upload/v1698006680/uebmyasbqb8ifteduybw.png"
                          alt="BigCards"
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.AddComment}>
                    <button
                      type="button"
                      onClick={() => setShowComment(!showComment)}
                    >
                      <Plus />
                      <p className={styles.Comment}>Comment on the order</p>
                    </button>
                  </div>
                  {showComment && (
                    <div className={styles.Textarea}>
                      <Field as="textarea" name="comment" />
                      <ErrorMessage name="comment" component="div" />
                    </div>
                  )}
                </div>
                <div className={styles.ProductInfo}>
                  <div className={styles.AddedProducts}>
                    {cartItems.map(({ quantity, instance }) => {
                      return (
                        <CheckoutItem
                          key={instance._id}
                          count={quantity}
                          product={instance}
                        />
                      );
                    })}
                  </div>
                  <TotalPrice isInCheckout />

                  <label className={styles.Checkbox}>
                    <Field type="checkbox" name="toggle" />
                    <p>
                      By clicking the `Place order` button, you agree to the
                      Privacy Policy
                    </p>
                    <ErrorMessage name="toggle" component="div" />
                  </label>
                  <Button
                    isDisabled={isOrderLoading}
                    text="Place order"
                    type="submit"
                  />
                </div>
              </Form>
            </Elements>
          </Formik>
        </div>
      </Container>
    </section>
  );
};

export default Checkout;
