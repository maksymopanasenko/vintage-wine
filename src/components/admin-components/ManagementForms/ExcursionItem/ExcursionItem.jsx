import { useDispatch, useSelector } from 'react-redux';
import styles from './ExcursionItem.module.scss';
import { deleteExcursionAC } from '../../../../redux/reducers/excursions-reducer';
import axios from 'axios';
import Trash from './icons/delete.svg?react';
import Edit from './icons/edit.svg?react';

const ExcursionItem = ({ data }) => {
    const token = useSelector((state) => state.user.token);
    const dispatch = useDispatch();

    const editExcursion = () => {
        //
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

    return (
        <li className={styles.ExcursionItem}>
            <div className={styles.ExcursionHeader}>
                <span>{data.title}</span>
                <div className={styles.ExcursionButtons}>
                    <Edit onClick={editExcursion} />
                    <Trash onClick={deleteExcursion} />
                </div>
            </div>
            <p className={styles.ExcursionText}>{data.description}</p>
        </li>
    );
}

export default ExcursionItem;