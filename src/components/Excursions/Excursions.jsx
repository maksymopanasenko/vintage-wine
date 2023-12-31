import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../Container/Container';
import SectionTitle from './../Title/SectionTitle';
import SingleExcursion from '../SingleExcursion/SingleExcursion';
import Button from '../Button/Button';

import styles from './Excursions.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExcursionsThunk } from '../../redux/reducers/excursions-reducer';

const Excursions = () => {
  const excursions = useSelector((state) => state.excursions.excursions);
  const [readMore, setReadMore] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleReadMore = () => {
    setReadMore(!readMore);
  }

  const handleRedirect = () => {
    navigate('/news');
  };

  const mapedExcursions = excursions?.map((excursion, i) => {
    const isReverse = i % 2 === 0 ? false : true;
    return <SingleExcursion key={excursion._id} orderNum={i + 1} data={excursion} reverse={isReverse} />
  });

  const renderedExcursions = () => {
    if (!readMore) {
      if (mapedExcursions.length > 1) {
        return mapedExcursions.slice(0, 2);
      } else {
        return mapedExcursions.slice(0, 1);
      }
    } else {
      return mapedExcursions;
    }
  }

  useEffect(() => {
    dispatch(fetchExcursionsThunk());
  }, []);

  return (
    <section className={styles.Excursions} data-testid="Excursions">
      <Container>
        <SectionTitle secText={'Excursions'} subText={'Our'} />
        {excursions.length ? (
          <div className={styles.ExcursionsWrapper}>
            {renderedExcursions()}
            <div className={styles.ExcursionsBtn}>
              {!readMore && mapedExcursions.length > 2 &&
                (<Button
                  text='Read more'
                  variant='small'
                  onClick={handleReadMore} />)
              }
            </div>
          </div>
        ) : (
          <div className={styles.ExcursionsInfo}>
            <p className={styles.ExcursionsText}>
              There are no available excurtions at the moment. Follow the information on our news page.
            </p>
            <button className={styles.ExcursionsLinkHolder} onClick={handleRedirect}>News</button>
          </div>
        )}
      </Container>
    </section>
  );
}

export default Excursions;
