import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArticleContent from "../../components/Article/ArticleContent/ArticleContent";
import PageTitle from "../../components/Title/PageTitle";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import useBreadcrumbs from "../../hooks/useBreadcrumbs";
import Aside from "../../components/Article/Aside/Aside";
import styles from "./SingleNews.module.scss";
import Container from "../../components/Container/Container";

const SingleNews = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const pathParts = useBreadcrumbs();
  const formattedPathParts = [pathParts[0], article?.title];

  useEffect(() => {
    const getArticleById = async () => {
      const response = await fetch(`https://vintage-wine-nyw6.onrender.com/api/news/${id}`);
      const fetchedArticle = await response.json();
      setArticle(fetchedArticle);
    };
    getArticleById();
  }, [id]);


  if (!article) {
    return null;
  }

  return (
    <Container>
      <PageTitle text="News" />
      <Breadcrumbs pathParts={formattedPathParts} />
      <div className={styles.Wrapper}>
        <ArticleContent article={article} />
        <Aside article={article} />
      </div>
    </Container>
  );
};

export default SingleNews;
