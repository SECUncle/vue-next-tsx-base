declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare interface CustomEleProps {
  style: {
    [key: string]: string;
  } | string;
  className: string;
}

declare interface W {
  style: {
    [key: string]: string;
  } | string;
  className: string;
}

interface Window {
  hljs: {
    highlightBlock: () => void;
  };
}