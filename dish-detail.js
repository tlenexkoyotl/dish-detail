import {html, LitElement} from 'lit-element';
import style from './dish-detail-styles.js';
import '@polymer/paper-card';
import '@polymer/paper-button';

import '@catsys/rating-component';

class DishDetail extends LitElement {
  static get properties() {
    return {
      dish: {
        type: Object
      },
      name: {
        type: String
      },
      description: {
        type: String
      },
      ratingScale: {
        type: Number
      },
      rating: {
        type: Number
      },
      energyValue: {
        type: Number
      },
      energyUnit: {
        type: String
      },
      picture: {
        type: String
      },
      isPreview: {
        type: Boolean
      }
    };
  }

  static get styles() {
    return style;
  }

  constructor() {
    super();
    this.isPreview = false;
  }

  get displayPrice() {
    return html`${this.currency} ${this.price}`;
  }

  get displayEnergyContent() {
    return html`${this.energyValue} ${this.energyUnit}`;
  }

  render() {
    const dishActions = html`
                <div id="dish-actions" class="actions">
                    <paper-button class="info" @click="${this.__updateDish}">Update</paper-button>
                    <paper-button class="error" @click="${this.__deleteDish}">Delete</paper-button>
                </div>`;

    return html`
        <paper-card image="${this.picture}">
            <div class="container">
                <div>
                    <div class="header">
                        <span>${this.name}</span>
                        <div class="location light">
                            <span>${this.displayEnergyContent}</span>
                        </div>
                    </div>
                    <rating-component scale="${this.ratingScale}" rating="${this.rating}"></rating-component>
                    <p>${this.displayPrice}</p>
                    <p class="light">${this.description}</p>
                </div>
                ${this.isPreview ? dishActions : ''}
            </div>
        </paper-card>
      `;
  }

  updated(changedProps) {
    if (changedProps.has('dish'))
      this.__formDish(changedProps.get('dish'));
  }

  __formDish() {
    this.id = this.dish.id;
    this.name = this.dish.name;
    this.description = this.dish.description;
    this.energyValue = this.dish.energyValue;
    this.rating = this.dish.rating;
    this.price = this.dish.price;
    this.picture = this.dish.picture;
    this.currency = this.dish.currency;
  }

  __updateDish() {
    this.dispatchEvent(new CustomEvent('update-dish', {detail: {dish: this.dish}}));
  }

  __deleteDish() {
    this.dispatchEvent(new CustomEvent('delete-dish', {detail: {dish: this.dish}}));
  }
}

window.customElements.define("dish-detail", DishDetail);
