import { useDispatch, useSelector } from 'react-redux';
import styles from './ExcursionItem.module.scss';
import { deleteExcursionAC } from '../../../../redux/reducers/excursions-reducer';
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

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        console.log(values);
        setIsEditing(ie => !ie);
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
                    <Form>
                        <div className={styles.ExcursionHeader}>
                            {
                                isEditing ? (
                                    <Field
                                        type="text"
                                        name="title"
                                    />
                                ) : (
                                    <span>{data.title}</span>
                                )
                            }
                            <div className={styles.ExcursionButtons}>
                                {isEditing ? (
                                    <button type='submit'><Done /></button>
                                ) : (
                                    <Edit onClick={editExcursion} />
                                )}
                                <Trash onClick={deleteExcursion} />
                            </div>
                        </div>
                        {
                            isEditing ? (
                                <Field
                                type="text"
                                name="description"
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