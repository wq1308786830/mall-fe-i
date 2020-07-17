/// <reference types="react-scripts" />

declare module '*.less';
declare module '*.png';
declare module '*.jpg';
declare module '*.jepg';
declare module '*.module.less' {
  const classes: { [key: string]: string };
  export default classes;
}
