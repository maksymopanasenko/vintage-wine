import { ErrorMessage, Field, Form, Formik } from "formik";
import styles from './ExcursionsForm.module.scss';
import Button from "../../../Button/Button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import excursionsValidationSchema from "../../../../validation/excursionsValidationSchema";
import { changeMessageAC, switchSuccessMsg } from "../../../../redux/reducers/submitForm-reducer";

const ExcursionsForm = () => {
    const token = useSelector((state) => state.user.token);
    const dispatch = useDispatch();

    const initialValues = {
        title: "",
        description: "",
        imageURL: "",
    };

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        dispatch(switchSuccessMsg());
        const { imageURL, ...rest } = values;

        axios.post('https://vintage-wine-shop.onrender.com/api/excursions/', rest, {
            headers: {
                "Authorization": token,
            }
        })
            .then((excursion) => {
                const formData = new FormData();
                formData.append('imageURL', imageURL);
                formData.append('title', excursion.data.title);
                formData.append('description', excursion.data.description);

                axios.put(`https://vintage-wine-shop.onrender.com/api/excursions/${excursion.data._id}`, formData, {
                    headers: {
                        "Authorization": token,
                        "Content-Type": "multipart/form-data",
                    }
                })
                    .then(excursion => {
                        dispatch(changeMessageAC("Data successfully saved!"));
                    })
                    .catch(err => {
                        dispatch(changeMessageAC("Failure!"))
                    });
            })
            .catch(err => {
                dispatch(changeMessageAC("Failure!"))
            })
            .finally(() => {
                resetForm();
            });
    };

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={excursionsValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, setFieldValue }) => (
                    <Form className={styles.AddExcursionForm}>
                        <div className={styles.AddExcursionFields}>
                            <Field
                                className={styles.AddExcursionInput}
                                type="text"
                                name="title"
                                placeholder="Excursion title"
                            />
                            <ErrorMessage
                                className={styles.AddExcursionError}
                                name="title"
                                component="div"
                            />
                            <Field
                                className={styles.AddExcursionInput}
                                type="text"
                                name="description"
                                placeholder="Excursion description"
                            />
                            <ErrorMessage
                                className={styles.AddExcursionError}
                                name="description"
                                component="div"
                            />
                            <input
                                className={styles.AddExcursionInput}
                                type="file"
                                name="imageURL"
                                onChange={(e) => setFieldValue('imageURL', e.target.files[0])}
                            />
                            <ErrorMessage
                                className={styles.AddExcursionError}
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
        </div>
    );
}

export default ExcursionsForm;