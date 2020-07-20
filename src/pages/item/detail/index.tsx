/**
 *
 */
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@/config/routers';
import Comp from '@components';
import { getItemDetail } from '@/services/goods';

import img from '@/assets/images/icon-trumpet.png';
import css from './index.less';

const Index = () => {
  // const params = useParams();
  const query = useQuery();

  useEffect(() => {
    console.log(query);
    getItemDetail(query);
  }, [query]);
  return (
    <div className={css.actionContent}>
      detail
      <div className={css.iconCheckedSquare} />
      <div className={css.trumpet} />
      <img src={img} alt="" />
      <Comp />
    </div>
  );
};

Index.displayName = 'ItemDetail';
export default Index;
