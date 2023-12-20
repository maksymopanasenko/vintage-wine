import { useEffect, useState } from 'react';
import Container from '../../components/Container/Container';
import styles from './Reservations.module.scss'
import axios from 'axios';

const Reservations = () => {
    const [excursions, setExcursions] = useState([]);

    useEffect(() => {
        axios.get('https://vintage-wine-shop.onrender.com/api/excursions/')
            .then(excursions => {
                setExcursions(excursions.data)
            })
            .catch(err => console.log(err));
    }, [])
    return (
        <Container>
            <div className={styles.Reservations}>
                <ul>
                    {excursions.map(excursion => {
                        return (
                            <li key={excursion._id} className={styles.ReservationsExcursion}>
                                <div className={styles.ExcursionHead}>
                                    <h4 className={styles.ReservationsExcursionTitle}>{excursion.title}</h4>
                                    <p>Number of reservations: <span>{excursion.reservations.length}</span></p>
                                </div>
                                <div className={styles.ExcursionHeading}>
                                    <p>No</p>
                                    <p>Name Surname</p>
                                    <p>E-mail</p>
                                    <p>Phone</p>
                                </div>
                                <ul className={styles.ReservationsList}>
                                    {
                                        excursion.reservations.map((reservation, i) => {
                                            return (
                                                <li key={i} className={styles.ReservationsListItem}>
                                                    <span>{i + 1}.</span>
                                                    <span>{`${reservation.firstName} ${reservation.lastName}`}</span>
                                                    <span>{reservation.email}</span>
                                                    <span>{reservation.phone}</span>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </Container>
    );
}

export default Reservations;