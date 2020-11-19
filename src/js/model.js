import { API_URL, RESULTS_PER_PAGE } from "./config";
import { getJSON } from "./helpers";

export const state = {
  recipe: {},
  serving: 1,
  search: {
    query: "",
    results: [],
    pageNum: 1,
    resultsPerPage: RESULTS_PER_PAGE,
  },
  bookmarks: [],
};

// Loads recipe information and stores to state
export const loadRecipt = async (recipeId) => {
  try {
    // Loads recipe data from api
    const data = await getJSON(`${API_URL}/${recipeId}`);

    let { recipe } = data.data;
    state.recipe = {
      ...cleanObject(recipe, "image_url", "source_url", "cooking_time"),
      image: recipe.image_url,
      sourceUrl: recipe.source_url,
      cookingTime: recipe.cooking_time,
      bookmarked: state.bookmarks.some((bm) => bm.id === recipe.id),
    };
  } catch (error) {
    throw error;
  }
};

// Loads search recipe results and stores to state
export const loadSearchResults = async (query) => {
  try {
    state.search.query = query;

    // Loads recipe data from api
    const data = await getJSON(`${API_URL}?search=${query}`);
    const { recipes } = data.data;

    // Stores results to state
    state.search.results = recipes.map((recipe) => ({
      ...cleanObject(recipe, "image_url"),
      image: recipe.image_url,
    }));
  } catch (error) {
    throw error;
  }
};

// Returns one page of results by page number
export const getSearchResultsByPage = (pageNum = 1) => {
  state.search.pageNum = pageNum;
  const start = (state.search.pageNum - 1) * state.search.resultsPerPage;
  const end = state.search.pageNum * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

// Updates current page number state
export const updatePageNumber = (toPage) => {
  state.search.pageNum = toPage;
};

// Update serving state and recipe ingredients quantity
export const updateServings = (newServings) => {
  state.recipe.ingredients = state.recipe.ingredients.map((ing) => ({
    ...ing,
    quantity: (newServings / state.recipe.servings) * ing.quantity,
  }));
  state.recipe.servings = newServings;
};

export const addBookmark = (bookmark) => {
  // Add bookmark
  state.bookmarks.push(bookmark);

  // Mark current recipe as bookmark
  if (bookmark.id === state.recipe.id) {
    state.recipe.bookmarked = true;
  }

  localStorage.setItem("BOOKMARKS", JSON.stringify(state.bookmarks));
};

export const removeBookmark = (id) => {
  // Remove recipe from bookmarks state
  state.bookmarks.splice(
    state.bookmarks.findIndex((bm) => bm.id === id),
    1
  );

  // Mark current recipe as not bookmarked
  state.recipe.bookmarked = false;

  localStorage.setItem("BOOKMARKS", JSON.stringify(state.bookmarks));
};

export const rehydrateBookmarks = () => {
  const bookmarks = localStorage.getItem("BOOKMARKS");
  if (!bookmarks) return;
  state.bookmarks = JSON.parse(bookmarks);
  console.log(state);
};

// Cleans object, get rid of unwanted props
const cleanObject = (object, ...propsToClean) =>
  Object.entries(object).reduce((acc, [key, value]) => {
    !propsToClean.includes(key) && (acc[key] = value);
    return acc;
  }, {});
