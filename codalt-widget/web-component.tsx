import React from "react";
import ReactDOM from "react-dom/client";
import { WidgetRoot } from "../src/components/WidgetRoot";
import styles from "../src/index.css?inline";

class WidgetElement extends HTMLElement {
  private root: ReactDOM.Root | null = null;

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });

    // styles
    const styleEl = document.createElement("style");
    styleEl.textContent = styles;
    shadow.appendChild(styleEl);

    // container
    const container = document.createElement("div");
    shadow.appendChild(container);

    // render
    this.root = ReactDOM.createRoot(container);
    this.root.render(
      <React.StrictMode>
        <WidgetRoot />
      </React.StrictMode>
    );
  }

  disconnectedCallback() {
    this.root?.unmount();
    this.root = null;
  }
}

// Widget naam komt uit de workflow (random maar stabiel)
const TAG_NAME = import.meta.env.VITE_WIDGET_TAG || "lovable-widget";

// Maak naam zichtbaar op de Pages index pagina
(window as any).__LOVABLE_WIDGET_TAG__ = TAG_NAME;

// Idempotent registreren
if (!customElements.get(TAG_NAME)) {
  customElements.define(TAG_NAME, WidgetElement);
}

export { WidgetElement };
