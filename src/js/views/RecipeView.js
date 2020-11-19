// import icons from "../../img/icons.svg"; // Parcel v1
import icons from "url:../../img/icons.svg"; // Parcel v2

class RecipeView {
  // Private fields
  #parentElement = document.querySelector(".recipe");
  #data;

  // Renders recipe into recipe container
  render(data) {
    this.#data = data;

    // Generates markup
    const markup = this.#generateMarkup();

    // Clears existing markup
    this.#clear();

    // Appends markup to document
    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  // Renders spinner loader into recipe container
  renderSpinner() {
    // Builds spinner markup
    const spinnerMarkup = `
  <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>`;

    // Clear existin markup in parent container
    this.#parentElement.innerHTML = "";

    // Appends markup to parent container
    this.#parentElement.insertAdjacentHTML("afterbegin", spinnerMarkup);
  }

  // Clears recipe container
  #clear() {
    this.#parentElement.innerHTML = "";
  }

  // Generate recipe markup
  #generateMarkup() {
    return `
    <figure class="recipe__fig">
      <img src="${this.#data.image}" alt="${this.#data.title}" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${this.#data.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${this.#data.cookingTime}</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${this.#data.servings}</span>
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
      ${this.#data.ingredients
        .map(
          ({ description, quantity, unit }) => `
        <li class="recipe__ingredient">
          <svg class="recipe__icon">
            <use href="${icons}#icon-check"></use>
          </svg>
          ${quantity ? `<div class="recipe__quantity">${quantity}</div>` : ""}
          <div class="recipe__description">
            ${unit ? `<span class="recipe__unit">${unit}</span>` : ""}
            ${description}
          </div>
        </li>`
        )
        .join("")}
      </ul>
    </div>

    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${this.#data.publisher}</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${this.#data.sourceUrl}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </a>
    </div>`;
  }
}

export default new RecipeView();
