import { API_URL, API_KEY, RESULTS_PER_PAGE } from "./config";
import { AJAX } from "./helpers";

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
    const data = await AJAX(`${API_URL}/${recipeId}?key=${API_KEY}`);

    let { recipe } = data.data;
    state.recipe = transformRecipeResponse(recipe);
  } catch (error) {
    throw error;
  }
};

// Transforms response recipe data to fit applicaton state format
const transformRecipeResponse = (data) => ({
  ...cleanObject(data, "image_url", "source_url", "cooking_time"),
  image: data.image_url,
  sourceUrl: data.source_url,
  cookingTime: data.cooking_time,
  bookmarked: state.bookmarks.some((bm) => bm.id === data.id),
  // Conditionaly add key to object
  ...(data.key && { key: data.key }), // ...undefined will just do nothing {...undefined} => {}
});

// Loads search recipe results and stores to state
export const loadSearchResults = async (query) => {
  try {
    state.search.query = query;

    // Loads recipe data from api
    const data = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);
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

  persistBookmarks();
};

export const removeBookmark = (id) => {
  // Remove recipe from bookmarks state
  state.bookmarks.splice(
    state.bookmarks.findIndex((bm) => bm.id === id),
    1
  );

  // Mark current recipe as not bookmarked
  state.recipe.bookmarked = false;

  persistBookmarks();
};

// Loads bookmarks from local storage
export const rehydrateBookmarks = () => {
  const bookmarks = localStorage.getItem("BOOKMARKS");
  if (!bookmarks) return;
  state.bookmarks = JSON.parse(bookmarks);
};

// Stores bookmarks into local storage
const persistBookmarks = () => {
  localStorage.setItem("BOOKMARKS", JSON.stringify(state.bookmarks));
};

export const uploadRecipe = async (newRecipe) => {
  try {
    // Transform ingredient entries to ingredients array
    const ingredients = Object.entries(newRecipe).reduce((acc, [key, value]) => {
      if (!(key.startsWith("ingredient") && value)) return acc;
      const inputValue = value.split(",").map((str) => str.trim());
      if (inputValue.length !== 3) throw new Error("Must have quantity, unit, description.");
      const [quantity, unit, description] = inputValue;
      return [...acc, { quantity: quantity ? Number(quantity) : null, unit, description }];
    }, []);

    // Transform new recipe input for upload request
    const transformedRecipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: Number(newRecipe.cookingTime),
      servings: Number(newRecipe.servings),
      ingredients,
    };

    // Uploads recipe
    const data = await AJAX(`${API_URL}?key=${API_KEY}`, transformedRecipe);
    state.recipe = transformRecipeResponse(data.data.recipe);

    // Adds bookmark
    addBookmark(state.recipe);
  } catch (error) {
    throw error;
  }
};

// Cleans object, get rid of unwanted props
const cleanObject = (object, ...propsToClean) =>
  Object.entries(object).reduce((acc, [key, value]) => {
    !propsToClean.includes(key) && (acc[key] = value);
    return acc;
  }, {});
