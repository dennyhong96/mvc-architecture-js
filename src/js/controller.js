import "core-js/stable"; //  polyfill ES6
import "regenerator-runtime"; // async/awwit polyfill

// Model
import * as model from "./model";

// Views
import recipeView from "./views/RecipeView";
import searchView from "./views/SearchView";
import resultsView from "./views/ResultsView";

// Activate Parcel hot module reloading
module.hot && module.hot.accept();

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

const searchController = async (evt) => {
  evt.preventDefault();

  try {
    // Get value from search input
    const query = searchView.getQuery();

    // Handle no input
    if (!query) return;

    resultsView.renderSpinner();

    // Loads search results
    await model.loadSearchResults(query);

    resultsView.render(model.state.search.results);

    // Clears search input
    searchView.clearInput();
  } catch (error) {
    console.error(error);
    resultsView.renderError();
  }
};

// Trys to render recipe on load or url hash changes
const init = () => {
  recipeView.attachRenderHandler(recipeController);
  searchView.attachSearchHandler(searchController);
};
init();
