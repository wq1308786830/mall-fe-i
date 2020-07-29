import React, { useEffect } from 'react';

function Index(props) {
  //
  const { children } = props;

  useEffect(() => {}, []);
  //
  return <div>{children}</div>;
}

Index.getInitialProps = async () => {
  return {};
};

export default Index;
