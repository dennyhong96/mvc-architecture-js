import "core-js/stable"; //  polyfill ES6
import "regenerator-runtime"; // async/awwit polyfill

import * as model from "./model";
import recipeView from "./views/RecipeView";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

const controlRecipes = async () => {
  // Get recipe id from url
  const recipeId = window.location.hash?.slice(1);

  // Handle no hash after url
  if (!recipeId) return;

  // Render a loading spinner
  recipeView.renderSpinner();

  try {
    // Loads recipe data from api
    await model.loadRecipt(recipeId);
    const { recipe } = model.state;

    // Renders recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    alert(error.message);
  }
};

// Trys to render recipe on load or url hash changes
["load", "hashchange"].forEach((event) => window.addEventListener(event, controlRecipes));
