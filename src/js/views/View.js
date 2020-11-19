import icons from "url:../../img/icons.svg";

export default class View {
  _data;

  /**
   * Compares DOM tree elements with a virtual DOM then updates textContent and attributes
   * @param {object | object[]} data - The updated data to be rendered (e.g recipe)
   * @returns {undefined} Does not return
   * @this {object} The View instance
   * @author Denny Hong
   */
  update(data) {
    this._data = data;

    // Generates markup
    const newMarkup = this._generateMarkup();

    // Generates a new virtual DOM in memory from new markup string
    const virtualDOM = document.createRange().createContextualFragment(newMarkup);

    // Selects all elements in the new virtual DOM
    const newElements = [...virtualDOM.querySelectorAll("*")];

    // Selects all current elements in real DOM
    const currElements = [...this._parentElement.querySelectorAll("*")];

    // Compare and update current element's text content and data attribute
    newElements.forEach((newEl, i) => {
      const currEl = currElements[i];

      // Update changed text
      // .isEqualNode() compares if content in two nodes are the same
      // Node.nodeValue returns content of text node, or null for other type of nodes
      if (!newEl.isEqualNode(currEl) && newEl.firstChild?.nodeValue?.trim() !== "") {
        currEl.textContent = newEl.textContent;
      }

      // Update changed button data attribute
      if (!newEl.isEqualNode(currEl)) {
        // Copy the virtual DOM element's attributes to current DOM element's
        [...newEl.attributes].forEach((attr) => currEl.setAttribute(attr.name, attr.value));
      }
    });
  }

  /**
   * Renders the received object into DOM
   * @param {object | object[]} data - The data to be rendered (e.g recipe)
   * @param {boolean} [render=true] - If false, returns markup string instead of rendering to DOM
   * @returns {undefined | string} A markup string is returned if render = false
   * @this {object} The View instance
   * @author Denny Hong
   * @todo Finish implementation
   */
  render(data, render = true) {
    if (!data || (data instanceof Array && !data.length)) return this.renderError();

    this._data = data;

    // Generates markup
    const markup = this._generateMarkup();

    if (!render) return markup;

    // Clears existing markup
    this._clear();

    // Appends markup to document
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

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
