import { useDispatch, useSelector } from 'react-redux';
import styles from './ExcursionItem.module.scss';
import { deleteExcursionAC, updateExcursionAC } from '../../../../redux/reducers/excursions-reducer';
import axios from 'axios';
import Trash from './icons/delete.svg?react';
import Edit from './icons/edit.svg?react';
import Done from './icons/done.svg?react';
import { useState } from 'react';
import { Field, Form, Formik } from 'formik';

const ExcursionItem = ({ data }) => {
    const token = useSelector((state) => state.user.token);
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);

    const initialValues = {
        title: data.title,
        description: data.description,
    };

    const editExcursion = () => {
        setIsEditing(ie => !ie);
    }

    const deleteExcursion = () => {
        axios.delete(`https://vintage-wine-shop.onrender.com/api/excursions/${data._id}`, {
            headers: {
                "Authorization": token,
            }
        })
            .then(excursion => {
                dispatch(deleteExcursionAC(excursion.data._id));
            })
            .catch(err => console.log(err));
    }

    const handleSubmit = (values, { setSubmitting }) => {
        axios.patch(`https://vintage-wine-shop.onrender.com/api/excursions/${data._id}`, values, {
            headers: {
                "Authorization": token,
            }
        })
            .then(excursion => {
                dispatch(updateExcursionAC(excursion.data));
            })
            .catch(err => console.log(err))
            .finally(() => {
                setIsEditing(ie => !ie);
            });
    }

    return (
        <li className={styles.ExcursionItem}>
            <img src={data.imageURL} alt="image" />
            <div className={styles.ExcursionContent}>
                <Formik
                    initialValues={initialValues}
                    // validationSchema={excursionsValidationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form className={styles.ExcursionItemForm}>
                        <div className={styles.ExcursionHeader}>
                            {
                                isEditing ? (
                                    <Field
                                        type="text"
                                        name="title"
                                        className={styles.ExcursionItemInput}
                                    />
                                ) : (
                                    <span className={styles.ExcursionName}>{data.title}</span>
                                )
                            }
                            <div className={styles.ExcursionButtons}>
                                {isEditing ? (
                                    <button type='submit' style={{ display: 'flex', alignItems: 'center' }}><Done /></button>
                                ) : (
                                    <Edit onClick={editExcursion} />
                                )}
                                <Trash onClick={deleteExcursion} />
                            </div>
                        </div>
                        {
                            isEditing ? (
                                <Field
                                    as='textarea'
                                    type="text"
                                    name="description"
                                    className={styles.ExcursionItemInputArea}
                                />
                            ) : (
                                <p className={styles.ExcursionText}>{data.description}</p>
                            )
                        }
                    </Form>
                </Formik>
            </div>
        </li>
    );
}

export default ExcursionItem;