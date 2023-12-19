import { useDispatch, useSelector } from "react-redux";
import { removeAll } from "../../redux/reducers/cart-reducer";
import Counter from "../Counter/Counter";
import Basket from "./img/delete.svg?react";
import axios from "axios";
import cn from 'classnames';

import styles from "./CartItem.module.scss";


const CartItem = ({ count, product, popUpView }) => {
    const {
        name,
        productImg,
        _id,
        currentPrice,
        cartDescription,
        characteristics,
    } = product;

    const { grape, color } = characteristics;

    const token = useSelector((state) => state.user.token);
    const dispatch = useDispatch();

    const removeProduct = () => {
        dispatch(removeAll(_id));
        if (token) {
            try {
                axios
                    .delete(`https://vintage-wine-nyw6.onrender.com/api/cart/${_id}`, {
                        headers: {
                            Authorization: token,
                        },
                    })
                    .catch(err => console.log(err));
            } catch (err) {
                console.log(err);
            }
        }
    };


    return (
        <div className={cn(styles.Cart, { [styles.popUpView]: popUpView })}>
            <div className={styles.CartImg}>
                <img src={productImg} alt="image" className={styles.Img} />
            </div>

            <div className={styles.CartInfo}>
                <div className={styles.CartTitle}>
                    <h2 className={styles.TitleName}>{name}</h2>
                    {grape.grape && (
                        <p className={styles.SubText}>
                            {grape.grape}, {color.color}
                        </p>
                    )}
                    {!popUpView ? <p className={styles.Text}>{cartDescription}</p> : ''}

                </div>

                <div className={styles.CartContent}>
                    <div className={styles.PriceInfo}>
                        <p className={styles.Price}>{(currentPrice * count).toFixed(2)}</p>
                        <p className={styles.Currency}>UAH</p>
                    </div>

                    <div className={styles.Counter}>
                        <Counter id={_id} count={count} data={product} />
                    </div>

                    <button onClick={removeProduct} className={styles.Trash}>
                        {<Basket className={styles.BasketSvg} />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
