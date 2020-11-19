export const state = {
  recipe: {},
};

export const loadRecipt = async (recipeId) => {
  try {
    // Loads recipe data from api
    const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    let { recipe } = data.data;
    state.recipe = {
      ...cleanObject(recipe, "image_url", "source_url", "cooking_time"),
      image: recipe.image_url,
      sourceUrl: recipe.source_url,
      cookingTime: recipe.cooking_time,
    };
  } catch (error) {
    alert(error);
  }
};

// Cleans object, get rid of unwanted props
const cleanObject = (object, ...propsToClean) =>
  Object.entries(object).reduce((acc, [key, value]) => {
    !propsToClean.includes(key) && (acc[key] = value);
    return acc;
  }, {});
