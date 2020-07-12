/**
 *
 */
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@/config/routers';
import Comp from '@components'

const Index = () => {
  const params = useParams();
  const query = useQuery();
  console.log(params);
  console.log(query);
  return <div>detail<Comp /></div>;
};

Index.displayName = 'ItemDetail';
export default Index;
