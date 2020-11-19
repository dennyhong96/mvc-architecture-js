import { API_URL, RESULTS_PER_PAGE } from "./config";
import { getJSON } from "./helpers";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    pageNum: 1,
    resultsPerPage: RESULTS_PER_PAGE,
  },
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

// Cleans object, get rid of unwanted props
const cleanObject = (object, ...propsToClean) =>
  Object.entries(object).reduce((acc, [key, value]) => {
    !propsToClean.includes(key) && (acc[key] = value);
    return acc;
  }, {});
