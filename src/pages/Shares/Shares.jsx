import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import PageTitle from "../../components/Title/PageTitle";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import styles from "./Shares.module.scss"
import Container from "../../components/Container/Container";

const Shares = () => {
    const {id} = useParams();
    const [userName, setUserName] = useState('');
    const formattedPathParts = [userName?.pathParts]

    useEffect(() => {
        const getArticleById = async () => {
            const response = await fetch(`https://vintage-wine-shop.onrender.com/api/shares/${id}`)
            const result = await response.json();
            setUserName(result);
        }
        getArticleById();
    }, [id]);

    return (
        <Container>
            <PageTitle text="Shares"/>
            {<Breadcrumbs pathParts={formattedPathParts}/>}
            <div className={`${styles.container}`}>
                <div className={`${styles.imgHideContainer} ${styles.div1}`}>
                    <img src={userName.imageURL} alt={userName.name} />
                    <p className={`${styles.textDiscount}`}> -{userName.discount}%</p>
                    <span className={`${styles.b1}`}></span>
                    <span className={`${styles.b2}`}></span>
                    <span className={`${styles.b3}`}></span>
                    <span className={`${styles.b4}`}></span>
                </div>
                <div className={`${styles.textContainer} ${styles.div2}`}>
                    <div className={`${styles.infoContainer}`}>
                        <h4>{userName.name}</h4>
                        <p><span className={`${styles.info}`}>Condition:</span> {userName.conditions}</p>
                        <p><span className={`${styles.info}`}>Valid on:</span> {userName.productCategories}</p>
                        {userName.end ? (
                            <p><span className={`${styles.info}`}>End of promotion:</span>{userName.end}</p>
                        ) : (
                            <p><span className={`${styles.info}`}>The promotion is valid: </span>constantly</p>
                        )}
                    </div>
                </div>
                <p className={`${styles.description} ${styles.div3}`}>{userName.description}</p>
            </div>
        </Container>
    )
}

export default Shares;