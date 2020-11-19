import View from "./View";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _errMessage = "No recipes found for your query, please try something else.";
  _message = "";

  // Generates recipe list markup
  _generateMarkup() {
    const id = window.location.hash.slice(1);

    return `
    ${this._data
      .map(
        (recipe) => `
    <li class="preview">
      <a class="preview__link ${recipe.id === id ? "preview__link--active" : ""}" href="#${
          recipe.id
        }">
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
