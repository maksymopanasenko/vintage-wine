import { ErrorMessage, Field, Form, Formik } from "formik";
import styles from './ProductsForm.module.scss';
import Button from "../../../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import productsValidationSchema from "../../../../validation/productsValidationSchema";
import { useEffect, useState } from "react";
import AdminCategorySelect from "../../AdminSelect/AdminCategorySelect";
import { changeMessageAC, switchSuccessMsg } from "../../../../redux/reducers/submitForm-reducer";

const ProductsForm = () => {
    const token = useSelector((state) => state.user.token);
    const dispatch = useDispatch();
    const [options, setOptions] = useState([]);

    useEffect(() => {
        axios.get('https://vintage-wine-nyw6.onrender.com/api/catalog/')
            .then(categories => {
                const options = categories.data?.map(category => (
                    {
                        id: category.id,
                        value: category.name,
                    }
                ));
                setOptions(options);
            })
            .catch(err => console.log(err));
    }, []);

    const initialValues = {
        name: "",
        currentPrice: "",
        categories: "",
        cartDescription: "",
        collectionBelongs: "",
        productImg: "",
        slidesImageUrls: "",
        taste: "",
        aroma: "",
        vendorCode: "",
        grape: "",
        volume: "",
        color: "",
        strength: "",
        sweetness: "",
        supplyTemperature: "",
        country: "",
        year: "",
    };

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        dispatch(switchSuccessMsg());
        const { productImg, slidesImageUrls, ...rest } = values;

        axios.post('https://vintage-wine-nyw6.onrender.com/api/products/', rest, {
            headers: {
                "Authorization": token,
            }
        })
            .then((product) => {
                const formData = new FormData();
                formData.append('slidesImageUrls', productImg);

                Array.from(slidesImageUrls).forEach((image, index) => {
                    formData.append(`slidesImageUrls`, image);
                });

                axios.patch(`https://vintage-wine-nyw6.onrender.com/api/products/images/${product.data._id}`, formData, {
                    headers: {
                        "Authorization": token,
                        "Content-Type": "multipart/form-data",
                    }
                })
                    .then(products => {
                        dispatch(changeMessageAC("Data successfully saved!"));
                    })
                    .catch(err => {
                        dispatch(changeMessageAC("Failure!"))
                    });
            })
            .catch(err => {
                dispatch(changeMessageAC("Failure!"))
            })
            .finally(() => resetForm());
    };

    const validationSchema = productsValidationSchema;

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, setFieldValue }) => (
                <Form className={styles.AddProductForm}>
                    <h3 className={styles.AddProductSubTitle}>Main information</h3>
                    <div className={styles.AddProductFields}>
                        <div className={styles.AddProductField}>
                            <Field
                                className={styles.AddProductInput}
                                type="text"
                                name="name"
                                placeholder="Product name"
                            />
                            <ErrorMessage
                                className={styles.AddProductError}
                                name="name"
                                component="div"
                            />
                        </div>
                        <div className={styles.AddProductField}>
                            <Field
                                className={styles.AddProductInput}
                                type="text"
                                name="currentPrice"
                                placeholder="Product price"
                            />
                            <ErrorMessage
                                className={styles.AddProductError}
                                name="currentPrice"
                                component="div"
                            />
                        </div>
                        <div className={styles.AddProductField}>
                            <AdminCategorySelect placeHolder="Choose category" name="categories" options={options} />
                            <ErrorMessage
                                className={styles.AddProductError}
                                name="categories"
                                component="div"
                            />
                        </div>
                        <div className={styles.AddProductField}>
                            <Field
                                className={styles.AddProductInput}
                                type="text"
                                name="cartDescription"
                                placeholder="Product description"
                            />
                            <ErrorMessage
                                className={styles.AddProductError}
                                name="cartDescription"
                                component="div"
                            />
                        </div>
                        <div className={styles.AddProductField}>
                            <Field
                                className={styles.AddProductInput}
                                type="text"
                                name="collectionBelongs"
                                placeholder="Product collection"
                            />
                            <ErrorMessage
                                className={styles.AddProductError}
                                name="collectionBelongs"
                                component="div"
                            />
                        </div>
                        <div className={styles.AddProductField}>
                            <input
                                className={styles.AddProductFileInput}
                                type="file"
                                name="productImg"
                                onChange={(e) => setFieldValue('productImg', e.target.files[0])}
                            />
                            <ErrorMessage
                                className={styles.AddProductError}
                                name="productImg"
                                component="div"
                            />
                        </div>
                    </div>

                    <h3 className={styles.AddProductSubTitle}>Characteristics and details</h3>

                    <div className={styles.AddProductFields}>
                        <div className={styles.AddProductField}>
                            <Field
                                className={styles.AddProductInput}
                                type="text"
                                name="aroma"
                                placeholder="Product aroma"
                            />
                            <ErrorMessage
                                className={styles.AddProductError}
                                name="aroma"
                                component="div"
                            />
                        </div>
                        <div className={styles.AddProductField}>
                            <Field
                                className={styles.AddProductInput}
                                type="text"
                                name="taste"
                                placeholder="Product taste"
                            />
                            <ErrorMessage
                                className={styles.AddProductError}
                                name="taste"
                                component="div"
                            />
                        </div>
                        <div className={styles.AddProductField}>
                            <Field
                                className={styles.AddProductInput}
                                type="text"
                                name="vendorCode"
                                placeholder="Vendor code"
                            />
                            <ErrorMessage
                                className={styles.AddProductError}
                                name="vendorCode"
                                component="div"
                            />
                        </div>
                        <div className={styles.AddProductField}>
                            <Field
                                className={styles.AddProductInput}
                                type="text"
                                name="grape"
                                placeholder="Grape"
                            />
                            <ErrorMessage
                                className={styles.AddProductError}
                                name="grape"
                                component="div"
                            />
                        </div>
                        <div className={styles.AddProductField}>
                            <Field
                                className={styles.AddProductInput}
                                type="text"
                                name="volume"
                                placeholder="Volume"
                            />
                            <ErrorMessage
                                className={styles.AddProductError}
                                name="volume"
                                component="div"
                            />
                        </div>
                        <div className={styles.AddProductField}>
                            <Field
                                className={styles.AddProductInput}
                                type="text"
                                name="color"
                                placeholder="Color"
                            />
                            <ErrorMessage
                                className={styles.AddProductError}
                                name="color"
                                component="div"
                            />
                        </div>
                        <div className={styles.AddProductField}>
                            <Field
                                className={styles.AddProductInput}
                                type="text"
                                name="strength"
                                placeholder="Strength"
                            />
                            <ErrorMessage
                                className={styles.AddProductError}
                                name="strength"
                                component="div"
                            />
                        </div>
                        <div className={styles.AddProductField}>
                            <Field
                                className={styles.AddProductInput}
                                type="text"
                                name="sweetness"
                                placeholder="Sweetness"
                            />
                            <ErrorMessage
                                className={styles.AddProductError}
                                name="sweetness"
                                component="div"
                            />
                        </div>
                        <div className={styles.AddProductField}>
                            <Field
                                className={styles.AddProductInput}
                                type="text"
                                name="supplyTemperature"
                                placeholder="Supply temperature"
                            />
                            <ErrorMessage
                                className={styles.AddProductError}
                                name="supplyTemperature"
                                component="div"
                            />
                        </div>
                        <div className={styles.AddProductField}>
                            <Field
                                className={styles.AddProductInput}
                                type="text"
                                name="country"
                                placeholder="Country of origin"
                            />
                            <ErrorMessage
                                className={styles.AddProductError}
                                name="country"
                                component="div"
                            />
                        </div>
                        <div className={styles.AddProductField}>
                            <Field
                                className={styles.AddProductInput}
                                type="number"
                                name="year"
                                placeholder="Year of production"
                            />
                            <ErrorMessage
                                className={styles.AddProductError}
                                name="year"
                                component="div"
                            />
                        </div>
                        <div className={styles.AddProductField}>
                            <input
                                className={styles.AddProductFileInput}
                                type="file"
                                name="slidesImageUrls"
                                multiple
                                onChange={(e) => setFieldValue('slidesImageUrls', e.currentTarget.files)}
                            />
                            <ErrorMessage
                                className={styles.AddProductError}
                                name="slidesImageUrls"
                                component="div"
                            />
                        </div>
                    </div>
                    <Button
                        type="submit"
                        text="Save"
                        disabled={isSubmitting}
                    />
                </Form>
            )
            }
        </Formik >
    );
}

export default ProductsForm;