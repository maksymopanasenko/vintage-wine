import {useEffect, useState} from "react";
import {Link} from "react-router-dom"
import PropTypes from "prop-types";
import NewsItemTags from "../../NewsItem/NewsItemTags";
import styles from "./Aside.module.scss"
import Container from "../../Container/Container";


const Aside = ({article}) => {

    const [articles, setArticles] = useState([])

    useEffect(() => {
        const getRelatedItems = async () => {
            const promises = article?.related.map((id) => {
                return fetch(`https://vintage-wine-nyw6.onrender.com/api/news/${id}`)
                    .then(res => res.json())
            })
            const fetchedArticles = await Promise.all(promises)
            setArticles(fetchedArticles)
        }
        getRelatedItems()

    }, [article]);

    return (
        <Container>
            <aside className={styles.Wrapper} data-testid="Aside">
                {articles.map((articleItem) => (
                    <div className={styles.ItemWrapper} key={articleItem._id}>
                        <img className={styles.Img} src={articleItem.image} alt=""/>
                        <NewsItemTags tags={articleItem.tags}/>
                        <h2 className={styles.Title}>{articleItem.title}</h2>
                        <p className={styles.Description}>{articleItem.description[0].split(" ").slice(0, 26).join(" ")}</p>
                        <Link className={styles.Link} to={`/news/${articleItem._id}`}>Read more...</Link>
                    </div>
                ))}
            </aside>
        </Container>
    )
}

Aside.propTypes = {
    article: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.arrayOf(PropTypes.string),
        image: PropTypes.string,
        createdAt: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.string),
        related: PropTypes.arrayOf(PropTypes.string),
        _id: PropTypes.string,
    })
}

Aside.defaultProps = {
    article: {}
}

export default Aside;
