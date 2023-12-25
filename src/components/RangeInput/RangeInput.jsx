import React, { useContext, useEffect, useState } from 'react';
import { useFormikContext } from 'formik';
import { FilterContext } from '../../contexts/FilterContext';
import styles from './RangeInput.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { changeRangeAC } from '../../redux/reducers/tabs-reducer';

const RangeInput = () => {
  const { filter } = useContext(FilterContext);
  const range = useSelector(state => state.tabs.range);
  const dispatch = useDispatch();
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    setFieldValue("price", parseInt(range));
  }, [range]);

  useEffect(() => {
    if (Object.keys(filter).length <= 1) {
      dispatch(changeRangeAC(0))
    }
  }, [filter]);

  const handleChange = (e) => {
    dispatch(changeRangeAC(e.target.value))
  }

  return (
    <div className={styles.RangeInput} data-testid="RangeInput">
      <label htmlFor="range" className={styles.Value} style={{ left: `${range / 50}%` }}><span>{range}</span>₴</label>
      <input id="range" type="range" min="0" max="5000" value={range} onChange={handleChange} />
      <span className={styles.RangeInputMin}>0₴</span>
      <span className={styles.RangeInputMax}>5000₴</span>
    </div>
  );
}

export default RangeInput;
