import View from "./View";
import previewView from "./PreviewView";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _errMessage = "No recipes found for your query, please try something else.";
  _message = "";

  // Generates recipe list markup
  _generateMarkup() {
    return this._data.map((result) => previewView.render(result, false)).join("");
  }
}

export default new ResultsView();
