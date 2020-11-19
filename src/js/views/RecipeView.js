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

  attachServingsHandler(handler) {
    this._parentElement.addEventListener("click", function (evt) {
      const btn = evt.target.closest(".btn--update-servings");

      // Handle user not clicked on serving btns
      if (!btn) return;

      // Handle invalid serverings
      const { updateServingsTo } = btn.dataset;
      if (Number(updateServingsTo) <= 0) return;

      // Handle update servings
      handler(Number(updateServingsTo));
    });
  }

  attachBookmarkController(handler) {
    this._parentElement.addEventListener("click", function (evt) {
      const btn = evt.target.closest(".btn--bookmark");

      // Handle not clicked on bookmark button
      if (!btn) return;

      handler();
    });
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
          <button data-update-servings-to="${
            this._data.servings - 1
          }" class="btn--tiny btn--update-servings">
            <svg>
              <use href="${icons}#icon-minus-circle"></use>
            </svg>
          </button>
          <button data-update-servings-to="${
            this._data.servings + 1
          }" class="btn--tiny btn--update-servings">
            <svg>
              <use href="${icons}#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>

    <div class="recipe__user-generated ${!this._data.key ? "hidden" : ""}">
      <svg>
        <use href="${icons}#icon-user"></use>
      </svg>
    </div>

    <button class="btn--round btn--bookmark">
      <svg class="">
        <use href="${icons}#icon-bookmark${this._data.bookmarked ? "-fill" : ""}"></use>
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
