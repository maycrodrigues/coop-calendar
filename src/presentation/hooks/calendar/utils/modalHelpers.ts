import { createElement } from 'react';
import { createRoot } from 'react-dom/client';

export const createModalContainer = (
  modal: HTMLElement,
  containerId: string,
  Component: React.ComponentType<any>,
  props: any
) => {
  const container = modal.querySelector(`#${containerId}`);
  if (container) {
    const root = createRoot(container);
    root.render(createElement(Component, props));
  }
};