import { useEffect, useState } from 'react';
import Container from '../../components/Container/Container';
import styles from './SingleOrder.module.scss'
import { useSelector } from 'react-redux';
import axios from 'axios';
import SectionTitle from '../../components/Title/SectionTitle';
import cn from 'classnames';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import useBreadcrumbs from '../../hooks/useBreadcrumbs';
import { formattedDate } from '../../helpers/formatteDate';
import Button from "../../components/Button/Button";

const SingleOrder = () => {
    const currentOrderId = useSelector((state) => state.orderAdmin.currentOrder);
    const token = useSelector((state) => state.user.token);
    const [currentOrder, setCurrentOrder] = useState({});
    const [checked, setChecked] = useState(0);
    const pathParts = useBreadcrumbs();

    useEffect(() => {
        axios.get(`https://vintage-wine-nyw6.onrender.com/api/orders/${currentOrderId}`, {
            headers: {
                "Authorization": token,
            }
        })
            .then(response => {
                setCurrentOrder(response.data)
            })
            .catch(err => console.log(err));
    }, []);

    const handleCheck = (e) => {
        if (e.target.checked) {
            setChecked(prev => prev + 1);
        } else {
            setChecked(prev => prev - 1);
        }
    }

    const handleShipment = () => {
        currentOrder.completed = true;
        axios.put(`https://vintage-wine-nyw6.onrender.com/api/orders/${currentOrderId}`, currentOrder, {
            headers: {
                "Authorization": token,
            }
        })
            .then(response => {
                setCurrentOrder(response.data)
            })
            .catch(err => console.log(err));
    }

    return (
        <Container>
            <div className={styles.SingleOrder}>
                {currentOrder.orderNo && (
                    <SectionTitle secText='Order details' />
                )}
                <Breadcrumbs pathParts={pathParts.slice(1)} noPrefix />
                <div className={styles.SingleOrderBody}>
                    <div className={styles.SingleOrderSegment}>
                        <div className={styles.SingleOrderData}>
                            <p className={styles.SingleOrderNumber}>Order number: <span className={styles.SingleOrderNumber}>{currentOrder?.orderNo}</span></p>
                            <p className={styles.SingleOrderNumber}>Order date: <span>{formattedDate(currentOrder?.date || 0)}</span></p>
                            {currentOrder.completed && (
                                <p className={styles.SingleOrderNumber}>Shipment date: <span>{formattedDate(currentOrder?.shipmentDate || 0)}</span></p>
                            )}
                        </div>
                        <Button text={currentOrder.completed ? "Completed" : "Confirm shipment"} variant='xSmall' color={currentOrder.completed ? "success" : ""} isDisabled={currentOrder.completed || currentOrder?.products?.length !== checked} onClick={handleShipment} />
                    </div>

                    <div className={styles.SingleOrderSegment}>
                        <div className={styles.SingleOrderDetails}>
                            <h4 className={styles.SingleOrderSubTitle}>Customer:</h4>
                            <ul className={styles.SingleOrderDetailsList}>
                                <li>Name: <span>{currentOrder?.customerName}</span></li>
                                <li>Phone: <span>{currentOrder?.mobile}</span></li>
                                <li>E-mail: <span>{currentOrder?.email}</span></li>
                            </ul>
                        </div>
                        <div className={styles.SingleOrderDetails}>
                            <h4 className={styles.SingleOrderSubTitle}>Delivery:</h4>
                            <ul className={styles.SingleOrderDetailsList}>
                                <li>Address: <span>{currentOrder?.deliveryAddress?.address}</span></li>
                                <li>City: <span>{currentOrder?.deliveryAddress?.city}</span></li>
                                <li>Country: <span>{currentOrder?.deliveryAddress?.country}</span></li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.SingleOrderHeading}>
                        <p>No.</p>
                        <p>Product name</p>
                        <p>Vendor code</p>
                        <p>Quantity</p>
                        <p>Packed</p>
                    </div>
                    <ul className={styles.SingleOrderProducts}>
                        {
                            currentOrder?.products?.map((product, i) => (
                                <li key={product._id} className={styles.SingleOrderProductsItem}>
                                    <span>{i + 1}.</span>
                                    <p>{product.instance.name}</p>
                                    <p>{product.instance.characteristics.vendorCode}</p>
                                    <p>{product.quantity}</p>
                                    <input
                                        type="checkbox"
                                        onChange={handleCheck}
                                        disabled={currentOrder.completed}
                                    />
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </Container>
    );
}

export default SingleOrder;