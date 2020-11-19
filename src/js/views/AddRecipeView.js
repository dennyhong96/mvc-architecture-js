import View from "./View";

class AddRecipeView extends View {
  _parentElement = document.querySelector(".upload");
  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");

  constructor() {
    super(); // To use `this` keyword in constructor

    // Attach handlers upon instanciating this class
    this._attachShowWindowHandler();
    this._attachHideWindowHandler();
    this.attachUploadHandler();
  }

  // Handle submit form
  attachUploadHandler(handler) {
    this._parentElement.addEventListener("submit", handler);
  }

  // Show add recipe popup winodw and overlay
  _attachShowWindowHandler() {
    this._btnOpen.addEventListener(
      "click",
      this.toggleWindow.bind(this) // Event hanler's `this` points to evt.target by default
    );
  }

  // Hide add recipe popup winodw and overlay
  _attachHideWindowHandler() {
    [this._overlay, this._btnClose].forEach((el) => {
      el.addEventListener("click", this.toggleWindow.bind(this));
    });
  }

  toggleWindow() {
    this._overlay.classList.toggle("hidden");
    this._window.classList.toggle("hidden");
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
