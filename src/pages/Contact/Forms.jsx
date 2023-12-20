import styles from "./Contact.module.scss";
import "react-lazy-load-image-component/src/effects/blur.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import cn from "classnames";
import axios from "axios";
import { useEffect, useState } from "react";
import validation from "./validation";

const Forms = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const validationSchema = validation();

  useEffect(() => {
    if (isFormSubmitted) {
      const timer = setTimeout(() => {
        setIsFormSubmitted(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isFormSubmitted]);

  const initialValues = {
    name: "",
    email: "",
    mobilePhone: "",
    question: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(
        "https://vintage-wine-shop.onrender.com/api/contact",
        values,
      );
      resetForm(initialValues);
      setIsFormSubmitted(true);
    } catch (error) {
      console.error("Form submission error", error);
    }
    setSubmitting(false);
  };

  return (
    <Formik
      className={cn(styles.div2)}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => (
        <Form className={styles.form}>
          <h3 className={styles.title}>Contact form</h3>

          <div
            className={`${styles.successMessage} ${
              isFormSubmitted ? styles.active : ""
            }`}
          >
            Message successfully sent!
          </div>

          <Field type="text" name="name" placeholder="Name" />
          <ErrorMessage name="name" className={styles.error} component="div" />

          <Field type="email" name="email" placeholder="E-mail" />
          <ErrorMessage name="email" className={styles.error} component="div" />

          <Field type="text" name="mobilePhone" placeholder="Mobile phone" />
          <ErrorMessage
            name="mobilePhone"
            className={styles.error}
            component="div"
          />

          <Field type="text" name="question" placeholder="Question" />
          <ErrorMessage
            name="question"
            className={styles.error}
            component="div"
          />

          <input type="submit" className={styles.submit} value="Send" />
        </Form>
      )}
    </Formik>
  );
};

export default Forms;
