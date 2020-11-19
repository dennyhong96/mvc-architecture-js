import "core-js/stable"; //  polyfill ES6
import "regenerator-runtime"; // async/awwit polyfill

import * as model from "./model";
import recipeView from "./views/RecipeView";

// API:
// https://forkify-api.herokuapp.com/v2

const recipeController = async () => {
  // Get recipe id from url
  const recipeId = window.location.hash?.slice(1);

  // Handle no hash after url
  if (!recipeId) return;

  // Render a loading spinner
  recipeView.renderSpinner();

  try {
    // Loads recipe data from api
    await model.loadRecipt(recipeId);

    // Renders recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    console.error(`${error} 💥💥💥💥💥`);
    recipeView.renderError();
  }
};

const controlSearchResults = async () => {
  try {
    await model.loadSearchResults("pizza");
    console.log(model.state);
  } catch (error) {
    console.error(error);
  }
};
controlSearchResults();

// Trys to render recipe on load or url hash changes
const init = () => {
  recipeView.attachRenderHandler(recipeController);
};
init();
