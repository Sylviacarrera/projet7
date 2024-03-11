import './styles/main.scss'
import { getRecipes, getIngredients, getDevices, getUstensils } from './components/api'
import {
  recipesContainer, mainSearchBar, recipesCounter, deleteMainSearchBar, dropdownIngredients,
  dropdownIngredientsCollapsed, ingredientsSearchBar, dropdownDevicesCollapsed, dropdownDevices, devicesSearchBar,
  dropdownUstensils, ustensilsSearchBar, dropdownUstensilsCollapsed, deleteDevicesSearchBar,
  deleteIngredientsSearchBar, deleteUstensilsSearchBar
} from './components/domLinker'
import { createCard, displayErrorMessage } from './components/templates/card'
import { createItem } from './components/templates/dropdown'
import { state } from './components/state'

// eslint-disable-next-line no-undef
// console.log(VERSION)

const init = () => {
  mainSearchBar.value = ''
  applyMainSearchBarFilter()
}

/**
 * update display of recipes and recipes counter
 */
const applyMainSearchBarFilter = () => {
  const recipes = getRecipes(mainSearchBar.value)
  displayRecipes(recipes)
  displayDeleteButton(mainSearchBar.value)
  applyCategorySearch('ingredients')
  applyCategorySearch('devices')
  applyCategorySearch('ustensils')
  console.log('state.tags:', state.tags)
}

mainSearchBar.addEventListener('input', applyMainSearchBarFilter)

deleteMainSearchBar.addEventListener('click', () => {
  mainSearchBar.value = ''
  applyMainSearchBarFilter()
})

/**
 * Display recipes into the DOM in function of recipes in param
 * and update also recipes counter element
 * @param {Array} data recipes to display
 */
const displayRecipes = data => {
  recipesContainer.innerHTML = ''

  updateRecipesCounter(data)
  if (data.length === 0) {
    // display error message
    recipesContainer.appendChild(displayErrorMessage(mainSearchBar.value))
  }

  data.forEach(item => {
    recipesContainer.appendChild(createCard(item))
  })
}

/**
 * Update recipes counter element in function of recipes in param
 * @param {Array} data recipes array
 */
const updateRecipesCounter = data => {
  recipesCounter.innerHTML = `${data.length} recettes`
}

/**
 * Display or not delete button of main search bar in function of main search bar value in param
 * @param {String} value main searchbar value
 */
const displayDeleteButton = value => {
  deleteMainSearchBar.style.display = value.length > 0 ? 'flex' : 'none'
}

const displayDeleteCategoryButton = (value, category) => {
  const deleteCategoryButton = document.querySelector(`#dropdown-${category} .delete`)
  deleteCategoryButton.style.display = value.length > 0 ? 'flex' : 'none'
}

dropdownIngredients.addEventListener('click', () => {
  dropdownIngredients.classList.toggle('down')
  dropdownIngredientsCollapsed.style.display = dropdownIngredients.classList.contains('down') ? 'flex' : 'none'
  applyCategorySearch('ingredients')
})

ingredientsSearchBar.addEventListener('input', () => applyCategorySearch('ingredients'))
deleteIngredientsSearchBar.addEventListener('click', () => {
  ingredientsSearchBar.value = ''
  applyCategorySearch('ingredients')
})

dropdownDevices.addEventListener('click', () => {
  dropdownDevices.classList.toggle('down')
  dropdownDevicesCollapsed.style.display = dropdownDevices.classList.contains('down') ? 'flex' : 'none'
  applyCategorySearch('devices')
})

devicesSearchBar.addEventListener('input', () => applyCategorySearch('devices'))
deleteDevicesSearchBar.addEventListener('click', () => {
  devicesSearchBar.value = ''
  applyCategorySearch('devices')
})

dropdownUstensils.addEventListener('click', () => {
  dropdownUstensils.classList.toggle('down')
  dropdownUstensilsCollapsed.style.display = dropdownUstensils.classList.contains('down') ? 'flex' : 'none'
  applyCategorySearch('ustensils')
})

ustensilsSearchBar.addEventListener('input', () => applyCategorySearch('ustensils'))
deleteUstensilsSearchBar.addEventListener('click', () => {
  ustensilsSearchBar.value = ''
  applyCategorySearch('ustensils')
})

const applyCategorySearch = category => {
  let data

  if (category === 'ingredients') {
    data = getIngredients(mainSearchBar.value, ingredientsSearchBar.value)
  }
  if (category === 'devices') {
    data = getDevices(mainSearchBar.value, devicesSearchBar.value)
  }
  if (category === 'ustensils') {
    data = getUstensils(mainSearchBar.value, ustensilsSearchBar.value)
  }

  // displayCategory
  const categoryToDisplay = document.querySelector(`#dropdown-${category} .items-container`)
  createItem(data, categoryToDisplay, category, applyMainSearchBarFilter)
  displayDeleteCategoryButton(ingredientsSearchBar.value, 'ingredients')
  displayDeleteCategoryButton(devicesSearchBar.value, 'devices')
  displayDeleteCategoryButton(ustensilsSearchBar.value, 'ustensils')
}

// start App
init()
