import React from 'react';
import ReactDOM from 'react-dom/client';
import { WidgetRoot } from './components/WidgetRoot';
import styles from './index.css?inline';

class LovableTemplateElement extends HTMLElement {
  private root: ReactDOM.Root | null = null;

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    
    // Inject styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    shadow.appendChild(styleSheet);
    
    // Create container
    const container = document.createElement('div');
    shadow.appendChild(container);
    
    // Render React component
    this.root = ReactDOM.createRoot(container);
    this.root.render(
      <React.StrictMode>
        <WidgetRoot />
      </React.StrictMode>
    );
  }

  disconnectedCallback() {
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }
  }
}

// Register the custom element
const TAG_NAME = import.meta.env.VITE_WIDGET_TAG ?? 'lovable-widget';
(window as any).__LOVABLE_WIDGET_TAG__ = TAG_NAME;

if (!customElements.get(TAG_NAME)) {
  customElements.define(TAG_NAME, WidgetElement);
}

export { LovableTemplateElement };
