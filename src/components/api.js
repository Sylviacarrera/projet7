import { recipes } from '../data/recipes'
import { filterMainSearchBar, isLowerCaseIncluded, filterByTags } from './search'
import { state } from './state'

/**
 * Get all recipes filtered by value in param and tags from state
 * @param {String} value - String to search
 * @returns Array of object (recipes)
 */
export const getRecipes = (value = '') => {
  const result = value.length >= 3 ? filterMainSearchBar(recipes, value) : recipes
  return filterByTags(result, state.tags)
}

/**
 * Get Ingredients filtered
 * @param {*} main - String searched into main search bar
 * @param {*} value - String to search from input search bar ingredients
 * @returns Array of String (ingredients)
 */
export const getIngredients = (main = '', value = '') => {
  const recipes = getRecipes(main)
  let ingredients = []
  // Get all unique ingredients
  recipes.forEach(recipe => {
    ingredients = [...new Set([...ingredients, ...recipe.ingredients.map(item => item.ingredient)])]
  })
  return value.length >= 3 ? ingredients.filter(item => isLowerCaseIncluded(item, value)) : ingredients
}

/**
 * Get Appliances filtered
 * @param {*} main - String searched into main search bar
 * @param {*} value - String to search from input search bar appliances
 * @returns Array of String (appliances)
 */
export const getDevices = (main = '', value = '') => {
  const recipes = getRecipes(main)
  // Get all unique appliances
  const appliances = [...new Set(recipes.map(item => item.appliance))]
  return value.length >= 3 ? appliances.filter(item => isLowerCaseIncluded(item, value)) : appliances
}

/**
 * Get Ustensils filtered
 * @param {*} main - String searched into main search bar
 * @param {*} value - String to search from input search bar ustensils
 * @returns Array of String (ustensils)
 */
export const getUstensils = (main = '', value = '') => {
  const recipes = getRecipes(main)
  let ustensils = []
  // Get all unique ustensils
  recipes.forEach(recipe => {
    ustensils = [...new Set([...ustensils, ...recipe.ustensils])]
  })
  return value.length >= 3 ? ustensils.filter(item => isLowerCaseIncluded(item, value)) : ustensils
}
