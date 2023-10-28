import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCatalogThunk } from '../../redux/reducers/catalog-reducer';
import Container from './../../components/Container/Container';
import { Link } from 'react-router-dom';
import styles from './Catalog.module.scss';
import useBreadcrumbs from '../../hooks/useBreadcrumbs';
import Breadcrumbs from './../../components/Breadcrumbs/Breadcrumbs';
const Catalog = () => {
    const pathParts = useBreadcrumbs();
    const dispatch = useDispatch();
    const catalog = useSelector((state) => state.catalog.catalog);
    useEffect(() => {
        dispatch(fetchCatalogThunk());
    }, [dispatch]);
    return (
        <section>
            <Container>
                <h3 className="vvPageTitle">Our catalog </h3>
                {<Breadcrumbs pathParts={pathParts} />}
                <div className={styles.CatalogList}>
                    {catalog.map((item) => {
                        const itemLinkCatalog = item.name.toLowerCase();
                        return (
                            <Link to={`/catalog/${itemLinkCatalog}`} key={item.id} className={styles.itemCatalog}>
                                <img src={item.imageUrl} alt={item.name} />
                                <h4 className={styles.itemCatalogTitle}>{item.name}</h4>
                            </Link>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
};

export default Catalog;