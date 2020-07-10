/**
 *
 */
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@config/routers';

const Index = () => {
  const params = useParams();
  const query = useQuery();
  console.log(params);
  console.log(query);
  return <div>detail</div>;
};

Index.displayName = 'ItemDetail';
export default Index;
