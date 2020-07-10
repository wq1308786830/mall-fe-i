interface RouterConfig {
  path: string;
  component: React.Element;
  title: string;
  routes?: RouterConfig[];
}
