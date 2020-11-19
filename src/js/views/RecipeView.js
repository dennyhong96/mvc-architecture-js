import { Fraction } from "fractional";

// import icons from "../../img/icons.svg"; // Parcel v1
import icons from "url:../../img/icons.svg"; // Parcel v2
import View from "./View";

class RecipeView extends View {
  // Private fields
  _parentElement = document.querySelector(".recipe");
  _errMessage = "We cound not find that recipe, please try another one.";
  _message = "";

  // View in MVC shouldn't be aware of controller directly
  // So don't import controller and use it
  // Use a pubsub pattern:
  // `attachRenderHandler` is the publisher of pubsub
  attachRenderHandler(handler) {
    // `handler` is the subscriber of pubsub
    ["load", "hashchange"].forEach((event) => window.addEventListener(event, handler));
  }

  // Renders recipe into recipe container
  render(data) {
    this._data = data;

    // Generates markup
    const recipeMarkup = this._generateMarkup();

    // Clears existing markup
    this._clear();

    // Appends markup to document
    this._parentElement.insertAdjacentHTML("afterbegin", recipeMarkup);
  }

  // Generate recipe markup
  _generateMarkup() {
    return `
    <figure class="recipe__fig">
      <img src="${this._data.image}" alt="${this._data.title}" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${this._data.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingTime}</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
        <span class="recipe__info-text">servings</span>

        <div class="recipe__info-buttons">
          <button class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${icons}#icon-minus-circle"></use>
            </svg>
          </button>
          <button class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${icons}#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>

    <div class="recipe__user-generated">
      <svg>
        <use href="${icons}#icon-user"></use>
      </svg>
    </div>
    <button class="btn--round">
      <svg class="">
        <use href="${icons}#icon-bookmark-fill"></use>
      </svg>
    </button>
    </div>

    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
      ${this._generateMarkupIngredients(this._data.ingredients)}
      </ul>
    </div>

    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${this._data.publisher}</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${this._data.sourceUrl}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </a>
    </div>`;
  }

  // Generate markup list for recipe ingredients
  _generateMarkupIngredients(ingredients) {
    return ingredients
      .map(
        ({ description, quantity, unit }) => `
    <li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${icons}#icon-check"></use>
      </svg>
      ${quantity ? `<div class="recipe__quantity">${new Fraction(quantity).toString()}</div>` : ""}
      <div class="recipe__description">
        ${unit ? `<span class="recipe__unit">${unit}</span>` : ""}
        ${description}
      </div>
    </li>`
      )
      .join("");
  }
}

export default new RecipeView();
