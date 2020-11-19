#### An example of using vanilla JS to implement MVC Architecture

##### Model, View, and controller for rendering "Recipe" userflow:

<img src="./architecture/forkify-architecture-recipe-loading.png" alt="mvc">

##### Custom DOM updating algorithm to avoid heavy DOM tree replacement:

```JavsScript
export default class View {
  _data;

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
// ......
}

```
