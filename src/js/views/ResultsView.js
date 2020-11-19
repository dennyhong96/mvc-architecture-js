import View from "./View";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _errMessage = "No recipes found for your query, please try something else.";
  _message = "";

  // Renders recipe list into parent container
  render(data) {
    if (!data.length) return this.renderError();

    this._data = data;

    // Clears existing html in parent container
    this._clear();

    const recipeListMarkup = this._generateMarkup();

    // Inserts markup
    this._parentElement.insertAdjacentHTML("afterbegin", recipeListMarkup);
  }

  // Generates recipe list markup
  _generateMarkup() {
    return `
    ${this._data
      .map(
        (recipe) => `
    <li class="preview">
      <a class="preview__link" href="#${recipe.id}">
        <figure class="preview__fig">
          <img src="${recipe.image}" alt="${recipe.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${recipe.title}</h4>
          <p class="preview__publisher">${recipe.publisher}</p>
          <div class="preview__user-generated"></div>
        </div>
      </a>
    </li>`
      )
      .join("")}`;
  }
}

export default new ResultsView();
