import { useEffect, useState } from 'react';
import Container from '../../components/Container/Container';
import styles from './OrdersAdmin.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import SectionTitle from '../../components/Title/SectionTitle';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { setCurrentOrderAC } from '../../redux/reducers/orderAdmin-reducer';

const Orders = () => {
    const token = useSelector((state) => state.user.token);
    const dispatch = useDispatch();
    const [orders, setOrders] = useState([]);
    const [currentTab, setCurrentTab] = useState(1);

    useEffect(() => {
        axios.get('https://vintage-wine-shop.onrender.com/api/orders/all', {
            headers: {
                "Authorization": token,
            }
        })
            .then(response => {
                setOrders(response.data)
            })
            .catch(err => console.log(err));
    }, []);

    const hangleChangeTab = (e) => {
        setCurrentTab(Number(e.target.dataset.tab));
    }

    const openSingleOrder = (id) => {
        dispatch(setCurrentOrderAC(id));
    }

    const completedOrders = orders.filter(order => order.completed);
    const newOrders = orders.filter(order => !order.completed);

    return (
        <Container>
            <div className={styles.OrdersAdmin}>
                <SectionTitle secText='Orders management' />
                <div className={styles.OrdersAdminControlls}>
                    <button className={cn(styles.OrdersAdminButton, {[styles.OrdersAdminButtonActive]: currentTab === 1})} data-tab='1' onClick={(e) => hangleChangeTab(e)}>New</button>
                    <button className={cn(styles.OrdersAdminButton, {[styles.OrdersAdminButtonActive]: currentTab === 2})} data-tab='2' onClick={(e) => hangleChangeTab(e)}>Completed</button>
                </div>
                <ul className={styles.OrdersAdminList}>
                    {
                        currentTab === 1 ? (
                            newOrders.map(order => {
                                return (
                                    <li key={order._id} className={styles.OrdersAdminItem}>
                                        <Link to={`/dashboard/orders/${order.orderNo}`} onClick={() => openSingleOrder(order.orderNo)}>{order.orderNo}</Link>
                                    </li>
                                )
                            })
                        ) : (
                            completedOrders.map(order => {
                                return (
                                    <li key={order._id} className={styles.OrdersAdminItem}>
                                        <Link to={`/dashboard/orders/${order.orderNo}`} onClick={() => openSingleOrder(order.orderNo)}>{order.orderNo}</Link>
                                    </li>
                                )
                            })
                        )
                    }
                </ul>
            </div>
        </Container>
    );
}
 
export default Orders;