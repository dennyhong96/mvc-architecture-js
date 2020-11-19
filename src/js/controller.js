import "core-js/stable"; //  polyfill ES6
import "regenerator-runtime"; // async/awwit polyfill

// Model
import * as model from "./model";

// Views
import recipeView from "./views/RecipeView";
import searchView from "./views/SearchView";
import resultsView from "./views/ResultsView";
import paginationView from "./views/PaginationView";

// Activate Parcel hot module reloading
// module.hot && module.hot.accept();

const recipeController = async () => {
  // Get recipe id from url
  const recipeId = window.location.hash?.slice(1);

  // Handle no hash after url
  if (!recipeId) return;

  // Render a loading spinner
  recipeView.renderSpinner();

  // Update results view to mark selected result
  resultsView.update(model.getSearchResultsByPage());

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

    // Render recipe items by page number
    resultsView.render(model.getSearchResultsByPage());

    // Clears search input
    searchView.clearInput();

    // Render pagination
    paginationView.render(model.state.search);
  } catch (error) {
    console.error(error);
    resultsView.renderError();
  }
};

const paginationController = (toPage) => {
  // Update current page number in state
  model.updatePageNumber(toPage);

  // Re-render results by page number
  resultsView.render(model.getSearchResultsByPage(model.state.search.pageNum));

  // Re-render pagination
  paginationView.render(model.state.search);
};

const servingsController = (newServings) => {
  // Update serving in state
  model.updateServings(newServings);

  // Update recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

// Trys to render recipe on load or url hash changes
const init = () => {
  recipeView.attachRenderHandler(recipeController);
  recipeView.attachServingsHandler(servingsController);
  searchView.attachSearchHandler(searchController);
  paginationView.attachPaginationHandler(paginationController);
};
init();
