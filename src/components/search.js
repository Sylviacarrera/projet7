/**
 * Determines whether a string (value1 in lower case) includes a certain string (value2 in lower case) among its entries,
 * returning true or false as appropriate.
 * @param {String} value1
 * @param {String} value2
 * @returns Boolean
 */
export const isLowerCaseIncluded = (value1, value2) => value1.toLowerCase().includes(value2.toLowerCase())
/**
 * Get recipes in function of value includes in at least one of followings properties:
 * name, description, or ingredients.
 * @param {Array} recipes - recipes (array of object)
 * @param {String} value - String to search
 * @returns Array of object of recipes
 */
export const filterMainSearchBar = (recipes, value) => {
  const result = []
  value = value.toLowerCase()

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i]
    const nameMatch = isLowerCaseIncluded(recipe.name, value)
    const descriptionMatch = isLowerCaseIncluded(recipe.description, value)
    let ingredientMatch = false

    for (let j = 0; j < recipe.ingredients.length; j++) {
      if (isLowerCaseIncluded(recipe.ingredients[j].ingredient, value)) {
        ingredientMatch = true
        break
      }
    }

    if (nameMatch || descriptionMatch || ingredientMatch) {
      result.push(recipe)
    }
  }
  return result
}

const isRecipeIncludesEveryTagIngredient = (recipe, tags) => tags.ingredients.every(ingredient => recipe.ingredients.map(elem => elem.ingredient).includes(ingredient))
const isRecipeIncludesEveryTagDevice = (recipe, tags) => tags.devices.every(device => recipe.appliance.includes(device))
const isRecipeIncludesEveryTagUstensil = (recipe, tags) => tags.ustensils.every(ustensil => recipe.ustensils.includes(ustensil))

/**
 * Get recipes which include every tag in param
 * @param {Array} recipes - Array of object (recipes)
 * @param {Object} tags - tags to search
 * @returns Array of object of recipes
 */
export const filterByTags = (recipes, tags) => recipes.filter(recipe =>
  isRecipeIncludesEveryTagIngredient(recipe, tags) &&
  isRecipeIncludesEveryTagDevice(recipe, tags) &&
  isRecipeIncludesEveryTagUstensil(recipe, tags))
