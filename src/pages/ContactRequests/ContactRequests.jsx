import { useEffect, useState } from 'react';
import Container from '../../components/Container/Container';
import SectionTitle from '../../components/Title/SectionTitle';
import styles from './ContactRequests.module.scss'
import { useSelector } from 'react-redux';
import axios from 'axios';
import cn from 'classnames';
import RedBell from './icons/Bell.svg?react';
import Trash from './icons/delete.svg?react';

const ContactRequests = () => {
    const token = useSelector((state) => state.user.token);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        axios.get('https://vintage-wine-shop.onrender.com/api/contact', {
            headers: {
                "Authorization": token,
            }
        })
            .then(request => {
                setRequests(request.data)
            })
            .catch(err => console.log(err));
    }, []);

    const handleReadRequest = (request) => {
        request.isRead = true;
        axios.put(`https://vintage-wine-shop.onrender.com/api/contact/${request._id}`, request, {
            headers: {
                "Authorization": token,
            }
        })
            .then(request => {
                setRequests(request.data)
            })
            .catch(err => console.log(err));
    }

    const handleDeleteRequest = (id) => {
        axios.delete(`https://vintage-wine-shop.onrender.com/api/contact/${id}`, {
            headers: {
                "Authorization": token,
            }
        })
            .then(request => {
                setRequests(request.data)
            })
            .catch(err => console.log(err));
    }

    const unreadRequests = requests?.filter(request => !request.isRead);
    const readRequests = requests?.filter(request => request.isRead);

    return (
        <Container>
            <div className={styles.ContactRequests}>
                <SectionTitle secText="Contact Requests" />
                <ul className={styles.ContactRequestsUnread}>
                    {
                        unreadRequests.length ? (
                            unreadRequests.map(request => {
                                return (
                                    <li key={request._id} className={cn(styles.ContactItem, { [styles.ContactItemUnread]: !request.isRead })} onClick={() => handleReadRequest(request)}>
                                        New request <RedBell />
                                    </li>
                                )
                            })
                        ) : (
                            "There are no new messages"
                        )
                    }
                </ul>
                <ul className={styles.ContactRequestsList}>
                    {
                        readRequests.map(request => {
                            return (
                                <li key={request._id} className={styles.ContactRequestsData}>
                                    <div className={styles.ContactRequestsMainInfo}>
                                        <div className={styles.ContactRequestsPersonalData}>
                                            <p>Name: {request.name}</p>
                                            <p>E-mail: {request.email}</p>
                                            <p>Phone: {request.mobilePhone}</p>
                                        </div>
                                        <Trash onClick={() => handleDeleteRequest(request._id)}/>
                                    </div>
                                    <p className={styles.ContactRequestsDataMsg}>{request.question}</p>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </Container>
    );
}

export default ContactRequests;