import { ErrorMessage, Field, Form, Formik } from "formik";
import styles from './SharesForm.module.scss';
import Button from "../../../Button/Button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import sharesValidationSchema from "../../../../validation/sharesValidationSchema";
import { changeMessageAC, switchSuccessMsg } from "../../../../redux/reducers/submitForm-reducer";

const SharesForm = () => {
    const token = useSelector((state) => state.user.token);
    const dispatch = useDispatch();

    const initialValues = {
        name: "",
        discount: "",
        description: "",
        imageURL: "",
        pathParts: "",
        conditions: "",
        productCategories: "",
    };

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        dispatch(switchSuccessMsg());
        const { imageURL, ...rest } = values;

        axios.post('https://vintage-wine-nyw6.onrender.com/api/shares/', rest, {
            headers: {
                "Authorization": token,
            }
        })
            .then((excursion) => {
                const formData = new FormData();
                formData.append('imageURL', imageURL);
                Object.entries(excursion.data).forEach(([key, value]) => {
                    formData.append(key, value);
                });

                axios.put(`https://vintage-wine-nyw6.onrender.com/api/shares/images/${excursion.data._id}`, formData, {
                    headers: {
                        "Authorization": token,
                        "Content-Type": "multipart/form-data",
                    }
                })
                    .then(shares => {
                        dispatch(changeMessageAC("Data successfully saved!"));
                    })
                    .catch(err => {
                        dispatch(changeMessageAC("Failure!"))
                    })
            })
            .catch(err => {
                dispatch(changeMessageAC("Failure!"))
            })
            .finally(() => resetForm());
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={sharesValidationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, setFieldValue }) => (
                <Form className={styles.AddSharesForm}>
                    <div className={styles.AddSharesFields}>
                        <Field
                            className={styles.AddSharesInput}
                            type="text"
                            name="name"
                            placeholder="Promotion title"
                        />
                        <ErrorMessage
                            className={styles.AddSharesError}
                            name="name"
                            component="div"
                        />
                        <Field
                            className={styles.AddSharesInput}
                            type="text"
                            name="pathParts"
                            placeholder="Short title"
                        />
                        <ErrorMessage
                            className={styles.AddSharesError}
                            name="pathParts"
                            component="div"
                        />
                        <Field
                            className={styles.AddSharesInput}
                            type="text"
                            name="description"
                            placeholder="Promotion description"
                        />
                        <ErrorMessage
                            className={styles.AddSharesError}
                            name="description"
                            component="div"
                        />
                        <Field
                            className={styles.AddSharesInput}
                            type="text"
                            name="conditions"
                            placeholder="Promotion conditions"
                        />
                        <ErrorMessage
                            className={styles.AddSharesError}
                            name="conditions"
                            component="div"
                        />
                        <Field
                            className={styles.AddSharesInput}
                            type="text"
                            name="discount"
                            placeholder="Discount rate"
                        />
                        <ErrorMessage
                            className={styles.AddSharesError}
                            name="discount"
                            component="div"
                        />
                        <Field
                            className={styles.AddSharesInput}
                            type="text"
                            name="productCategories"
                            placeholder="Categories of products"
                        />
                        <ErrorMessage
                            className={styles.AddSharesError}
                            name="productCategories"
                            component="div"
                        />
                        <input
                            className={styles.AddSharesInput}
                            type="file"
                            name="imageURL"
                            onChange={(e) => setFieldValue('imageURL', e.target.files[0])}
                        />
                        <ErrorMessage
                            className={styles.AddSharesError}
                            name="imageURL"
                            component="div"
                        />
                    </div>
                    <Button
                        type="submit"
                        text="Save"
                        disabled={isSubmitting}
                    />
                </Form>
            )}
        </Formik>
    );
}

export default SharesForm;