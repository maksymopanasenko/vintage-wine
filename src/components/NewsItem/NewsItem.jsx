import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import styles from "./NewsItem.module.scss";
import { fetchNewsThunk } from "../../redux/reducers/news-reducer";
import Button from "../Button/Button";
import DateBox from "../DateBox/DateBox";
import Facebook from "../Article/ArticleContent/icons/facebook.svg?react";
import Twitter from "../Article/ArticleContent/icons/twitter.svg?react";
import Linkedin from "../Article/ArticleContent/icons/linkedin.svg?react";
import NewsItemTags from "./NewsItemTags";
import Loader from "../../components/Loader/Loader";

const NewsItem = () => {
  const news = useSelector((state) => state.news.news);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNewsThunk());
  }, []);

  const content = news.length ? (
    <div className={styles.Wrapper} data-testid="News">
      {
        news.map((item) => (
          <div className={styles.Item} key={item._id}>
            <div className={styles.DateWrapper}>
              <DateBox date={item.createdAt} />
            </div>
            <img className={styles.Image} src={item.image} alt={item.name} />
            <NewsItemTags tags={item.tags} />
            <h3 className={styles.Title}>{item.title}</h3>
            <p className={styles.Desc}>{item.description[0]}</p>
            <div className={styles.ButtonSvgWrapper}>
              <Link to={`/news/${item._id}`}>
                <Button variant="small" text="Read more" />
              </Link>
              <div className={styles.SvgWrapper}>
                <a target="_blank" href="https://twitter.com/?lang=en">
                  <Linkedin className={styles.Svg} />
                </a>
                <a
                  className={styles.SvgLink}
                  target="_blank"
                  href="https://twitter.com/?lang=en"
                >
                  <Twitter className={styles.Svg} />
                </a>
                <a target="_blank" href="https://twitter.com/?lang=en">
                  <Facebook className={styles.Svg} />
                </a>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  ) : (<Loader />);

  return (
    <div className={styles.NewsContent}>
      {content}
    </div>
  );
};
export default NewsItem;
