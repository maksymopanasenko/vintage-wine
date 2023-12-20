import { useSelector } from 'react-redux';
import styles from './BarCharts.module.scss';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { extractMonth } from '../../../../helpers/formatteDate';

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


const BarCharts = () => {
    const [orderData, setOrderData] = useState([]);
    const token = useSelector((state) => state.user.token);

    useEffect(() => {
        axios.get('https://vintage-wine-shop.onrender.com/api/orders/all', {
            headers: {
                "Authorization": token,
            }
        })
            .then(response => {
                setOrderData(response.data)
            })
            .catch(err => console.log(err));
    }, []);

    const getMonthQuantity = (month) => {
        const mon = orderData.map(item => {
            if (month === extractMonth(item.date)) {
                return item.products.reduce((acc, curr) => acc + curr.quantity, 0);
            } else {
                return 0;
            }
        });

        return mon.reduce((acc, curr) => acc + curr, 0);
    }

    const getMonthRevenue = (month) => {
        const mon = orderData.map(item => {
            if (month === extractMonth(item.date)) {
                return item.products.reduce((acc, curr) => acc + curr.instance.currentPrice, 0);
            } else {
                return 0;
            }
        });

        return mon.reduce((acc, curr) => acc + curr, 0);
    }

    const dataBar = {
        labels,
        datasets: [
            {
                label: 'Total ordered products',
                data: labels.map((label, i) => getMonthQuantity(i + 1)),
                backgroundColor: '#35a2eb',
            },
        ],
    };

    const dataBarRevenue = {
        labels,
        datasets: [
            {
                label: 'Total revenue',
                data: labels.map((label, i) => getMonthRevenue(i + 1)),
                backgroundColor: '#BE0615',
            },
        ],
    };

    return (
        <div className={styles.BarCharts}>
            <div>
                <div className={styles.BarChartsItem}>
                    <Bar data={dataBar} />
                </div>
                <div className={styles.BarChartsItem}>
                    <Bar data={dataBarRevenue} />
                </div>
            </div>
            <div>
                <h4 className={styles.BarChartsHeading}>Average check</h4>
                <ul className={styles.BarChartsList}>
                    {
                        labels.map((label, i) => {

                            return (
                                <li key={label} className={styles.BarChartsRow}>
                                    <span>{label}:</span>
                                    <span>
                                        {
                                            ((getMonthRevenue(i + 1) / (getMonthQuantity(i + 1) || 1))).toFixed(2)
                                        }
                                        ₴
                                    </span>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    );
}

export default BarCharts;