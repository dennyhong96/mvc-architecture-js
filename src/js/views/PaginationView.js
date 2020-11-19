import icons from "url:../../img/icons.svg";
import View from "./View";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  attachPaginationHandler(handler) {
    this._parentElement.addEventListener("click", function (evt) {
      // Event delegation
      const paginationBtn = evt.target.closest(".btn--inline");

      // Handle event target is not pagination buttons
      if (!paginationBtn) return;

      // Handle click on button
      handler(Number(paginationBtn.dataset.toPage));
    });
  }

  // Generates pagination markup based on current page
  _generateMarkup() {
    const totalPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

    // On page 1, and there's no other page
    if (this._data.pageNum === 1 && totalPages === 1) return;

    // On age 1, and there are other pages
    if (this._data.pageNum === 1 && this._data.pageNum < totalPages) {
      return `
      <button data-to-page="${this._data.pageNum + 1}" class="btn--inline pagination__btn--next">
        <span>Page ${this._data.pageNum + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
    }

    // On last page
    if (this._data.pageNum === totalPages) {
      return `
      <button data-to-page="${this._data.pageNum - 1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this._data.pageNum - 1}</span>
      </button>`;
    }

    // On other pages
    return `
    <button data-to-page="${this._data.pageNum - 1}" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${this._data.pageNum - 1}</span>
    </button>
    <button data-to-page="${this._data.pageNum + 1}" class="btn--inline pagination__btn--next">
      <span>Page ${this._data.pageNum + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button> `;
  }
}

export default new PaginationView();
