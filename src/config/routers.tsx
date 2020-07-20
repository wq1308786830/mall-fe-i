import React from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import qs from 'query-string';
import App from '../pages/index';
import Item from '../pages/item';
import ItemDetail from '../pages/item/detail';
import ItemOrder from '../pages/item/order';
import ItemShare from '../pages/item/share';

const routes: RouterConfig[] = [
  {
    path: '/app',
    component: App,
    title: '/app',
  },
  {
    path: '/item',
    component: Item,
    title: 'item',
    routes: [
      {
        path: '/item/detail',
        component: ItemDetail,
        title: '商品详情',
      },
      {
        path: '/item/order',
        component: ItemOrder,
        title: '确认订单',
      },
      {
        path: '/item/share',
        component: ItemShare,
        title: '嗮单',
      },
      {
        path: '/404',
        component: App,
        title: '404',
      },
    ],
  },
];

export function useQuery() {
  const location = useLocation();

  console.log(location.search);
  return qs.parse(location.search);
}

/**
 *
 * @param route
 * @constructor
 */
export const RouteWithSubRoutes = (route: RouterConfig) => {
  return (
    <Route
      path={route.path}
      render={(props) => {
        if (route.routes && route.routes.length) {
          return (
            <Switch>
              {route.routes.map((r, i) => (
                <RouteWithSubRoutes key={i} {...r} />
              ))}
            </Switch>
          );
        } else {
          console.log(route.component.displayName);
          // pass the sub-routes down to keep nesting
          return <route.component {...props} />;
        }
      }}
    />
  );
};

/**
 * 根路由
 * @constructor
 */
const ComposedRouter = () => {
  return (
    <Router>
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </Router>
  );
};

export default ComposedRouter;
