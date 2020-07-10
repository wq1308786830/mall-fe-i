/**
 *
 */
import React from 'react';
import logo from '../logo.svg';
import { Button } from 'antd-mobile';

import css from './index.module.less';

const Index = () => {
  return (
    <div className={css.App}>
      <header className={css.AppHeader}>
        <img src={logo} className={css.AppLogo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className={css.AppLink}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button>按钮</Button>
      </header>
    </div>
  );
};

Index.displayName = 'PagesIndex';

export default Index;
