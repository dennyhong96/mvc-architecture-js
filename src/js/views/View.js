import icons from "url:../../img/icons.svg";

export default class View {
  _data;

  // Renders spinner loader into parent container
  renderSpinner() {
    // Builds spinner markup
    const spinnerMarkup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>`;

    // Clear existin markup in parent container
    this._clear();

    // Appends markup to parent container
    this._parentElement.insertAdjacentHTML("afterbegin", spinnerMarkup);
  }

  // Renders an error message in parent container
  renderError(errMsg = this._errMessage) {
    const errorMarkup = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${errMsg}</p>
    </div>`;

    // Clears existing markup
    this._clear();

    // Appends markup to parent
    this._parentElement.insertAdjacentHTML("afterbegin", errorMarkup);
  }

  // Renders a message in parent container
  renderMessage(msg = this._message) {
    const messageMarkup = `
    <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${msg}</p>
    </div>`;

    // Clears existing markup
    this._clear();

    // Appends markup to parent
    this._parentElement.insertAdjacentHTML("afterbegin", messageMarkup);
  }

  // Clears the parent container
  _clear() {
    this._parentElement.innerHTML = "";
  }
}
