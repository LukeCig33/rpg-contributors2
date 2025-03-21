/**
 * Copyright 2025 LukeCig33
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import '@haxtheweb/rpg-character/rpg-character.js';

/**
 * `rpg-contributors2`
 * 
 * @demo index.html
 * @element rpg-contributors2
 */
export class RpgContributors2 extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "rpg-contributors2";
  }

  constructor() {
    super();
    this.title = "";
    this.items = [];
    this.organization = "haxtheweb";
    this.repository = "webcomponents";
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/rpg-contributors2.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
    
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      items: { type: Array },
      organization: { type: String },
      repository: { type: String },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        display: inline-block;
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      h3 span {
        font-size: var(--rpg-contributors2-label-font-size, var(--ddd-font-size-s));
      }
    `];
  }

    // Lit render the HTML
    render() {
      return html`
        <div class="results">
          ${this.items.map((item, index) => html`
            <div class="wrapper">
              <h3>${item.login}</h3>
              <rpg-character
                seed="${item.login}"
              ></rpg-character>
              <slot></slot>
            </div>
            `)}
          </div>
        </div>`;
    }

    // life cycle will run when anything defined in `properties` is modified
    updated(changedProperties) {
      // see if value changes from user input and is not empty
      if (changedProperties.has('organization')) {
       this.updateResults();
      }
    }

    updateResults() {
      fetch(`https://api.github.com/repos/${this.organization}/${this.repository}/contributors`).then(d => d.ok ? d.json(): {}).then(data => {
        if (data) {
          this.items = [];
          this.items = data;
          console.log(this.items);
        } 
      });
    }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(RpgContributors2.tag, RpgContributors2);