import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import Navigation from '../Navigation/Navigation';
import CloseBtn from '../../assets/icons/close.svg?react';
import { openMenuAC } from '../../redux/reducers/mobMenu-reducer';
import styles from './DropdownMenu.module.scss';

function DropdownMenu() {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();

  const handleClose = (e) => {
    const { target } = e;
    if (!target.closest(`.${styles.DropdownClose}`)
    && target.nodeName !== 'A') return;

    setIsVisible(!isVisible);

    setTimeout(() => {
      dispatch(openMenuAC());
    }, 600);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(!isVisible);
    }, 0);
  }, []);

  return (
    <div className={styles.DropdownMenu} data-testid="DropdownMenu" onClick={handleClose}>
      <div className={cn(
        styles.DropdownHidden,
        { [styles.DropdownVisible]: isVisible },
      )}
      >
        <CloseBtn className={styles.DropdownClose} />
        <div className={styles.DropdownBody}>
          <h2 className={styles.DropdownTitle}>
            <span>Menu</span>
          </h2>
          <Navigation mobile />
        </div>
      </div>
    </div>
  );
}

export default DropdownMenu;
