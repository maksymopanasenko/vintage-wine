import { ErrorMessage, Field, Form, Formik } from "formik";
import styles from './NewsForm.module.scss';
import Button from "../../../Button/Button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import AdminNewsSelect from "../../AdminSelect/AdminNewsSelect";
import { useEffect, useState } from "react";
import CustomField from "../../CustomeField/CustomeField";
import newsValidationSchema from "../../../../validation/newsValidationSchema";
import { changeMessageAC, switchSuccessMsg } from "../../../../redux/reducers/submitForm-reducer";

const NewsForm = () => {
    const token = useSelector((state) => state.user.token);
    const dispatch = useDispatch();
    const [options, setOptions] = useState([]);
    const [paragraphNum, setParagraphNum] = useState(1);

    useEffect(() => {
        axios.get('https://vintage-wine-nyw6.onrender.com/api/news/')
            .then(newsAll => {
                const options = newsAll.data?.map(news => (
                    {
                        id: news._id,
                        label: news.title,
                    }
                ));
                setOptions(options);
            })
            .catch(err => console.log(err));
    }, []);

    const initialValues = {
        title: "",
        tags: [],
        description_1: "",
        description_2: "",
        description_3: "",
        description_4: "",
        description_5: "",
        description_6: "",
        related: [],
        image: "",
    };

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        dispatch(switchSuccessMsg());
        const { image, title, related, tags, ...rest } = values;

        const descr = Object.entries(rest).map(item => item[1]);
        const relate = related.map(item => item.id);

        const body = {
            title,
            tags,
            related: relate,
            description: descr
        }

        axios.post('https://vintage-wine-nyw6.onrender.com/api/news/', body, {
            headers: {
                "Authorization": token,
            }
        })
            .then((news) => {
                const formData = new FormData();
                formData.append('image', image);

                axios.patch(`https://vintage-wine-nyw6.onrender.com/api/news/images/${news.data._id}`, formData, {
                    headers: {
                        "Authorization": token,
                        "Content-Type": "multipart/form-data",
                    }
                })
                    .then(news => {
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

    const makeFields = () => {
        let arr = [];
        for (let i = 0; i < paragraphNum; i++) {
            arr.push(
                <div key={i} className={styles.AddNewsField}>
                    <Field
                        className={styles.AddProductInput}
                        type="text"
                        name={`description_${i + 1}`}
                        placeholder="News paragraph"
                    />
                    <ErrorMessage
                        className={styles.AddNewsError}
                        name={`description_${i + 1}`}
                        component="div"
                    />
                </div>
            )
        }
        return arr;
    }

    const addNewField = () => {
        if (paragraphNum >= 6) return;

        setParagraphNum(prev => prev + 1);
    }

    const validationSchema = newsValidationSchema;

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, setFieldValue, values }) => (
                <Form className={styles.AddNewsForm}>
                    <div className={styles.AddNewsFields}>
                        <div className={styles.AddNewsField}>
                            <Field
                                className={styles.AddProductInput}
                                type="text"
                                name="title"
                                placeholder="News title"
                            />
                            <ErrorMessage
                                className={styles.AddNewsError}
                                name="title"
                                component="div"
                            />
                        </div>
                        <div className={styles.AddNewsField}>
                            <input
                                className={styles.AddProductInput}
                                type="file"
                                name="image"
                                onChange={(e) => setFieldValue('image', e.target.files[0])}
                            />
                            <ErrorMessage
                                className={styles.AddNewsError}
                                name="image"
                                component="div"
                            />
                        </div>
                    </div>

                    <h3 className={styles.AddNewsSubTitle}>Content and relations</h3>

                    <div className={styles.AddNewsFields}>
                        <div className={styles.AddNewsRelated}>
                            {
                                values.tags.length > 0 && (
                                    <>
                                        <h5 className={styles.AddNewsLabel}>Added tags: </h5>
                                        <ul className={styles.AddNewsRelatedList}>
                                            {values.tags.map((item, i) => {
                                                return <li key={i}><span>{i + 1}.</span>{item}</li>
                                            })}
                                        </ul>
                                    </>
                                )
                            }
                            <div className={styles.AddNewsField}>
                                <CustomField name="tags" />


                                <ErrorMessage
                                    className={styles.AddNewsError}
                                    name="tags"
                                    component="div"
                                />
                            </div>
                        </div>

                        {
                            makeFields()
                        }

                        {
                            paragraphNum < 6 && (
                                <span className={styles.AddParagraphBtn} onClick={addNewField}>Add next paragraph</span>
                            )
                        }

                        <div className={styles.AddNewsRelated}>
                            {
                                values.related.length > 0 && (
                                    <>
                                        <h5 className={styles.AddNewsLabel}>Selected related news: </h5>
                                        <ul className={styles.AddNewsRelatedList}>
                                            {values.related.map((item, i) => {
                                                return <li key={i}><span>{i + 1}.</span>{item.label}</li>
                                            })}
                                        </ul>
                                    </>
                                )
                            }
                            <AdminNewsSelect placeHolder="Choose related news" name='related' options={options} />
                            <ErrorMessage
                                className={styles.AddNewsError}
                                name="related"
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
            )}
        </Formik>
    );
}

export default NewsForm;