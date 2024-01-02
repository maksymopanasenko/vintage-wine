import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCatalogThunk } from "../../redux/reducers/catalog-reducer";
import { Link } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";
import useBreadcrumbs from "../../hooks/useBreadcrumbs";

import Container from "./../../components/Container/Container";
import styles from "./Catalog.module.scss";
import Breadcrumbs from "./../../components/Breadcrumbs/Breadcrumbs";
import PageTitle from "../../components/Title/PageTitle";
import Loader from "../../components/Loader/Loader";

const Catalog = () => {
  const pathParts = useBreadcrumbs();
  const dispatch = useDispatch();
  const catalog = useSelector((state) => state.catalog.catalog);

  useEffect(() => {
    dispatch(fetchCatalogThunk());
  }, [dispatch]);

  const content = catalog.length ? (
    <div className={styles.CatalogList}>
      {
        catalog.map((item) => {
          const itemLinkCatalog = item.name.toLowerCase();
          return (
            <Link
              to={`/catalog/${itemLinkCatalog}`}
              key={item.id}
              className={styles.itemCatalog}
            >
              <img src={item.imageUrl} alt={item.name} />
              <h4 className={styles.itemCatalogTitle}>{item.name}</h4>
            </Link>
          );
        })
      }
    </div>
  ) : (<Loader />);

  return (
    <section className={styles.f}>
      <Container>
        <PageTitle text={'Our catalog'} />
        {<Breadcrumbs pathParts={pathParts} />}
        <div className={styles.CatalogContent}>
          {content}
        </div>
      </Container>
    </section>
  );
};

export default Catalog;
