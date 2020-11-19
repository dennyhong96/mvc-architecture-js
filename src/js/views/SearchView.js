// This class not rendering anything
// used to get search input and handle search submit
class SearchView {
  _parentElement = document.querySelector(".search");

  // Returns input value from search input field
  getQuery() {
    return this._parentElement.querySelector(".search__field").value;
  }

  // Attaches search handler on form
  attachSearchHandler(handler) {
    this._parentElement.addEventListener("submit", handler);
  }

  clearInput() {
    this._parentElement.querySelector(".search__field").value = "";
  }
}

export default new SearchView();
